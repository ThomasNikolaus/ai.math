import{b as p,d as L}from"./shared-USR7AHWJ.js";var i=p(L(),1);var r=(...e)=>e.filter((a,u,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===u).join(" ").trim();var A=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var B=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,u,o)=>o?o.toUpperCase():u.toLowerCase());var m=e=>{let a=B(e);return a.charAt(0).toUpperCase()+a.slice(1)};var f=p(L(),1);var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var M=e=>{for(let a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var l=p(L(),1);var v=(0,l.createContext)({});var F=()=>(0,l.useContext)(v);var D=(0,f.forwardRef)(({color:e,size:a,strokeWidth:u,absoluteStrokeWidth:o,className:c="",children:d,iconNode:R,...P},y)=>{let{size:n=24,strokeWidth:w=2,absoluteStrokeWidth:T=!1,color:q="currentColor",className:b=""}=F()??{},U=o??T?Number(u??w)*24/Number(a??n):u??w;return(0,f.createElement)("svg",{ref:y,...s,width:a??n??s.width,height:a??n??s.height,stroke:e??q,strokeWidth:U,className:r("lucide",b,c),...!d&&!M(P)&&{"aria-hidden":"true"},...P},[...R.map(([O,H])=>(0,f.createElement)(O,H)),...Array.isArray(d)?d:[d]])});var t=(e,a)=>{let u=(0,i.forwardRef)(({className:o,...c},d)=>(0,i.createElement)(D,{ref:d,iconNode:a,className:r(`lucide-${A(m(e))}`,`lucide-${e}`,o),...c}));return u.displayName=m(e),u};var G=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],I=t("arrow-right",G);var W=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],x=t("arrow-up-right",W);var V=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],C=t("book-open",V);var E=[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M8 13h.01",key:"1sbv64"}],["path",{d:"M12 13h.01",key:"y0uutt"}],["path",{d:"M16 13h.01",key:"wip0gl"}],["path",{d:"M8 17h.01",key:"p3bg7i"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M16 17h.01",key:"ql8jdd"}]],S=t("calendar-days",E);var X=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],h=t("printer",X);var z=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],g=t("chevron-down",z);var N=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],k=t("chevron-up",N);export{I as a,x as b,C as c,S as d,g as e,k as f,h as g};
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
lucide-react/dist/esm/icons/arrow-up-right.mjs:
lucide-react/dist/esm/icons/book-open.mjs:
lucide-react/dist/esm/icons/calendar-days.mjs:
lucide-react/dist/esm/icons/printer.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-up.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.31.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
