// Self-hosted Three.js component. All dependencies and assets are relative local files.
const shell="<section class=\"study\" aria-label=\"Study\">\n  <div id=\"scene\"></div>\n  <div class=\"loading\" id=\"loading\" role=\"status\">Loading...</div>\n  <div class=\"error-state\" id=\"error\" hidden role=\"alert\"><p>Unable to load the scene.</p><button type=\"button\" id=\"retry\">Retry</button></div>\n  <nav class=\"controls\" aria-label=\"Scene controls\">\n    <button type=\"button\" id=\"previous\" aria-label=\"Previous view\" title=\"Previous view\"><svg viewBox=\"0 0 24 24\"><path d=\"m14 6-6 6 6 6\"/></svg></button>\n    <button type=\"button\" id=\"next\" aria-label=\"Next view\" title=\"Next view\"><svg viewBox=\"0 0 24 24\"><path d=\"m10 6 6 6-6 6\"/></svg></button>\n    <button type=\"button\" id=\"reset\" aria-label=\"Reset view\" title=\"Reset view\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 10a8 8 0 1 1 1 8M4 4v6h6\"/></svg></button>\n    <button type=\"button\" id=\"lamp\" aria-label=\"Night lighting\" title=\"Night lighting\" aria-pressed=\"false\"><svg viewBox=\"0 0 24 24\"><path d=\"m9 3-4 9h14l-4-9H9ZM12 12v8m-5 1h10\"/></svg></button>\n  </nav>\n</section>";
export class WindowStudy extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});this._generation=0;this._dispose=null;}
  connectedCallback(){this.restart();}
  disconnectedCallback(){this._generation++;this._dispose?.();this._dispose=null;}
  restart(){
    this._dispose?.();this._dispose=null;
    const generation=++this._generation,root=this.shadowRoot;
    root.innerHTML=shell;
    const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./style.css',import.meta.url).href;
    const styles=new Promise((resolve,reject)=>{link.onload=resolve;link.onerror=()=>reject(new Error('Study stylesheet unavailable'));});
    root.prepend(link);
    root.getElementById('retry').addEventListener('click',()=>this.restart());
    this.ready=Promise.all([styles,import('./engine.js')]).then(([,module])=>{
      if(!this.isConnected||generation!==this._generation)return;
      this._dispose=module.mountStudy(root);
    }).catch(error=>{
      if(generation!==this._generation||!this.isConnected)return;
      console.error(error);root.getElementById('loading').hidden=true;root.getElementById('error').hidden=false;
      this.dispatchEvent(new CustomEvent('study-error',{detail:error,bubbles:true,composed:true}));
    });
  }
}
if(!customElements.get('window-study'))customElements.define('window-study',WindowStudy);
