import{a as p,b as L}from"./shared-OWXBH7IE.js";var i=p(L(),1);var r=(...e)=>e.filter((a,u,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===u).join(" ").trim();var P=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,u,o)=>o?o.toUpperCase():u.toLowerCase());var m=e=>{let a=w(e);return a.charAt(0).toUpperCase()+a.slice(1)};var f=p(L(),1);var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var A=e=>{for(let a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var l=p(L(),1);var O=(0,l.createContext)({});var B=()=>(0,l.useContext)(O);var F=(0,f.forwardRef)(({color:e,size:a,strokeWidth:u,absoluteStrokeWidth:o,className:c="",children:d,iconNode:M,...g},D)=>{let{size:n=24,strokeWidth:k=2,absoluteStrokeWidth:R=!1,color:y="currentColor",className:T=""}=B()??{},q=o??R?Number(u??k)*24/Number(a??n):u??k;return(0,f.createElement)("svg",{ref:D,...s,width:a??n??s.width,height:a??n??s.height,stroke:e??y,strokeWidth:q,className:r("lucide",T,c),...!d&&!A(g)&&{"aria-hidden":"true"},...g},[...M.map(([b,U])=>(0,f.createElement)(b,U)),...Array.isArray(d)?d:[d]])});var t=(e,a)=>{let u=(0,i.forwardRef)(({className:o,...c},d)=>(0,i.createElement)(F,{ref:d,iconNode:a,className:r(`lucide-${P(m(e))}`,`lucide-${e}`,o),...c}));return u.displayName=m(e),u};var H=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],I=t("arrow-right",H);var v=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],x=t("book-open",v);var G=[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M8 13h.01",key:"1sbv64"}],["path",{d:"M12 13h.01",key:"y0uutt"}],["path",{d:"M16 13h.01",key:"wip0gl"}],["path",{d:"M8 17h.01",key:"p3bg7i"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M16 17h.01",key:"ql8jdd"}]],C=t("calendar-days",G);var W=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],S=t("printer",W);var V=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],h=t("server",V);export{I as a,x as b,C as c,S as d,h as e};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/arrow-right.mjs:
lucide-react/dist/esm/icons/book-open.mjs:
lucide-react/dist/esm/icons/calendar-days.mjs:
lucide-react/dist/esm/icons/printer.mjs:
lucide-react/dist/esm/icons/server.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.31.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
