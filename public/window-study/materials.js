import * as THREE from './vendor/three.module.js';

// All surface textures are generated locally. No pixels from the reference photograph are shipped.
let seed = 3199;
export function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
export function texture(width,height,paint,color=true){
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  paint(canvas.getContext('2d'),width,height);
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=color?THREE.SRGBColorSpace:THREE.NoColorSpace;t.anisotropy=8;
  return t;
}
function noiseTexture(kind){
  return texture(512,512,(ctx,w,h)=>{
    const a=ctx.createImageData(w,h);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=(y*w+x)*4;let n;
      if(kind==='weave')n=170+38*Math.sin(x*Math.PI/2)*Math.sin(y*Math.PI/2)+random()*42;
      else n=210+random()*35+8*Math.sin(x*.05)*Math.cos(y*.08);
      a.data[i]=a.data[i+1]=a.data[i+2]=n;a.data[i+3]=255;
    }ctx.putImageData(a,0,0);
  },false);
}
export function makeMaterials(){
  const woodMap=texture(1024,512,(ctx,w,h)=>{
    const a=ctx.createImageData(w,h);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=(y*w+x)*4;
      const wave=y+6*Math.sin(x*.006+y*.014)+2*Math.sin(x*.017+y*.07);
      const grain=4*Math.sin(wave*.23)+2.5*Math.sin(wave*.84)+1.8*Math.sin(wave*2.2);
      const broad=6*Math.sin(y*.032+x*.0012)+3*Math.sin(y*.08-x*.002);
      const pore=(Math.pow((Math.sin(wave*2.8)+1)/2,16)*5)*(random()*.3+.7);
      const v=grain+broad-pore+(random()-.5)*5;
      a.data[i]=105+v;a.data[i+1]=65+v*.73;a.data[i+2]=43+v*.55;a.data[i+3]=255;
    }ctx.putImageData(a,0,0);
  });
  const weave=noiseTexture('weave');weave.wrapS=weave.wrapT=THREE.RepeatWrapping;weave.repeat.set(3,3);
  const plaster=noiseTexture('plaster');plaster.wrapS=plaster.wrapT=THREE.RepeatWrapping;plaster.repeat.set(5,5);
  const fabricMap=texture(512,512,(ctx,w,h)=>{
    const a=ctx.createImageData(w,h);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=(y*w+x)*4;const p=(random()-.5)*19+((x%4<2)===(y%4<2)?5:-5);
      a.data[i]=74+p;a.data[i+1]=82+p;a.data[i+2]=82+p;a.data[i+3]=255;
    }ctx.putImageData(a,0,0);
  });fabricMap.wrapS=fabricMap.wrapT=THREE.RepeatWrapping;fabricMap.repeat.set(2,2);
  const std=(color,roughness=0.6,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
  return {
    wood:new THREE.MeshPhysicalMaterial({map:woodMap,color:0xffffff,roughness:.34,clearcoat:.25,clearcoatRoughness:.36,bumpMap:woodMap,bumpScale:.0013}),
    woodDark:std('#39271e',.48),
    woodEdge:std('#62422f',.4),
    wall:std('#bfbfb4',.98,{bumpMap:plaster,bumpScale:.009}),
    wallWhite:std('#e5e4da',.9,{bumpMap:plaster,bumpScale:.005}),
    floor:std('#c5c5ba',.75,{bumpMap:plaster,bumpScale:.005}),
    grout:std('#b0b1a7',.9),
    white:std('#f1f0e9',.38),
    metalWhite:std('#efeee7',.3,{metalness:.22}),
    metal:std('#b7b9b5',.3,{metalness:.75}),
    black:std('#242824',.65),
    fabric:new THREE.MeshPhysicalMaterial({map:fabricMap,roughness:.95,bumpMap:weave,bumpScale:.006,sheen:1,sheenColor:new THREE.Color('#9aafa4'),sheenRoughness:1}),
    seam:std('#424b48',1),
    linen:new THREE.MeshPhysicalMaterial({color:'#f1f0e7',side:THREE.DoubleSide,roughness:1,transparent:true,opacity:.90,bumpMap:weave,bumpScale:.0025,sheen:1,sheenColor:new THREE.Color('#ffffff'),sheenRoughness:.85}),
    paper:std('#eee9dc',.97),
    terra:std('#a6765f',.85,{bumpMap:plaster,bumpScale:.004}),
    soil:std('#3a3428',1),
    stem:std('#756548',.9),
    leaf:new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.52,side:THREE.DoubleSide,sheen:.25,sheenColor:new THREE.Color('#c4d567')}),
    ink:std('#202b30',.4),
    brass:std('#a08c5b',.38,{metalness:.65}),
    ceramic:std('#e1e0cf',.25),
    bookColors:['#d4cdb8','#5f6c65','#3b494b','#777e77','#b0a387','#e3dfd0','#695a4e','#97896f','#4b5a56'].map(c=>std(c,.8))
  };
}

export function printedPage(kind='notes'){
  return texture(512,640,(c,w,h)=>{
    c.fillStyle='#eeeadd';c.fillRect(0,0,w,h);c.fillStyle='#455046';
    c.font='22px Georgia';c.fillText(kind==='notes'?'Observations':'RESEARCH NOTES',45,65);
    c.fillStyle='#a4a698';c.fillRect(45,87,422,1);
    if(kind==='notes'){
      c.strokeStyle='#b9bdae';c.lineWidth=1;
      for(let y=124;y<580;y+=30){c.beginPath();c.moveTo(45,y);c.lineTo(463,y);c.stroke();}
      c.strokeStyle='#657469';c.lineWidth=1.5;
      for(let line=0;line<7;line++){
        c.beginPath();for(let x=53;x<385-line*9;x+=4){const y=148+line*30+Math.sin(x*.16+line)*3+Math.sin(x*.59)*2;if(x===53)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();
      }
    }else{
      c.fillStyle='#808478';
      for(let col=0;col<2;col++)for(let y=118;y<380;y+=13)c.fillRect(45+col*226,y,140+random()*51,2);
      c.strokeStyle='#adb3a2';c.lineWidth=1;c.strokeRect(46,423,415,128);
      c.strokeStyle='#6c8468';c.lineWidth=2;c.beginPath();
      for(let x=0;x<385;x++){let y=516-50*(1/(1+Math.exp(-(x-130)*.035)))+Math.sin(x*.06)*6;if(!x)c.moveTo(60+x,y);else c.lineTo(60+x,y);}c.stroke();
      c.fillStyle='#909588';for(let y=583;y<620;y+=12)c.fillRect(46,y,390,2);
    }
  });
}

export function contactMap(){return texture(128,128,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'rgba(22,27,15,.48)');g.addColorStop(.35,'rgba(22,27,15,.29)');g.addColorStop(1,'rgba(22,27,15,0)');c.fillStyle=g;c.fillRect(0,0,w,h);});}
