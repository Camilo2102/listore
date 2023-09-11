(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[722],{23445:function(e,t,n){Promise.resolve().then(n.bind(n,21799))},52845:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var i=n(9268);function r(e){let{title:t}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,i.jsx)("h2",{style:{fontSize:"50px",color:"#9e6a90",fontStyle:"italic",marginTop:"1px"},children:t})})})}},59808:function(e,t,n){"use strict";n.d(t,{A:function(){return i}});class i{}i.INVENTORY="inventory",i.PRODUCT="product",i.USER="user",i.SUPPLIER="supplier",i.SPENT="spent",i.ATTRIBUTES="atributes",i.SALE="sale",i.BUY="buy",i.PATTERN="pattern",i.KINDOFPRODUCT="kindOfProduct",i.CHARACTERISTIC="characteristic"},46003:function(e,t,n){"use strict";n.d(t,{C:function(){return r},W:function(){return s}});class i{}i.CHALLENGER_DESC="Challenger",i.MASTER_DESC="Master",i.DIAMOND_DESC="Diamond",i.PLATINUM_DESC="Platinum",i.GOLD_DESC="Gold",i.CHALLENGER_VAL="C",i.MASTER_VAL="M",i.DIAMOND_VAL="D",i.PLATINUM_VAL="P",i.GOLD_VAL="G";let r={[i.CHALLENGER_VAL]:i.CHALLENGER_DESC,[i.MASTER_VAL]:i.MASTER_DESC,[i.DIAMOND_VAL]:i.DIAMOND_DESC,[i.PLATINUM_VAL]:i.PLATINUM_DESC,[i.GOLD_VAL]:i.GOLD_DESC},s=[{code:i.DIAMOND_DESC,value:i.DIAMOND_VAL,description:i.DIAMOND_DESC},{code:i.PLATINUM_DESC,value:i.PLATINUM_VAL,description:i.PLATINUM_DESC},{code:i.GOLD_DESC,value:i.GOLD_VAL,description:i.GOLD_DESC}]},34849:function(e,t,n){"use strict";n.d(t,{P:function(){return l},r:function(){return a}});var i=n(9268),r=n(86006);let s=(0,r.createContext)({});function a(){return(0,r.useContext)(s)}function l(e){let{children:t}=e,[n,a]=(0,r.useState)(!1);return(0,i.jsx)(s.Provider,{value:{isLoading:n,startLoading:()=>a(!0),stopLoading:()=>a(!1)},children:t})}},24139:function(e,t,n){"use strict";n.d(t,{KQ:function(){return u},QR:function(){return c}});var i=n(9268),r=n(56008),s=n(86006),a=n(34849);let l=(0,s.createContext)({});function c(){return(0,s.useContext)(l)}let u=e=>{let{children:t}=e,n=(0,r.useRouter)(),c=(0,r.usePathname)(),u=(0,r.useSearchParams)(),{startLoading:o,stopLoading:d}=(0,a.r)(),[E,f]=(0,s.useState)(""),C=e=>(""!==E&&(e+="?version=".concat(E)),e),A=()=>{let e=u.get("version");f(""),e&&f(e)};return(0,s.useEffect)(()=>{A(),d()},[c,u]),(0,i.jsx)(l.Provider,{value:{goToRoute:e=>{o();let t=C(e);if(c===t)return d();n.push(t)},version:E},children:t})}},82348:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var i=n(92449);function r(){let e="auth",{httpGet:t,httpPost:n,httpDelete:r}=(0,i.Z)();return{login:t=>n(e+"/login",!1,t),register:t=>n(e+"/register",!1,t),registerUser:t=>n(e+"/registerUser",!0,t),validateCredential:n=>t(e+"/validateCredential?credential=".concat(n),!1),disableUser:t=>r(e+"/disableUser?id=".concat(t),!0),enableUser:t=>n(e+"/enableUser",!1,t),sendRecoveryEmail:n=>t(e+"/recoverPassword?mail="+n,!1),validateToken:()=>t(e+"/validateToken",!0)}}},19458:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var i=n(86006);function r(e,t){let n=(0,i.useRef)(!1);(0,i.useEffect)(()=>{n.current?e():n.current=!0},t)}},21799:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return I}});var i=n(9268),r=n(70686);class s{}s.ACTIVE_DESC="Activo",s.INACTIVE_DESC="Inactivo",s.ACTIVE_VAL="S",s.INACTIVE_VAL="N";let a={[s.ACTIVE_VAL]:s.ACTIVE_DESC,[s.INACTIVE_VAL]:s.INACTIVE_DESC};var l=n(86006),c=n(35846),u=n.n(c),o=n(3702),d=n(35105),E=n(46003),f=n(67121),C=n(91148),A=n(82348),v=n(61804),S=n(24390);function D(e){let{user:t,visible:n,setVisible:r}=e,{disableUser:s}=(0,A.Z)(),{isValidRes:a}=(0,v.Z)(),{showSuccess:l}=(0,C.V)(),c=(0,i.jsxs)("div",{children:[(0,i.jsx)(o.z,{label:"No",icon:"pi pi-times",onClick:()=>r(void 0),className:"p-button-text"}),(0,i.jsx)(o.z,{label:"Yes",icon:"pi pi-check",onClick:()=>u(),autoFocus:!0})]}),u=()=>{s(t.id).then(e=>{a(e)&&(l(f.V.MESSAGE_SUCCESS,f.V.MESSAGE_SUCCESS_DISABLED),r(void 0))})};return(0,i.jsx)(S.V,{header:"Header",footer:c,visible:n,style:{width:"50vw"},onHide:()=>r(void 0),children:(0,i.jsxs)("p",{className:"m-0",children:["Deseas eliminar a: ",null==t?void 0:t.name]})})}var _=n(59808),L=n(52845),N=n(290),h=n(24139),m=n(19458),x=n(97340);function I(){let{goToRoute:e}=(0,h.QR)(),[t,n]=(0,l.useState)([]),{getCredentials:s}=(0,x.Z)(),c={required:{company:{id:s().company}},values:[{field:"active",label:"Estado",value:""},{field:"name",label:"Nombre",value:""},{field:"role",label:"Rol",value:""}]},{user:f,setUser:C}=(0,l.useContext)(d.x),{reloadData:A,setReloadData:v}=(0,N.S)(),[S,I]=(0,l.useState)(),[T,p]=(0,l.useState)(!1),V=[{field:"name",header:"Nombre"},{field:"role",header:"Rol",values:E.C},{field:"active",header:"Estado",values:a},{field:"CRUDupdate",header:"Actualizar",action:t=>{e("/pages/main/user/mainteance"),C(t)}},{field:"CRUDdelete",header:"Eliminar",action:e=>{I(e)}}];return(0,m.Z)(()=>{T||v(!0)},[T]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"flex justify-content-center align-items-center",style:{minHeight:"100vh",overflowY:"auto"},children:(0,i.jsxs)("div",{className:"grid",style:{width:"90%"},children:[(0,i.jsx)(L.Z,{title:"Usuarios"}),(0,i.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,i.jsx)(u(),{href:"/pages/main/user/mainteance",children:(0,i.jsx)(o.z,{onClick:()=>C(void 0),label:"Nuevo",icon:"pi pi-user-plus"})})}),(0,i.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,i.jsx)(r.Z,{baseFilter:c,columns:V,endpoint:_.A.USER})})]})}),(0,i.jsx)(D,{user:S,visible:void 0!==S,setVisible:I})]})}},35105:function(e,t,n){"use strict";n.d(t,{x:function(){return r}});var i=n(86006);let r=(0,i.createContext)({})}},function(e){e.O(0,[87,546,123,313,856,780,487,831,253,769,744],function(){return e(e.s=23445)}),_N_E=e.O()}]);