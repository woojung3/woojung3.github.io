import * as THREE from './vendor/three.module.js';
import {OrbitControls} from './vendor/OrbitControls.js';
import {RoomEnvironment} from './vendor/RoomEnvironment.js';
import {EffectComposer} from './vendor/postprocessing/EffectComposer.js';
import {RenderPass} from './vendor/postprocessing/RenderPass.js';
import {SSAOPass} from './vendor/postprocessing/SSAOPass.js';
import {OutputPass} from './vendor/postprocessing/OutputPass.js';
import {buildRoom} from './room.js';

export function mountStudy(ui){
const lifetime=new AbortController();let loadingTimer;
const container=ui.getElementById('scene');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmall=()=>container.clientWidth<640;
const scene=new THREE.Scene();scene.background=new THREE.Color('#eeede8');
scene.fog=new THREE.Fog('#eeede8',13,32);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,isSmall()?1.4:1.6));
renderer.setSize(container.clientWidth,container.clientHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
container.appendChild(renderer.domElement);
renderer.domElement.setAttribute('tabindex','0');
renderer.domElement.setAttribute('aria-label','Study. Drag or use arrow keys to look around. Use plus and minus keys to zoom.');

const camera=new THREE.PerspectiveCamera(43,container.clientWidth/container.clientHeight,.06,45);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.dampingFactor=.085;controls.enablePan=false;controls.enableZoom=false;controls.rotateSpeed=.40;controls.zoomSpeed=.60;
controls.minPolarAngle=.98;controls.maxPolarAngle=1.48;controls.minAzimuthAngle=-.18;controls.maxAzimuthAngle=.90;
controls.touches.ONE=null;controls.touches.TWO=THREE.TOUCH.DOLLY_ROTATE;
renderer.domElement.style.touchAction='pan-y';
const hemi=new THREE.HemisphereLight('#e7f0f5','#8f8a6d',1.45);scene.add(hemi);
const ambient=new THREE.AmbientLight('#ececdd',.35);scene.add(ambient);
const sun=new THREE.DirectionalLight('#fff1d4',3.0);sun.position.set(3.9,6.5,-4.3);sun.target.position.set(-.85,0,1.1);
sun.castShadow=true;sun.shadow.mapSize.set(isSmall()?1536:2048,isSmall()?1536:2048);
Object.assign(sun.shadow.camera,{left:-3.8,right:3.8,top:4.7,bottom:-3.5,near:.5,far:18});
sun.shadow.bias=-.00015;sun.shadow.normalBias=.008;sun.shadow.radius=3;
scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight('#ebf0e7',.65);fill.position.set(1.7,3.4,4);scene.add(fill);

const pmrem=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment();
const envTarget=pmrem.fromScene(environment,.055);scene.environment=envTarget.texture;scene.environmentIntensity=.36;
environment.dispose();pmrem.dispose();
const world=buildRoom(scene);

const composer=new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));
const ao=new SSAOPass(scene,camera,container.clientWidth,container.clientHeight,16);
ao.kernelRadius=.16;ao.minDistance=.0012;ao.maxDistance=.045;ao.enabled=!isSmall();
composer.addPass(ao);composer.addPass(new OutputPass());
const views={
  room:{pos:[2.52,2.34,3.45],target:[-.05,1.29,-.61],fov:43,min:3.4,max:6.8},
  desk:{pos:[1.55,1.92,1.54],target:[.57,1.05,-.95],fov:42,min:2.0,max:4.4},
  reading:{pos:[.42,1.80,2.17],target:[-1.12,.77,-.52],fov:40,min:2.3,max:4.5}
};
const dayBackground=new THREE.Color('#eeede8'),nightBackground=new THREE.Color('#161e29');
const dayGarden=new THREE.Color('#ffffff'),nightGarden=new THREE.Color('#23314a');
let activeView='room',transition=null,raf=0,lastTime=0,lampOn=false,lampLevel=0,disposed=false;
function viewPose(name){
  const view=views[name],target=new THREE.Vector3(...view.target),pos=new THREE.Vector3(...view.pos);
  // A narrower view needs a larger distance, rather than cropping away the original room.
  const aspect=container.clientWidth/container.clientHeight;
  const distanceFactor=Math.max(1,Math.min(2.30,1.18/Math.max(aspect,.5)));
  pos.sub(target).multiplyScalar(distanceFactor).add(target);
  return {view,pos,target,fov:view.fov+(aspect<.8?4:0),factor:distanceFactor};
}
function goToView(name,instant=false){
  activeView=name;const {view,pos,target,fov,factor}=viewPose(name);
  controls.minDistance=view.min*factor;controls.maxDistance=view.max*factor;
  ui.host.dataset.view=name;
  if(instant||reducedMotion){transition=null;camera.position.copy(pos);controls.target.copy(target);camera.fov=fov;camera.updateProjectionMatrix();controls.update();}
  else{transition={from:camera.position.clone(),to:pos,fromTarget:controls.target.clone(),toTarget:target,fromFov:camera.fov,toFov:fov,start:performance.now()};}
  invalidate();
}
function invalidate(){if(!raf&&!document.hidden&&!disposed)raf=requestAnimationFrame(frame);}
function frame(now){
  raf=0;const dt=Math.min((now-lastTime)/1000,.05)||.016;lastTime=now;
  if(transition){
    const t=Math.min((now-transition.start)/1150,1),e=t*t*(3-2*t);
    camera.position.lerpVectors(transition.from,transition.to,e);controls.target.lerpVectors(transition.fromTarget,transition.toTarget,e);
    camera.fov=THREE.MathUtils.lerp(transition.fromFov,transition.toFov,e);camera.updateProjectionMatrix();
    if(t===1)transition=null;
  }
  const changed=controls.update();
  const desired=lampOn?1:0;
  const adjusting=Math.abs(lampLevel-desired)>.004;
  if(adjusting){
    lampLevel=THREE.MathUtils.lerp(lampLevel,desired,reducedMotion?1:Math.min(dt*8,1));
    if(Math.abs(lampLevel-desired)<.004)lampLevel=desired;
    // Change physical illumination and the unlit outdoor texture together.
    world.lampLight.intensity=lampLevel*4.5;
    world.lampGlow.intensity=lampLevel*.07;
    world.bulbMaterial.emissiveIntensity=lampLevel*3;
    sun.intensity=THREE.MathUtils.lerp(3,.025,lampLevel);
    hemi.intensity=THREE.MathUtils.lerp(1.45,.16,lampLevel);
    ambient.intensity=THREE.MathUtils.lerp(.35,.04,lampLevel);
    fill.intensity=THREE.MathUtils.lerp(.65,.035,lampLevel);
    scene.environmentIntensity=THREE.MathUtils.lerp(.36,.035,lampLevel);
    scene.background.copy(dayBackground).lerp(nightBackground,lampLevel);
    scene.fog.color.copy(scene.background);
    world.backdrop.material.color.copy(dayGarden).lerp(nightGarden,lampLevel);
    renderer.shadowMap.needsUpdate=true;
  }
  composer.render();
  if(transition||changed||adjusting)invalidate();
}
const raycaster=new THREE.Raycaster();
function hitLink(event){
  const rect=renderer.domElement.getBoundingClientRect();
  raycaster.setFromCamera(new THREE.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),camera);
  return raycaster.intersectObjects([world.room],true)[0]?.object.userData.href;
}
let press=null;
renderer.domElement.addEventListener('pointerdown',event=>{
  if(!event.isPrimary){press=null;return;}
  if(event.button===0)press={id:event.pointerId,x:event.clientX,y:event.clientY};
});
renderer.domElement.addEventListener('pointermove',event=>{
  if(press&&Math.hypot(event.clientX-press.x,event.clientY-press.y)>6)press=null;
  if(event.pointerType==='mouse')renderer.domElement.style.cursor=hitLink(event)?'pointer':'grab';
});
renderer.domElement.addEventListener('pointercancel',()=>{press=null;});
renderer.domElement.addEventListener('pointerup',event=>{
  const click=press;press=null;
  const href=hitLink(event);
  if(click?.id===event.pointerId&&Math.hypot(event.clientX-click.x,event.clientY-click.y)<=6&&href)window.location.assign(href);
});
controls.addEventListener('change',invalidate);
controls.addEventListener('start',()=>{transition=null;});
const viewNames=Object.keys(views);
for (const [id, step] of [['previous',-1],['next',1]]) {
  ui.getElementById(id).addEventListener('click',()=>goToView(viewNames[(viewNames.indexOf(activeView)+step+viewNames.length)%viewNames.length]));
}
ui.getElementById('reset').addEventListener('click',()=>goToView('room'));
ui.getElementById('lamp').addEventListener('click',e=>{
  lampOn=!lampOn;const button=e.currentTarget;
  button.setAttribute('aria-pressed',String(lampOn));
  ui.host.toggleAttribute('night',lampOn);
  invalidate();
});
renderer.domElement.addEventListener('keydown',e=>{
  const k=e.key;if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(k))return;
  e.preventDefault();transition=null;
  if(k==='Home'){goToView('room');return;}
  const s=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
  if(k==='ArrowLeft')s.theta-=.065;if(k==='ArrowRight')s.theta+=.065;
  if(k==='ArrowUp')s.phi-=.045;if(k==='ArrowDown')s.phi+=.045;
  if(k==='+'||k==='=')s.radius*=.90;if(k==='-')s.radius*=1.1;
  s.theta=THREE.MathUtils.clamp(s.theta,controls.minAzimuthAngle,controls.maxAzimuthAngle);s.phi=THREE.MathUtils.clamp(s.phi,controls.minPolarAngle,controls.maxPolarAngle);s.radius=THREE.MathUtils.clamp(s.radius,controls.minDistance,controls.maxDistance);
  camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(s));controls.update();invalidate();
});
const resize=new ResizeObserver(()=>{
  const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;
  camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,isSmall()?1.4:1.6));renderer.setSize(w,h);composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(w,h);ao.enabled=!isSmall();goToView(activeView,true);invalidate();
});resize.observe(container);
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}else{lastTime=performance.now();invalidate();}},{signal:lifetime.signal});
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();ui.getElementById('error').hidden=false;disposed=true;});
renderer.domElement.addEventListener('webglcontextrestored',()=>ui.host.restart());
let cleaned=false;
function dispose(){
  if(cleaned)return;cleaned=true;disposed=true;lifetime.abort();
  if(raf)cancelAnimationFrame(raf);clearTimeout(loadingTimer);resize.disconnect();controls.dispose();
  for(const pass of composer.passes)pass.dispose?.();composer.dispose();envTarget.dispose();
  const resources=new Set();scene.traverse(o=>{
    if(o.geometry)resources.add(o.geometry);
    const mats=Array.isArray(o.material)?o.material:[o.material];
    for(const m of mats)if(m){for(const v of Object.values(m))if(v?.isTexture)resources.add(v);resources.add(m);}
    if(o.shadow)resources.add(o.shadow);
  });
  for(const resource of resources)resource.dispose?.();renderer.dispose();renderer.domElement.remove();
}
window.addEventListener('pagehide',e=>{if(!e.persisted)dispose();},{signal:lifetime.signal});

goToView('room',true);
Promise.all([world.landscapeReady,world.portraitReady,world.mapReady]).then(()=>{
  if(disposed){world.backdrop.material.map?.dispose();return;}
  renderer.shadowMap.needsUpdate=true;composer.render();
  ui.host.dispatchEvent(new CustomEvent('study-ready',{bubbles:true,composed:true}));
  ui.getElementById('loading').classList.add('done');
  loadingTimer=setTimeout(()=>{if(!disposed)ui.getElementById('loading').hidden=true;},750);
  invalidate();
}).catch(error=>{if(!disposed){console.error(error);ui.getElementById('loading').hidden=true;ui.getElementById('error').hidden=false;}});

return dispose;

}
