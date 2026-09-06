import * as THREE from './vendor/three.module.js';
import {RoundedBoxGeometry} from './vendor/RoundedBoxGeometry.js';
import {mergeGeometries} from './vendor/BufferGeometryUtils.js';
import {makeMaterials,random,texture,printedPage,contactMap} from './materials.js';

const V=(x,y,z)=>new THREE.Vector3(x,y,z);
export function buildRoom(scene){
  const M=makeMaterials(),room=new THREE.Group();room.name='Window study';scene.add(room);
  function mesh(geo,mat,pos,parent=room){const o=new THREE.Mesh(geo,mat);if(pos)o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
  function box(w,h,d,pos,mat=M.white,r=.008,parent=room){return mesh(r?new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/3,h/3,d/3)):new THREE.BoxGeometry(w,h,d),mat,pos,parent);}
  function cylinder(rt,rb,h,pos,mat=M.white,parent=room,segments=36){return mesh(new THREE.CylinderGeometry(rt,rb,h,segments),mat,pos,parent);}
  function ball(x,y,z,scale,mat,parent=room){const o=mesh(new THREE.SphereGeometry(1,20,14),mat,[x,y,z],parent);o.scale.set(...scale);return o;}
  function line(points,radius,mat=M.white,parent=room,steps=28){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>Array.isArray(p)?V(...p):p)),steps,radius,7,false),mat,null,parent);}
  function rod(a,b,r,mat=M.white,parent=room,r2=r){const av=V(...a),bv=V(...b);const o=cylinder(r2,r,av.distanceTo(bv),av.clone().add(bv).multiplyScalar(.5).toArray(),mat,parent,12);o.quaternion.setFromUnitVectors(V(0,1,0),bv.sub(av).normalize());return o;}
  const shadowTexture=contactMap();
  function contact(x,z,w,d,opacity=.6,y=.013,parent=room){const o=mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,opacity,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}),[x,y,z],parent);o.rotation.x=-Math.PI/2;o.castShadow=false;return o;}
  // The reference corner, in metres; the open front keeps orbiting inside a credible room.
  const floorBack=-1.57,floorFront=15,floorDepth=floorFront-floorBack,floorCenter=(floorBack+floorFront)/2;
  box(30,.13,floorDepth,[0,-.077,floorCenter],M.floor,0);
  const groutGeometries=[];
  for(let x=-15;x<=15;x+=.68){const g=new THREE.BoxGeometry(.002,.0015,floorDepth);g.translate(x,.0008,floorCenter);groutGeometries.push(g);}
  for(let z=-15;z<=15;z+=.68){if(z<floorBack)continue;const g=new THREE.BoxGeometry(30,.0015,.002);g.translate(0,.0008,z);groutGeometries.push(g);}
  mesh(mergeGeometries(groutGeometries),M.grout);
  box(.14,4.6,24,[-2.06,2.3,9.8],M.wall,0);
  box(1.1,4.6,.18,[-1.44,2.3,-1.57],M.wall,0);
  box(3.2,1.14,.18,[.70,.57,-1.57],M.wallWhite,0);
  box(3.2,1.8,.18,[.70,3.75,-1.57],M.wallWhite,0);
  box(16,4.6,.18,[10.22,2.3,-1.57],M.wallWhite,0);
  box(.032,.085,24,[-1.974,.043,9.8],M.wallWhite,.002);
  box(4.3,.085,.035,[.12,.043,-1.452],M.wallWhite,.002);
  contact(-1.66,-.36,.65,3.9,.38);
  // Block overhead sunlight without drawing a ceiling or adding a navigation occluder.
  const ceiling=box(20.35,.14,23.46,[8.045,4.67,10.07],new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false}),0,scene);
  ceiling.name='Shadow-only ceiling';ceiling.receiveShadow=false;ceiling.raycast=()=>{};
  // Deep painted sill and layered uPVC frame.
  box(3.2,.075,.43,[.70,1.145,-1.345],M.white,.012);
  box(3.18,.045,.04,[.70,1.102,-1.134],M.wallWhite,.004);
  const left=-.86,right=2.22,bottom=1.19,top=2.91,z=-1.495;
  for(const x of [left,right])box(.063,top-bottom+.07,.08,[x,(top+bottom)/2,z],M.white,.004);
  for(const y of [bottom,top])box(right-left,.065,.08,[(left+right)/2,y,z],M.white,.004);
  for(const x of [.12,1.21]){
    box(.046,top-bottom,.07,[x,(top+bottom)/2,z+.018],M.white,.003);
    box(.012,top-bottom-.10,.014,[x+.036,(top+bottom)/2,z+.061],M.metalWhite,.001);
  }
  const brown=new THREE.MeshStandardMaterial({color:'#75604b',roughness:.48});
  for(const x of [-.62,.47,1.59])box(.020,1.6,.025,[x,2.05,-1.565],brown,.002);
  for(const y of [1.66,2.28,2.87])box(3.03,.018,.024,[.68,y,-1.565],brown,.001);
  box(.018,.10,.022,[.07,1.93,-1.442],M.metalWhite,.005);
  box(.06,.015,.025,[.093,1.925,-1.423],M.metalWhite,.004);
  // Exterior is a generated anonymous canopy; the original photo and metadata are not assets.
  const backdrop=mesh(new THREE.PlaneGeometry(32,14),new THREE.MeshBasicMaterial({color:'#eff2e2',toneMapped:false}),[0,3,-8]);backdrop.castShadow=false;backdrop.receiveShadow=false;
  const landscapeReady=new THREE.TextureLoader().loadAsync(new URL('./assets/garden.webp',import.meta.url).href).then(t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;backdrop.material.map=t;backdrop.material.color.set(0xffffff);backdrop.material.needsUpdate=true;}).catch(e=>{console.warn('Garden texture unavailable',e);});
  const glass=mesh(new THREE.PlaneGeometry(3.0,1.63),new THREE.MeshPhysicalMaterial({color:'#eaf2ee',metalness:0,roughness:.08,transparent:true,opacity:.06,depthWrite:false,side:THREE.DoubleSide}),[.68,2.05,-1.55]);glass.castShadow=false;
  // Draped, slightly irregular linen, with a rolled hem rather than flat curtain planes.
  const curtains=[];
  for(let panel=0;panel<3;panel++){
    const width=1.03,xStart=-.865+panel*1.035,segments=52,rows=26;
    const geo=new THREE.PlaneGeometry(1,1,segments,rows),p=geo.attributes.position;
    function cloth(u,v){
      const low=2.10+.42*Math.pow(Math.sin(Math.PI*u),1.7)+.08*Math.sin(panel*1.7+u*4);
      return [xStart+u*width,2.935-v*(2.935-low),-1.30+(.038+.052*v)*Math.sin(u*Math.PI*16+v*.65)+.11*Math.sin(Math.PI*u)*v];
    }
    for(let j=0;j<=rows;j++)for(let i=0;i<=segments;i++){const a=cloth(i/segments,j/rows);p.setXYZ(j*(segments+1)+i,...a);}
    geo.computeVertexNormals();const o=mesh(geo,M.linen);o.castShadow=false;curtains.push(o);
    const hem=[];for(let i=0;i<=60;i++)hem.push(cloth(i/60,1));const h=line(hem,.005,M.linen,room,70);h.castShadow=false;
    for(let i=0;i<=11;i++){
      const ring=mesh(new THREE.TorusGeometry(.018,.0035,6,14),M.white,[xStart+i*width/11,2.959,-1.298]);ring.rotation.y=Math.PI/2;ring.castShadow=false;
    }
  }
  rod([-.94,2.982,-1.3],[2.32,2.982,-1.3],.012,M.metalWhite);
  // Walnut desk: softly rounded slab, apron, drawer and tapered legs.
  const desk=new THREE.Group();desk.name='Walnut desk';room.add(desk);
  box(2.55,.057,.675,[.65,.795,-.92],M.wood,.045,desk);
  box(2.35,.11,.055,[.65,.723,-1.168],M.woodDark,.012,desk);
  box(.78,.085,.41,[-.10,.718,-.941],M.woodDark,.015,desk);
  box(.755,.067,.035,[-.10,.718,-.735],M.wood,.004,desk);
  box(.10,.009,.015,[-.10,.72,-.712],M.brass,.003,desk);
  for(const x of [-.54,1.82])for(const dz of [-1.155,-.666]){
    rod([x+(x<0?-.035:.035),.02,dz+.02],[x,.769,dz],.025,M.wood,desk,.036);
    contact(x,dz,.24,.24,.50);
  }
  contact(.65,-.90,2.9,1.3,.28);
  // The tall open shelf in the original left corner.
  const shelf=new THREE.Group();shelf.name='Research books';shelf.position.set(-.985,0,-1.085);shelf.rotation.y=.025;room.add(shelf);
  for(const x of [-.32,.32])for(const z of [-.177,.177])box(.022,1.61,.025,[x,.838,z],M.metalWhite,.004,shelf);
  for(const x of [-.32,.32])for(const y of [.16,.58,1.06,1.63])box(.024,.025,.38,[x,y,0],M.metalWhite,.003,shelf);
  for(const y of [.16,.58,1.06])box(.684,.025,.38,[0,y,0],M.wood,.008,shelf);
  const titles=['FIELD NOTES','RESEARCH','METHODS','OBSERVATIONS','ESSAYS','COLLECTED PAPERS','STUDIES'];
  function book(w,h,d,x,y,z,i,parent=shelf){
    const g=new THREE.Group();g.position.set(x,y+h/2,z);parent.add(g);
    const m=M.bookColors[i%M.bookColors.length];
    box(w-.008,h-.014,d-.012,[0,0,-.002],M.paper,.002,g);
    box(w,h,.012,[0,0,d/2-.003],m,.002,g);
    box(.004,h,d,[-w/2+.002,0,0],m,.001,g);box(.004,h,d,[w/2-.002,0,0],m,.001,g);
    const t=texture(128,512,c=>{c.fillStyle=['#d4cdb8','#5f6c65','#3b494b','#777e77','#b0a387','#e3dfd0','#695a4e','#97896f','#4b5a56'][i%9];c.fillRect(0,0,128,512);c.fillStyle=i%9===0||i%9===5?'#4a4f44':'#e5dfc9';c.translate(64,38);c.rotate(Math.PI/2);c.font='18px Georgia';c.fillText(titles[i%titles.length],0,4);c.setTransform(1,0,0,1,0,0);c.fillRect(20,436,88,2);c.fillRect(20,443,88,2);});
    const label=mesh(new THREE.PlaneGeometry(w-.001,h-.006),new THREE.MeshStandardMaterial({map:t,roughness:.8}),[0,0,d/2+.003],g);label.castShadow=false;
    return g;
  }
  let bx=-.269;for(let i=0;i<10;i++){const w=.033+random()*.013;const h=.27+random()*.10;book(w,h,.22+random()*.05,bx+w/2,1.076,.012,i);bx+=w+.004;}
  for(let i=0;i<6;i++)book(.06,.28+random()*.09,.24,-.24+i*.066,.596,.018,i+7);
  for(let i=0;i<3;i++){const b=box(.28,.04,.25,[.07,.193+i*.043,.025],M.bookColors[(i+2)%9],.004,shelf);b.rotation.y=.06-i*.035;}
  box(.19,.18,.255,[-.208,.265,.012],M.bookColors[1],.005,shelf);
  // Graphical print in place of the family photograph.
  box(.17,.225,.018,[.212,1.202,.036],M.woodDark,.003,shelf);
  const art=texture(256,320,c=>{c.fillStyle='#e8e5d9';c.fillRect(0,0,256,320);c.strokeStyle='#70806d';c.lineWidth=2;for(let i=0;i<12;i++){c.beginPath();c.ellipse(128,165,20+i*6,35+i*9,.5,0,Math.PI*2);c.stroke();}});
  mesh(new THREE.PlaneGeometry(.15,.202),new THREE.MeshStandardMaterial({map:art,roughness:.9}),[.212,1.202,.047],shelf);
  // Upholstered reading chair, three tufted columns and rounded arms.
  const lounge=new THREE.Group();lounge.name='Reading chair';lounge.position.set(-1.35,0,-.28);lounge.rotation.y=.13;room.add(lounge);
  for(const x of [-.345,.345])for(const z of [-.32,.37]){rod([x,.028,z],[x,.235,z],.032,M.woodDark,lounge,.039);contact(x,z,.26,.28,.75,.012,lounge);}
  box(.83,.22,.85,[0,.29,.025],M.fabric,.09,lounge);
  const back=new THREE.Group();back.position.set(0,.77,-.29);back.rotation.x=-.10;lounge.add(back);
  box(.79,.79,.18,[0,0,0],M.fabric,.07,back);
  for(let row=0;row<3;row++)for(let col=0;col<3;col++){
    const o=box(.241,.242,.13,[-.248+col*.248,-.247+row*.249,.085],M.fabric,.05,back);o.rotation.y=(col-1)*-.027;
    for(const dy of [-.082,.082]){const knot=ball(-.248+col*.248,-.247+row*.249+dy,.144,[.005,.005,.0015],M.seam,back);knot.castShadow=false;}
  }
  for(let row=0;row<2;row++)for(let col=0;col<3;col++)box(.235,.134,.338,[-.24+col*.24,.443,-.17+row*.343],M.fabric,.045,lounge);
  for(const x of [-.435,.435]){
    box(.195,.38,.83,[x,.46,.035],M.fabric,.083,lounge);
    line([[x-.045,.643,.35],[x-.055,.661,.02],[x-.05,.675,-.28]],.002,M.seam,lounge);
  }
  contact(-1.35,-.25,1.45,1.45,.73);
  // Curved walnut desk chair, visible from behind.
  const chair=new THREE.Group();chair.name='Desk chair';chair.position.set(.50,0,.065);chair.rotation.y=-.10;room.add(chair);
  box(.49,.052,.48,[0,.452,0],M.wood,.044,chair);
  box(.43,.027,.41,[0,.484,-.01],M.black,.035,chair);
  for(const x of [-.205,.205])for(const z of [-.185,.185])rod([x*1.24,.02,z*1.23],[x,.444,z],.021,M.wood,chair,.029);
  for(const x of [-.222,.222])line([[x,.02,.228],[x,.47,.215],[x*.98,.81,.25]],.021,M.wood,chair);
  rod([-.218,.23,.217],[.218,.23,.217],.013,M.wood,chair);
  const backGeo=new THREE.PlaneGeometry(.62,.17,32,5),bp=backGeo.attributes.position;
  for(let i=0;i<bp.count;i++){const x=bp.getX(i);const y=bp.getY(i);bp.setXYZ(i,x,.833+y+Math.pow(Math.abs(x)/.32,2)*.028,.265-.13*Math.pow(x/.32,2));}
  backGeo.computeVertexNormals();const chairBack=mesh(backGeo,M.wood.clone(),null,chair);chairBack.material.side=THREE.DoubleSide;
  const edgeTop=[],edgeBottom=[];for(let i=0;i<=32;i++){const x=-.31+i*.62/32;edgeTop.push([x,.918+Math.pow(Math.abs(x)/.32,2)*.028,.265-.13*Math.pow(x/.32,2)]);edgeBottom.push([x,.748+Math.pow(Math.abs(x)/.32,2)*.028,.265-.13*Math.pow(x/.32,2)]);}
  line(edgeTop,.014,M.wood,chair);line(edgeBottom,.010,M.wood,chair);contact(.50,.065,.94,.99,.65);
  // Unbranded notebook, draft pages and an uncapped pencil.
  const notebook=new THREE.Group();notebook.position.set(.35,.832,-.85);notebook.rotation.y=-.14;room.add(notebook);
  box(.355,.013,.247,[0,0,0],M.bookColors[1],.004,notebook);
  for(const side of [-1,1]){
    box(.167,.012,.235,[side*.087,.011,0],M.paper,.002,notebook);
    const page=mesh(new THREE.PlaneGeometry(.162,.229),new THREE.MeshStandardMaterial({map:printedPage(side<0?'notes':'paper'),roughness:1}),[side*.087,.0173,0],notebook);page.rotation.x=-Math.PI/2;page.castShadow=false;
  }
  line([[0,.019,-.116],[0,.010,0],[0,.019,.116]],.002,M.woodDark,notebook);
  const pencil=rod([.53,.838,-.61],[.72,.838,-.78],.004,M.woodEdge);rod([.72,.838,-.78],[.728,.838,-.789],.003,M.ink);
  const papers=new THREE.Group();papers.position.set(.98,.833,-.96);papers.rotation.y=.11;room.add(papers);
  for(let i=0;i<4;i++){const p=box(.21,.0015,.29,[i*.001,.0015*i,0],M.paper,.0004,papers);p.rotation.y=i*.018;}
  const pTop=mesh(new THREE.PlaneGeometry(.206,.286),new THREE.MeshStandardMaterial({map:printedPage('paper'),roughness:.92}),[.003,.007,0],papers);pTop.rotation.x=-Math.PI/2;pTop.castShadow=false;
  box(.022,.002,.044,[-.056,.009,-.119],M.metal,.003,papers);
  // Closed, unbranded laptop, parked to leave the desk open.
  const laptop=new THREE.Group();laptop.position.set(-.246,.836,-1.005);laptop.rotation.y=.035;room.add(laptop);
  box(.31,.018,.211,[0,0,0],M.metal,.009,laptop);
  box(.295,.003,.204,[0,.01,0],M.metalWhite,.007,laptop);
  box(.12,.003,.013,[0,.002,.107],M.black,.001,laptop);
  contact(-.246,-1.0,.43,.30,.37,.826);
  // Small ceramic mug and a felt coaster.
  cylinder(.053,.053,.004,[.006,.827,-.697],M.bookColors[1]);
  const mugPoints=[[0,0],[.031,0],[.039,.01],[.042,.083],[.043,.089],[.039,.093],[.035,.085],[.033,.012]].map(([x,y])=>new THREE.Vector2(x,y));
  const mug=mesh(new THREE.LatheGeometry(mugPoints,36),M.ceramic,[0,.829,-.699]);
  const handle=mesh(new THREE.TorusGeometry(.029,.007,10,30),M.ceramic,[.039,.875,-.699]);handle.scale.x=.82;
  cylinder(.033,.033,.001,[0,.887,-.699],new THREE.MeshStandardMaterial({color:'#675640',roughness:.26}));
  // Crochet mat from the reference, with a slim dark case on top.
  const laceParts=[];const laceCenter=V(1.57,.828,-.902);
  function laceCurve(points){const g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,true),Math.max(points.length*3,20),.0017,4,true);laceParts.push(g);}
  for(let ring=0;ring<12;ring++){
    const r=.024+ring*.015;const points=[];for(let k=0;k<96;k++){const a=k/96*Math.PI*2;const rr=r+(ring>7?.004*Math.sin(a*24):.002*Math.sin(a*18));points.push(V(laceCenter.x+rr*Math.cos(a),laceCenter.y,laceCenter.z+rr*Math.sin(a)*.92));}laceCurve(points);
  }
  for(let i=0;i<28;i++){
    const a=i/28*Math.PI*2;const points=[];for(let j=0;j<16;j++){const t=j/16*Math.PI*2,r=.172+.036*Math.cos(t),ang=a+.067*Math.sin(t);points.push(V(laceCenter.x+r*Math.cos(ang),laceCenter.y+.001,laceCenter.z+r*Math.sin(ang)*.92));}laceCurve(points);
  }
  const laceMat=new THREE.MeshStandardMaterial({color:'#e6dfcd',roughness:1});mesh(mergeGeometries(laceParts),laceMat);
  const caseObj=box(.185,.024,.071,[1.57,.846,-.91],M.black,.029);caseObj.rotation.y=.08;
  // Waste basket underneath, with no private contents.
  cylinder(.086,.072,.26,[-.48,.14,-.785],M.bookColors[1]);cylinder(.079,.079,.006,[-.48,.272,-.785],M.black);
  // Arched enamel floor lamp.
  cylinder(.12,.132,.035,[-.55,.03,-1.315],M.metalWhite);
  line([[-.55,.05,-1.315],[-.55,1.1,-1.315],[-.55,1.61,-1.30],[-.50,1.90,-1.22],[-.33,1.99,-1.14]],.011,M.metalWhite);
  const shadeGroup=new THREE.Group();shadeGroup.position.set(-.27,1.817,-1.103);shadeGroup.quaternion.setFromUnitVectors(V(0,1,0),V(-.30,.91,-.15).normalize());room.add(shadeGroup);
  const shadePoints=[[.142,0],[.144,.008],[.130,.054],[.091,.135],[.045,.19],[.040,.20],[.035,.193],[.083,.132],[.123,.052],[.137,.008]].map(([x,y])=>new THREE.Vector2(x,y));
  const shade=mesh(new THREE.LatheGeometry(shadePoints,48),M.metalWhite,[0,0,0],shadeGroup);
  ball(0,.201,0,[.048,.047,.048],M.metalWhite,shadeGroup);
  const bulbMaterial=new THREE.MeshStandardMaterial({color:'#faf2d3',emissive:'#ffcb79',emissiveIntensity:0,roughness:.45});
  ball(0,.075,0,[.032,.045,.032],bulbMaterial,shadeGroup);
  const lampLight=new THREE.SpotLight('#ffdc9b',0,3.8,.85,.8,2);lampLight.position.set(-.25,1.80,-1.08);lampLight.target.position.set(.05,.78,-.73);lampLight.castShadow=true;lampLight.shadow.mapSize.set(512,512);lampLight.shadow.bias=-.0005;scene.add(lampLight,lampLight.target);
  const lampGlow=new THREE.PointLight('#ffce88',0,.7,2);lampGlow.position.set(-.27,1.8,-1.08);scene.add(lampGlow);
  // Terracotta plant with branching stems and instanced, gently folded leaves.
  function pot(x,y,z,r,h,mat=M.terra){
    const points=[[0,0],[r*.74,0],[r*.80,.02],[r,h*.95],[r*1.03,h],[r*.98,h+.008],[r*.92,h-.009],[r*.89,h*.86]].map(([x,y])=>new THREE.Vector2(x,y));
    mesh(new THREE.LatheGeometry(points,48),mat,[x,y,z]);
    cylinder(r*.89,r*.89,.01,[x,y+h-.018,z],M.soil);
    cylinder(r*1.06,r*1.03,.018,[x,y-.012,z],mat);
    contact(x,z,r*2.5,r*2.5,.55,y-.018);
  }
  const plantBase=[.75,1.21,-1.30];pot(...plantBase,.154,.236);
  const plant=new THREE.Group();plant.name='Window plant';plant.position.set(.75,1.44,-1.30);room.add(plant);
  const leafGeometry=new THREE.PlaneGeometry(1,1,8,12);const lp=leafGeometry.attributes.position;
  for(let i=0;i<lp.count;i++){
    const u=lp.getX(i)*2,v=lp.getY(i)+.5;const w=Math.pow(Math.sin(v*Math.PI),.75)*.42;
    lp.setXYZ(i,u*w,v,Math.sin(Math.PI*v)*(.10-Math.abs(u)*.13));
  }leafGeometry.computeVertexNormals();
  const leaves=[];
  function branch(points,r){const curve=new THREE.CatmullRomCurve3(points.map(p=>V(...p)));mesh(new THREE.TubeGeometry(curve,24,r,6,false),M.stem,null,plant);return curve;}
  branch([[0,0,0],[-.03,.28,.02],[.02,.62,0],[.10,.91,.015],[.16,1.25,.035]],.0055);
  const ends=[[-.40,.52,.035],[-.28,.70,-.03],[.34,.62,.06],[.38,.86,-.05],[-.22,.92,.035],[.28,1.13,.02],[.48,.50,.02],[-.40,.32,.10],[.12,1.27,0]];
  ends.forEach((e,k)=>{
    const y=.15+k*.076,start=[.012,y,0];const crv=branch([start,[e[0]*.50,e[1]*.70,e[2]+.025],e],.0033);
    const count=7+Math.floor(random()*4);
    for(let j=0;j<count;j++){
      const t=.24+.76*j/count,p=crv.getPoint(t),sgn=j%2?1:-1;const stemEnd=p.clone().add(V(sgn*(.032+random()*.03),.015,random()*.055-.024));
      rod(p.toArray(),stemEnd.toArray(),.00095,M.stem,plant);
      leaves.push({p:stemEnd,s:.056+random()*.049,rx:(random()-.5)*1.1,ry:random()*Math.PI*2,rz:sgn*(.50+random()*.9),h:.18+random()*.13});
    }
  });
  const instances=new THREE.InstancedMesh(leafGeometry,M.leaf,leaves.length);instances.castShadow=true;instances.receiveShadow=true;plant.add(instances);const dummy=new THREE.Object3D();
  leaves.forEach((l,i)=>{dummy.position.copy(l.p);dummy.rotation.set(l.rx,l.ry,l.rz);dummy.scale.set(l.s,l.s*1.6,l.s);dummy.updateMatrix();instances.setMatrixAt(i,dummy.matrix);instances.setColorAt(i,new THREE.Color().setHSL(l.h,.35+random()*.23,.25+random()*.17));});
  instances.instanceMatrix.needsUpdate=true;
  // Two quiet accents on the sill: succulent and small ceramic bird.
  pot(1.86,1.204,-1.29,.064,.082,M.ceramic);
  for(let i=0;i<16;i++){const a=i*2.4,r=i<5?.008:.026;const o=ball(1.86+Math.cos(a)*r,1.309+(i<5?.015:0),-1.29+Math.sin(a)*r,[.010,.036,.014],M.bookColors[1]);o.rotation.set(Math.cos(a)*.7,0,Math.sin(a)*.7);}
  const bird=new THREE.Group();bird.position.set(1.60,1.213,-1.23);room.add(bird);
  ball(0,.027,0,[.047,.031,.026],M.ceramic,bird);ball(-.029,.057,.003,[.022,.022,.021],M.ceramic,bird);
  const beak=mesh(new THREE.ConeGeometry(.008,.018,12),M.woodEdge,[-.052,.057,.007],bird);beak.rotation.z=Math.PI/2;
  ball(-.038,.062,.022,[.0025,.0025,.0015],M.black,bird);
  // Neutral desk accessories on the left sill.
  cylinder(.046,.044,.138,[-.43,1.252,-1.30],M.ceramic);
  for(let i=0;i<4;i++)rod([-.45+i*.012,1.267,-1.30],[ -.457+i*.015,1.45+random()*.04,-1.298],.0025,i%2?M.woodEdge:M.ink);
  box(.21,.032,.15,[-.10,1.218,-1.30],M.bookColors[5],.003);
  box(.19,.026,.138,[-.094,1.248,-1.296],M.bookColors[1],.003);
  // A small standing frame with an original illustration, not a family photograph.
  const portrait=new THREE.Group();portrait.name='Birthday frame';
  portrait.position.set(1.18,1.205,-1.20);portrait.rotation.y=.12;room.add(portrait);
  box(.19,.24,.022,[0,.12,0],M.woodEdge,.004,portrait);
  box(.166,.215,.006,[0,.12,.014],M.ceramic,.001,portrait);
  rod([0,.18,-.014],[0,.012,-.10],.006,M.woodEdge,portrait);
  const picture=mesh(new THREE.PlaneGeometry(.146,.19),new THREE.MeshStandardMaterial({color:'#ffffff',roughness:1}),[0,.12,.018],portrait);
  const portraitReady=new THREE.TextureLoader().loadAsync(new URL('./assets/child-illustration.svg',import.meta.url).href).then(texture=>{
    texture.colorSpace=THREE.SRGBColorSpace;picture.material.map=texture;picture.material.needsUpdate=true;
  });
  const portraitHit=mesh(new THREE.BoxGeometry(.25,.29,.12),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),[0,.13,0],portrait);
  portraitHit.castShadow=false;portraitHit.receiveShadow=false;
  // A printed travel map lies beside the desk chair, just above the floor.
  const travelMap=mesh(new THREE.PlaneGeometry(.88,.68),new THREE.MeshStandardMaterial({color:'#ffffff',roughness:1}),[1.29,.022,-.44]);
  travelMap.name='Kyushu travel map';travelMap.rotation.set(-Math.PI/2,0,-.16);
  travelMap.userData.href='/spaces/kyushu/';
  const mapReady=new THREE.TextureLoader().loadAsync(new URL('./assets/kyushu-map.svg',import.meta.url).href).then(texture=>{
    texture.colorSpace=THREE.SRGBColorSpace;travelMap.material.map=texture;travelMap.material.needsUpdate=true;
  });
  portraitHit.userData.href='/spaces/juha/index.html';
  return {room,M,ceiling,curtains,plant,landscapeReady,portraitReady,mapReady,portraitHit,travelMap,lampLight,lampGlow,bulbMaterial,backdrop};
}
