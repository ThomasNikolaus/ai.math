import{b as L,d as m}from"./shared-Y4EXLYQT.js";var c=L(m(),1);var s=(...t)=>t.filter((a,u,d)=>!!a&&a.trim()!==""&&d.indexOf(a)===u).join(" ").trim();var B=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();var F=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,u,d)=>d?d.toUpperCase():u.toLowerCase());var I=t=>{let a=F(t);return a.charAt(0).toUpperCase()+a.slice(1)};var r=L(m(),1);var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var M=t=>{for(let a in t)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var f=L(m(),1);var G=(0,f.createContext)({});var D=()=>(0,f.useContext)(G);var R=(0,r.forwardRef)(({color:t,size:a,strokeWidth:u,absoluteStrokeWidth:d,className:n="",children:l,iconNode:T,...w},q)=>{let{size:p=24,strokeWidth:A=2,absoluteStrokeWidth:y=!1,color:b="currentColor",className:U=""}=D()??{},O=d??y?Number(u??A)*24/Number(a??p):u??A;return(0,r.createElement)("svg",{ref:q,...i,width:a??p??i.width,height:a??p??i.height,stroke:t??b,strokeWidth:O,className:s("lucide",U,n),...!l&&!M(w)&&{"aria-hidden":"true"},...w},[...T.map(([H,v])=>(0,r.createElement)(H,v)),...Array.isArray(l)?l:[l]])});var e=(t,a)=>{let u=(0,c.forwardRef)(({className:d,...n},l)=>(0,c.createElement)(R,{ref:l,iconNode:a,className:s(`lucide-${B(I(t))}`,`lucide-${t}`,d),...n}));return u.displayName=I(t),u};var W=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],x=e("arrow-right",W);var V=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],C=e("arrow-up-right",V);var E=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],S=e("book-open",E);var X=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],o=e("circle-question-mark",X);var z=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],h=e("message-square",z);var N=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],g=e("printer",N);var K=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],k=e("chevron-down",K);var Z=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],P=e("chevron-up",Z);export{x as a,C as b,S as c,k as d,P as e,o as f,h as g,g as h};
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
