import{S as Z,i as j,s as F,k as L,l as I,m as g,h as p,n as b,b as d,f as y,g as H,d as J,t as v,a1 as W,F as Y,a as $,c as x,a2 as h,_ as k,D as ee,I as N,L as w,M as U,N as B,q as K,r as Q,u as te,a3 as A,a4 as O,p as G,B as T,G as V,w as le,x as ne,y as se,O as ae,$ as oe,z as ie,H as R,T as re}from"./index-2aab38e9.js";function Ue({items:l,pageSize:e,currentPage:n}){return l.slice((n-1)*e,(n-1)*e+e)}var _;(function(l){l.PREVIOUS_PAGE="PREVIOUS_PAGE",l.NEXT_PAGE="NEXT_PAGE",l.ELLIPSIS="ELLIPSIS"})(_||(_={}));function ue({totalItems:l,pageSize:e,currentPage:n,limit:a,showStepOptions:t=!1}){const s=Math.ceil(l/e),r=a&&s>me(a)?fe({totalPages:s,limit:a,currentPage:n}):_e({totalPages:s});return t?ce({options:r,currentPage:n,totalPages:s}):r}function _e({totalPages:l}){return new Array(l).fill(null).map((e,n)=>({type:"number",value:n+1}))}function fe({totalPages:l,limit:e,currentPage:n}){const a=e*2+2,t=1+a,s=l-a,o=t+2;return n<=t-e?Array(o).fill(null).map((r,i)=>i===o-1?{type:"number",value:l}:i===o-2?{type:"symbol",symbol:_.ELLIPSIS,value:t+1}:{type:"number",value:i+1}):n>=s+e?Array(o).fill(null).map((r,i)=>i===0?{type:"number",value:1}:i===1?{type:"symbol",symbol:_.ELLIPSIS,value:s-1}:{type:"number",value:s+i-2}):n>=t-e&&n<=s+e?Array(o).fill(null).map((r,i)=>i===0?{type:"number",value:1}:i===1?{type:"symbol",symbol:_.ELLIPSIS,value:n-e+(i-2)}:i===o-1?{type:"number",value:l}:i===o-2?{type:"symbol",symbol:_.ELLIPSIS,value:n+e+1}:{type:"number",value:n-e+(i-2)}):[]}function ce({options:l,currentPage:e,totalPages:n}){return[{type:"symbol",symbol:_.PREVIOUS_PAGE,value:e<=1?1:e-1},...l||[],{type:"symbol",symbol:_.NEXT_PAGE,value:e>=n?n:e+1}]}function me(l){return l*2+3+2}function X(l,e,n){const a=l.slice();return a[12]=e[n],a}const pe=l=>({}),D=l=>({}),he=l=>({}),M=l=>({}),be=l=>({}),z=l=>({}),ye=l=>({value:l&4}),q=l=>({value:l[12].value});function ge(l){let e;const n=l[9].next,a=N(n,l,l[8],D),t=a||Pe();return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,o){t&&t.m(s,o),e=!0},p(s,o){a&&a.p&&(!e||o&256)&&w(a,n,s,s[8],e?B(n,s[8],o,pe):U(s[8]),D)},i(s){e||(y(t,s),e=!0)},o(s){v(t,s),e=!1},d(s){t&&t.d(s)}}}function ve(l){let e;const n=l[9].prev,a=N(n,l,l[8],M),t=a||Se();return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,o){t&&t.m(s,o),e=!0},p(s,o){a&&a.p&&(!e||o&256)&&w(a,n,s,s[8],e?B(n,s[8],o,he):U(s[8]),M)},i(s){e||(y(t,s),e=!0)},o(s){v(t,s),e=!1},d(s){t&&t.d(s)}}}function de(l){let e;const n=l[9].ellipsis,a=N(n,l,l[8],z),t=a||Le();return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,o){t&&t.m(s,o),e=!0},p(s,o){a&&a.p&&(!e||o&256)&&w(a,n,s,s[8],e?B(n,s[8],o,be):U(s[8]),z)},i(s){e||(y(t,s),e=!0)},o(s){v(t,s),e=!1},d(s){t&&t.d(s)}}}function Ee(l){let e;const n=l[9].number,a=N(n,l,l[8],q),t=a||Ie(l);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,o){t&&t.m(s,o),e=!0},p(s,o){a?a.p&&(!e||o&260)&&w(a,n,s,s[8],e?B(n,s[8],o,ye):U(s[8]),q):t&&t.p&&(!e||o&4)&&t.p(s,e?o:-1)},i(s){e||(y(t,s),e=!0)},o(s){v(t,s),e=!1},d(s){t&&t.d(s)}}}function Pe(l){let e,n;return{c(){e=A("svg"),n=A("path"),this.h()},l(a){e=O(a,"svg",{style:!0,viewBox:!0});var t=g(e);n=O(t,"path",{fill:!0,d:!0}),g(n).forEach(p),t.forEach(p),this.h()},h(){b(n,"fill","#000000"),b(n,"d","M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"),G(e,"width","24px"),G(e,"height","24px"),b(e,"viewBox","0 0 24 24")},m(a,t){d(a,e,t),k(e,n)},p:T,d(a){a&&p(e)}}}function Se(l){let e,n;return{c(){e=A("svg"),n=A("path"),this.h()},l(a){e=O(a,"svg",{style:!0,viewBox:!0});var t=g(e);n=O(t,"path",{fill:!0,d:!0}),g(n).forEach(p),t.forEach(p),this.h()},h(){b(n,"fill","#000000"),b(n,"d","M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"),G(e,"width","24px"),G(e,"height","24px"),b(e,"viewBox","0 0 24 24")},m(a,t){d(a,e,t),k(e,n)},p:T,d(a){a&&p(e)}}}function Le(l){let e,n;return{c(){e=L("span"),n=K("...")},l(a){e=I(a,"SPAN",{});var t=g(e);n=Q(t,"..."),t.forEach(p)},m(a,t){d(a,e,t),k(e,n)},p:T,d(a){a&&p(e)}}}function Ie(l){let e,n=l[12].value+"",a;return{c(){e=L("span"),a=K(n)},l(t){e=I(t,"SPAN",{});var s=g(e);a=Q(s,n),s.forEach(p)},m(t,s){d(t,e,s),k(e,a)},p(t,s){s&4&&n!==(n=t[12].value+"")&&te(a,n)},d(t){t&&p(e)}}}function C(l){let e,n,a,t,s,o,r;const i=[Ee,de,ve,ge],c=[];function E(u,f){return u[12].type==="number"?0:u[12].type==="symbol"&&u[12].symbol===_.ELLIPSIS?1:u[12].type==="symbol"&&u[12].symbol===_.PREVIOUS_PAGE?2:u[12].type==="symbol"&&u[12].symbol===_.NEXT_PAGE?3:-1}~(n=E(l))&&(a=c[n]=i[n](l));function P(){return l[10](l[12])}return{c(){e=L("span"),a&&a.c(),t=$(),this.h()},l(u){e=I(u,"SPAN",{class:!0,role:!0});var f=g(e);a&&a.l(f),t=x(f),f.forEach(p),this.h()},h(){b(e,"class","option"),b(e,"role","presentation"),h(e,"number",l[12].type==="number"),h(e,"prev",l[12].type==="symbol"&&l[12].symbol===_.PREVIOUS_PAGE),h(e,"next",l[12].type==="symbol"&&l[12].symbol===_.NEXT_PAGE),h(e,"disabled",l[12].type==="symbol"&&l[12].symbol===_.NEXT_PAGE&&l[0]>=l[1]||l[12].type==="symbol"&&l[12].symbol===_.PREVIOUS_PAGE&&l[0]<=1),h(e,"ellipsis",l[12].type==="symbol"&&l[12].symbol===_.ELLIPSIS),h(e,"active",l[12].type==="number"&&l[12].value===l[0])},m(u,f){d(u,e,f),~n&&c[n].m(e,null),k(e,t),s=!0,o||(r=ee(e,"click",P),o=!0)},p(u,f){l=u;let S=n;n=E(l),n===S?~n&&c[n].p(l,f):(a&&(H(),v(c[S],1,1,()=>{c[S]=null}),J()),~n?(a=c[n],a?a.p(l,f):(a=c[n]=i[n](l),a.c()),y(a,1),a.m(e,t)):a=null),(!s||f&4)&&h(e,"number",l[12].type==="number"),(!s||f&4)&&h(e,"prev",l[12].type==="symbol"&&l[12].symbol===_.PREVIOUS_PAGE),(!s||f&4)&&h(e,"next",l[12].type==="symbol"&&l[12].symbol===_.NEXT_PAGE),(!s||f&7)&&h(e,"disabled",l[12].type==="symbol"&&l[12].symbol===_.NEXT_PAGE&&l[0]>=l[1]||l[12].type==="symbol"&&l[12].symbol===_.PREVIOUS_PAGE&&l[0]<=1),(!s||f&4)&&h(e,"ellipsis",l[12].type==="symbol"&&l[12].symbol===_.ELLIPSIS),(!s||f&5)&&h(e,"active",l[12].type==="number"&&l[12].value===l[0])},i(u){s||(y(a),s=!0)},o(u){v(a),s=!1},d(u){u&&p(e),~n&&c[n].d(),o=!1,r()}}}function ke(l){let e,n,a=l[2],t=[];for(let o=0;o<a.length;o+=1)t[o]=C(X(l,a,o));const s=o=>v(t[o],1,1,()=>{t[o]=null});return{c(){e=L("div");for(let o=0;o<t.length;o+=1)t[o].c();this.h()},l(o){e=I(o,"DIV",{class:!0});var r=g(e);for(let i=0;i<t.length;i+=1)t[i].l(r);r.forEach(p),this.h()},h(){b(e,"class","pagination-nav")},m(o,r){d(o,e,r);for(let i=0;i<t.length;i+=1)t[i].m(e,null);n=!0},p(o,[r]){if(r&271){a=o[2];let i;for(i=0;i<a.length;i+=1){const c=X(o,a,i);t[i]?(t[i].p(c,r),y(t[i],1)):(t[i]=C(c),t[i].c(),y(t[i],1),t[i].m(e,null))}for(H(),i=a.length;i<t.length;i+=1)s(i);J()}},i(o){if(!n){for(let r=0;r<a.length;r+=1)y(t[r]);n=!0}},o(o){t=t.filter(Boolean);for(let r=0;r<t.length;r+=1)v(t[r]);n=!1},d(o){o&&p(e),W(t,o)}}}function Ae(l,e,n){let a,t,{$$slots:s={},$$scope:o}=e;const r=Y();let{totalItems:i=0}=e,{pageSize:c=1}=e,{currentPage:E=1}=e,{limit:P=void 0}=e,{showStepOptions:u=!1}=e;function f(m){r("setPage",{page:m.value})}const S=m=>f(m);return l.$$set=m=>{"totalItems"in m&&n(4,i=m.totalItems),"pageSize"in m&&n(5,c=m.pageSize),"currentPage"in m&&n(0,E=m.currentPage),"limit"in m&&n(6,P=m.limit),"showStepOptions"in m&&n(7,u=m.showStepOptions),"$$scope"in m&&n(8,o=m.$$scope)},l.$$.update=()=>{l.$$.dirty&241&&n(2,a=ue({totalItems:i,pageSize:c,currentPage:E,limit:P,showStepOptions:u})),l.$$.dirty&48&&n(1,t=Math.ceil(i/c))},[E,t,a,f,i,c,P,u,o,s,S]}class Oe extends Z{constructor(e){super(),j(this,e,Ae,ke,F,{totalItems:4,pageSize:5,currentPage:0,limit:6,showStepOptions:7})}}function Ge(l){let e,n,a;const t=[l[0]];let s={};for(let o=0;o<t.length;o+=1)s=V(s,t[o]);return n=new Oe({props:s}),n.$on("setPage",l[1]),{c(){e=L("div"),le(n.$$.fragment),this.h()},l(o){e=I(o,"DIV",{class:!0});var r=g(e);ne(n.$$.fragment,r),r.forEach(p),this.h()},h(){b(e,"class","light-pagination-nav svelte-s5ru8s")},m(o,r){d(o,e,r),se(n,e,null),a=!0},p(o,[r]){const i=r&1?ae(t,[oe(o[0])]):{};n.$set(i)},i(o){a||(y(n.$$.fragment,o),a=!0)},o(o){v(n.$$.fragment,o),a=!1},d(o){o&&p(e),ie(n)}}}function Ne(l,e,n){function a(t){re.call(this,l,t)}return l.$$set=t=>{n(0,e=V(V({},e),R(t)))},e=R(e),[e,a]}class Be extends Z{constructor(e){super(),j(this,e,Ne,Ge,F,{})}}export{Be as L,Ue as p};