function v(){}function I(t,e){for(const n in e)t[n]=e[n];return t}function T(t){return t()}function M(){return Object.create(null)}function y(t){t.forEach(T)}function L(t){return typeof t=="function"}function ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let x;function ft(t,e){return x||(x=document.createElement("a")),x.href=e,t===x.href}function W(t){return Object.keys(t).length===0}function G(t,...e){if(t==null)return v;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function at(t,e,n){t.$$.on_destroy.push(G(e,n))}function _t(t,e,n,i){if(t){const r=q(t,e,n,i);return t[0](r)}}function q(t,e,n,i){return t[1]&&i?I(n.ctx.slice(),t[1](i(e))):n.ctx}function dt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],c=Math.max(e.dirty.length,r.length);for(let o=0;o<c;o+=1)u[o]=e.dirty[o]|r[o];return u}return e.dirty|r}return e.dirty}function ht(t,e,n,i,r,u){if(r){const c=q(e,n,i,u);t.p(c,r)}}function mt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function pt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function yt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}let w=!1;function J(){w=!0}function K(){w=!1}function Q(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function R(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let l=0;l<e.length;l++){const a=e[l];a.claim_order!==void 0&&s.push(a)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const l=e[s].claim_order,a=(r>0&&e[n[r]].claim_order<=l?r+1:Q(1,r,g=>e[n[g]].claim_order,l))-1;i[s]=n[a]+1;const f=a+1;n[f]=s,r=Math.max(f,r)}const u=[],c=[];let o=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(u.push(e[s-1]);o>=s;o--)c.push(e[o]);o--}for(;o>=0;o--)c.push(e[o]);u.reverse(),c.sort((s,l)=>s.claim_order-l.claim_order);for(let s=0,l=0;s<c.length;s++){for(;l<u.length&&c[s].claim_order>=u[l].claim_order;)l++;const a=l<u.length?u[l]:null;t.insertBefore(c[s],a)}}function U(t,e){if(w){for(R(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){w&&!n?U(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function V(t){t.parentNode&&t.parentNode.removeChild(t)}function xt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function X(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function bt(){return S(" ")}function $t(){return S("")}function vt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Z(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function wt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:Z(t,i,e[i])}function tt(t){return Array.from(t.childNodes)}function et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function B(t,e,n,i,r=!1){et(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(e(o)){const s=n(o);return s===void 0?t.splice(c,1):t[c]=s,r||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(e(o)){const s=n(o);return s===void 0?t.splice(c,1):t[c]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function D(t,e,n,i){return B(t,r=>r.nodeName===e,r=>{const u=[];for(let c=0;c<r.attributes.length;c++){const o=r.attributes[c];n[o.name]||u.push(o.name)}u.forEach(c=>r.removeAttribute(c))},()=>i(e))}function Et(t,e,n){return D(t,e,n,X)}function kt(t,e,n){return D(t,e,n,Y)}function nt(t,e){return B(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>S(e),!0)}function Nt(t){return nt(t," ")}function jt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function St(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function At(t,e,n){t.classList[n?"add":"remove"](e)}function it(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function Ct(t,e){return new t(e)}let p;function m(t){p=t}function E(){if(!p)throw new Error("Function called outside component initialization");return p}function Mt(t){E().$$.on_mount.push(t)}function Ot(t){E().$$.after_update.push(t)}function Pt(){const t=E();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const u=it(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,u)}),!u.defaultPrevented}return!0}}function Tt(t,e){return E().$$.context.set(t,e),e}function Lt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const h=[],O=[],b=[],P=[],z=Promise.resolve();let N=!1;function F(){N||(N=!0,z.then(H))}function qt(){return F(),z}function j(t){b.push(t)}const k=new Set;let d=0;function H(){if(d!==0)return;const t=p;do{try{for(;d<h.length;){const e=h[d];d++,m(e),rt(e.$$)}}catch(e){throw h.length=0,d=0,e}for(m(null),h.length=0,d=0;O.length;)O.pop()();for(let e=0;e<b.length;e+=1){const n=b[e];k.has(n)||(k.add(n),n())}b.length=0}while(h.length);for(;P.length;)P.pop()();N=!1,k.clear(),m(t)}function rt(t){if(t.fragment!==null){t.update(),y(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const $=new Set;let _;function Bt(){_={r:0,c:[],p:_}}function Dt(){_.r||y(_.c),_=_.p}function ct(t,e){t&&t.i&&($.delete(t),t.i(e))}function zt(t,e,n,i){if(t&&t.o){if($.has(t))return;$.add(t),_.c.push(()=>{$.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Ft(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const c=t[u],o=e[u];if(o){for(const s in c)s in o||(i[s]=1);for(const s in o)r[s]||(n[s]=o[s],r[s]=1);t[u]=o}else for(const s in c)r[s]=1}for(const c in i)c in n||(n[c]=void 0);return n}function Ht(t){return typeof t=="object"&&t!==null?t:{}}function It(t){t&&t.c()}function Wt(t,e){t&&t.l(e)}function st(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||j(()=>{const c=t.$$.on_mount.map(T).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),u.forEach(j)}function ot(t,e){const n=t.$$;n.fragment!==null&&(y(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function lt(t,e){t.$$.dirty[0]===-1&&(h.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Gt(t,e,n,i,r,u,c,o=[-1]){const s=p;m(t);const l=t.$$={fragment:null,ctx:[],props:u,update:v,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:M(),dirty:o,skip_bound:!1,root:e.target||s.$$.root};c&&c(l.root);let a=!1;if(l.ctx=n?n(t,e.props||{},(f,g,...A)=>{const C=A.length?A[0]:g;return l.ctx&&r(l.ctx[f],l.ctx[f]=C)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](C),a&&lt(t,f)),g}):[],l.update(),a=!0,y(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){J();const f=tt(e.target);l.fragment&&l.fragment.l(f),f.forEach(V)}else l.fragment&&l.fragment.c();e.intro&&ct(t.$$.fragment),st(t,e.target,e.anchor,e.customElement),K(),H()}m(s)}class Jt{$destroy(){ot(this,1),this.$destroy=v}$on(e,n){if(!L(n))return v;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!W(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{qt as A,v as B,_t as C,I as D,wt as E,ht as F,mt as G,dt as H,Ft as I,yt as J,pt as K,Tt as L,vt as M,y as N,Lt as O,U as P,at as Q,ft as R,Jt as S,xt as T,Pt as U,At as V,Y as W,kt as X,Ht as Y,bt as a,gt as b,Nt as c,Dt as d,$t as e,ct as f,Bt as g,V as h,Gt as i,Ot as j,X as k,Et as l,tt as m,Z as n,Mt as o,St as p,S as q,nt as r,ut as s,zt as t,jt as u,Ct as v,It as w,Wt as x,st as y,ot as z};
