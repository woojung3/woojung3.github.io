import{S as H,i as A,s as C,k as g,a as q,w as N,l as d,m as P,h as m,c as y,x as O,n as $,b as v,y as Q,f as R,t as T,T as U,z as j,q as b,r as E,Q as p,u as k}from"../../../chunks/index-e803450b.js";import{L as B,p as D}from"../../../chunks/DarkPaginationNav.svelte_svelte_type_style_lang-9c91ebd8.js";function w(i,a,r){const l=i.slice();return l[5]=a[r],l}function I(i){let a,r,l,f=i[5].meta.title+"",c,t,e,n=i[5].meta.date+"",o,s,_;return{c(){a=g("li"),r=g("h4"),l=g("a"),c=b(f),e=b(`
      Published `),o=b(n),s=q(),_=g("hr"),this.h()},l(h){a=d(h,"LI",{class:!0});var u=P(a);r=d(u,"H4",{});var L=P(r);l=d(L,"A",{href:!0});var S=P(l);c=E(S,f),S.forEach(m),L.forEach(m),e=E(u,`
      Published `),o=E(u,n),u.forEach(m),s=y(h),_=d(h,"HR",{}),this.h()},h(){$(l,"href",t=i[5].path),$(a,"class","item")},m(h,u){v(h,a,u),p(a,r),p(r,l),p(l,c),p(a,e),p(a,o),v(h,s,u),v(h,_,u)},p(h,u){u&2&&f!==(f=h[5].meta.title+"")&&k(c,f),u&2&&t!==(t=h[5].path)&&$(l,"href",t),u&2&&n!==(n=h[5].meta.date+"")&&k(o,n)},d(h){h&&m(a),h&&m(s),h&&m(_)}}}function F(i){let a,r,l,f,c=i[1],t=[];for(let e=0;e<c.length;e+=1)t[e]=I(w(i,c,e));return l=new B({props:{totalItems:i[2].length,pageSize:z,currentPage:i[0],limit:1,showStepOptions:!0}}),l.$on("setPage",i[4]),{c(){a=g("ul");for(let e=0;e<t.length;e+=1)t[e].c();r=q(),N(l.$$.fragment),this.h()},l(e){a=d(e,"UL",{class:!0});var n=P(a);for(let o=0;o<t.length;o+=1)t[o].l(n);n.forEach(m),r=y(e),O(l.$$.fragment,e),this.h()},h(){$(a,"class","items")},m(e,n){v(e,a,n);for(let o=0;o<t.length;o+=1)t[o].m(a,null);v(e,r,n),Q(l,e,n),f=!0},p(e,[n]){if(n&2){c=e[1];let s;for(s=0;s<c.length;s+=1){const _=w(e,c,s);t[s]?t[s].p(_,n):(t[s]=I(_),t[s].c(),t[s].m(a,null))}for(;s<t.length;s+=1)t[s].d(1);t.length=c.length}const o={};n&1&&(o.currentPage=e[0]),l.$set(o)},i(e){f||(R(l.$$.fragment,e),f=!0)},o(e){T(l.$$.fragment,e),f=!1},d(e){e&&m(a),U(t,e),e&&m(r),j(l,e)}}}let z=10;function G(i,a,r){let l,{data:f}=a,c=f.posts,t=1;const e=n=>r(0,t=n.detail.page);return i.$$set=n=>{"data"in n&&r(3,f=n.data)},i.$$.update=()=>{i.$$.dirty&1&&r(1,l=D({items:c,pageSize:z,currentPage:t}))},[t,l,c,f,e]}class M extends H{constructor(a){super(),A(this,a,G,F,C,{data:3})}}export{M as default};