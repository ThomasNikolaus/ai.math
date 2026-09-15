import{b as r,d as I,j as F}from"./shared-J67DA2QY.js";var p=r(I(),1);var c=(...e)=>e.filter((a,u,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===u).join(" ").trim();var M=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var D=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,u,o)=>o?o.toUpperCase():u.toLowerCase());var x=e=>{let a=D(e);return a.charAt(0).toUpperCase()+a.slice(1)};var s=r(I(),1);var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var R=e=>{for(let a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var f=r(I(),1);var V=(0,f.createContext)({});var T=()=>(0,f.useContext)(V);var q=(0,s.forwardRef)(({color:e,size:a,strokeWidth:u,absoluteStrokeWidth:o,className:L="",children:l,iconNode:y,...A},b)=>{let{size:m=24,strokeWidth:B=2,absoluteStrokeWidth:U=!1,color:O="currentColor",className:H=""}=T()??{},v=o??U?Number(u??B)*24/Number(a??m):u??B;return(0,s.createElement)("svg",{ref:b,...n,width:a??m??n.width,height:a??m??n.height,stroke:e??O,strokeWidth:v,className:c("lucide",H,L),...!l&&!R(A)&&{"aria-hidden":"true"},...A},[...y.map(([G,W])=>(0,s.createElement)(G,W)),...Array.isArray(l)?l:[l]])});var t=(e,a)=>{let u=(0,p.forwardRef)(({className:o,...L},l)=>(0,p.createElement)(q,{ref:l,iconNode:a,className:c(`lucide-${M(x(e))}`,`lucide-${e}`,o),...L}));return u.displayName=x(e),u};var E=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],C=t("arrow-right",E);var z=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],S=t("arrow-up-right",z);var X=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],h=t("book-open",X);var N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],d=t("circle-question-mark",N);var K=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],g=t("message-square",K);var Z=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],k=t("printer",Z);var Q=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],P=t("chevron-down",Q);var J=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],w=t("chevron-up",J);var i=r(F(),1);function Ga({title:e,subtitle:a,description:u}){return(0,i.jsxs)("section",{className:"page-heading",children:[(0,i.jsx)("h1",{children:{"Den Wandel gemeinsam gestalten":"KI und Mathematik","Shaping change together":"AI and Mathematics","Grunds\xE4tze f\xFCr die Forschung":"KI in der mathematischen Forschung","Principles for Research":"AI in Mathematical Research","Diskussionen in der Community":"Diskussion","Community Discussions":"Discussion"}[a]||a||e}),u&&(0,i.jsx)("p",{children:u})]})}export{C as a,S as b,h as c,P as d,w as e,d as f,g,k as h,Ga as i};
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
lucide-react/dist/esm/icons/circle-question-mark.mjs:
lucide-react/dist/esm/icons/message-square.mjs:
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
