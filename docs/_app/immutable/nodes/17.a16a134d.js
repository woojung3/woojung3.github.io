import{S as L,i as k,s as y,k as _,q as b,a as C,l as m,m as p,r as E,h as c,c as P,b as u,_ as d,U as g,a1 as j,n as q}from"../chunks/index.000b7253.js";/* empty css                                                        */function v(o,a,n){const i=o.slice();return i[1]=a[n],i}function x(o){let a,n,i=o[1].title+"",r;return{c(){a=_("li"),n=_("a"),r=b(i),this.h()},l(s){a=m(s,"LI",{});var t=p(a);n=m(t,"A",{href:!0});var e=p(n);r=E(e,i),e.forEach(c),t.forEach(c),this.h()},h(){q(n,"href",o[1].url)},m(s,t){u(s,a,t),d(a,n),d(n,r)},p:g,d(s){s&&c(a)}}}function w(o){let a,n,i,r,s=o[0],t=[];for(let e=0;e<s.length;e+=1)t[e]=x(v(o,s,e));return{c(){a=_("h1"),n=b("Presentations"),i=C(),r=_("ul");for(let e=0;e<t.length;e+=1)t[e].c()},l(e){a=m(e,"H1",{});var h=p(a);n=E(h,"Presentations"),h.forEach(c),i=P(e),r=m(e,"UL",{});var l=p(r);for(let f=0;f<t.length;f+=1)t[f].l(l);l.forEach(c)},m(e,h){u(e,a,h),d(a,n),u(e,i,h),u(e,r,h);for(let l=0;l<t.length;l+=1)t[l]&&t[l].m(r,null)},p(e,[h]){if(h&1){s=e[0];let l;for(l=0;l<s.length;l+=1){const f=v(e,s,l);t[l]?t[l].p(f,h):(t[l]=x(f),t[l].c(),t[l].m(r,null))}for(;l<t.length;l+=1)t[l].d(1);t.length=s.length}},i:g,o:g,d(e){e&&c(a),e&&c(i),e&&c(r),j(t,e)}}}function A(o){return[[{url:"https://woojung3.github.io/new_leader_guide/",title:"AutoCrypt V2X.platform 그룹 리더 가이드"},{url:"/html/2023-01-28_rust/index.html",title:"Comprehensive Rust (reveal.js 학습용)"}]]}class $ extends L{constructor(a){super(),k(this,a,A,w,y,{})}}export{$ as component};
