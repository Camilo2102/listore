(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[898],{5658:function(e,n,t){Promise.resolve().then(t.bind(t,76766))},3275:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var i=t(9268),r=t(70686),s=t(56008),o=t(59808),a=t(97340);function l(e){let{columns:n,handleSelection:t,showReport:l=!0}=e;(0,s.useRouter)();let{getCredentials:c}=(0,a.Z)(),u={values:[{field:"category",label:"Categor\xeda",value:""},{field:"description",label:"Descripci\xf3n",value:""},{field:"name",label:"Nombre",value:""}],required:{company:{id:c().company}}};return(0,i.jsx)(r.Z,{baseFilter:u,columns:n,onRowSelect:t,endpoint:o.A.INVENTORY,showRepotGenerator:l})}},44920:function(e,n,t){"use strict";t.d(n,{Z:function(){return x}});var i=t(9268),r=t(86006),s=t(3702),o=t(11993),a=t(48555),l=t(87823),c=t(59808),u=t(3275),d=t(24139),f=t(97340);function p(e){let{inventorySelected:n,visible:t,setVisible:s}=e,{goToRoute:p}=(0,d.QR)(),{getAllByFilter:v}=(0,l.Z)(c.A.INVENTORY),[m,x]=(0,r.useState)([]),{getCredentials:b}=(0,f.Z)(),[h,C]=(0,r.useState)({category:"",company:{id:b().company},description:"",name:""}),{mainInventory:S,setMainInventory:j}=(0,a.H)();return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(o.Z,{title:"Selecione un inventario",visible:t,setVisible:s,children:(0,i.jsx)(u.Z,{columns:[{field:"name",header:"Nombre"},{field:"description",header:"Descripci\xf3n"},{field:"category",header:"Categoria"}],handleSelection:e=>{j(e.data),s(!1),p("/pages/main/inventory/product")},showReport:!1})})})}t(94699);var v=t(20379),m=t(45770);function x(){let{getValue:e}=(0,m.Z)(),{goToRoute:n,version:t}=(0,d.QR)(),[o,a]=(0,r.useState)(!1),[l,c]=(0,r.useState)(!0),[u,f]=(0,r.useState)(0),{setAuthorized:x}=(0,v.E)(),b=e("role"),h=()=>{f(window.innerWidth),window.innerWidth<=767?c(!1):c(!0)};(0,r.useEffect)(()=>(h(),window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h)}),[]);let C=[{icon:"pi pi-user",label:"Usuarios",roles:["C","M"],command:()=>{n("/pages/main/user")}},{icon:"pi pi-th-large",label:"Inventarios",roles:["C","M"],command:()=>{n("/pages/main/inventory")}},{icon:"pi pi-inbox",label:"Productos",roles:["C","M"],command:()=>{a(!0)}},{icon:"pi pi-users",label:"Proveedores",roles:["C","M"],command:()=>{n("/pages/main/inventory/supplier")}},{icon:"pi pi-shopping-cart",label:"Compras",roles:["C","M","D"],command:()=>{n("/pages/main/buy")}},{icon:"pi pi-dollar",label:"Ventas",roles:["C","M","D","P","G"],command:()=>{n("/pages/main/sale")}},{icon:"pi pi-money-bill",label:"Gastos",roles:["C","M","D","P"],command:()=>{n("/pages/main/spent")}}].filter(e=>null!==b&&e.roles.includes(b)),S=()=>{c(e=>!e)};return(0,i.jsxs)("div",{children:[""!==t&&(0,i.jsxs)("div",{className:"navigation",children:[(0,i.jsx)(s.z,{className:"back",icon:"pi pi-arrow-left",onClick:()=>{window.history.back()}}),(0,i.jsx)(s.z,{className:"forward",icon:"pi pi-arrow-right",onClick:()=>{window.history.forward()}})]}),(0,i.jsxs)("div",{className:"navbar-container ".concat(l?"visible":""),children:[(0,i.jsx)("div",{className:"navbar-icons-container",onClick:()=>u<=767&&S(),children:C.map((e,n)=>(0,i.jsx)(s.z,{icon:e.icon,title:e.label,className:"navbar-icon",onClick:e.command,label:u<=767?e.label:""},n))}),(0,i.jsx)("div",{className:"navbar-power-off-container",children:(0,i.jsx)(s.z,{icon:"pi pi-power-off",className:"navbar-icon2",title:"Cerrar sesi\xf3n",label:u<=767?"Salir":"",onClick:()=>{x(!1)}})}),o&&(0,i.jsx)(p,{visible:o,setVisible:a})]}),u<=767&&(0,i.jsx)(s.z,{icon:"pi pi-bars",className:"navbar-toggle-btn ".concat(l?"visible":""),onClick:S}),l&&(0,i.jsx)(p,{visible:o,setVisible:a})]})}},52845:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var i=t(9268);function r(e){let{title:n}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,i.jsx)("h2",{style:{fontSize:"50px",color:"#9e6a90",fontStyle:"italic",marginTop:"1px"},children:n})})})}},59808:function(e,n,t){"use strict";t.d(n,{A:function(){return i}});class i{}i.INVENTORY="inventory",i.PRODUCT="product",i.USER="user",i.SUPPLIER="supplier",i.SPENT="spent",i.ATTRIBUTES="atributes",i.SALE="sale",i.BUY="buy",i.PATTERN="pattern",i.KINDOFPRODUCT="kindOfProduct",i.CHARACTERISTIC="characteristic"},34849:function(e,n,t){"use strict";t.d(n,{P:function(){return a},r:function(){return o}});var i=t(9268),r=t(86006);let s=(0,r.createContext)({});function o(){return(0,r.useContext)(s)}function a(e){let{children:n}=e,[t,o]=(0,r.useState)(!1);return(0,i.jsx)(s.Provider,{value:{isLoading:t,startLoading:()=>o(!0),stopLoading:()=>o(!1)},children:n})}},48555:function(e,n,t){"use strict";t.d(n,{H:function(){return a},l:function(){return l}});var i=t(9268),r=t(73855),s=t(86006);let o=(0,s.createContext)({});function a(){return(0,s.useContext)(o)}function l(e){let{children:n}=e,[t,s]=(0,r.W)("inventory");return(0,i.jsx)(o.Provider,{value:{mainInventory:t,setMainInventory:s},children:n})}},24139:function(e,n,t){"use strict";t.d(n,{KQ:function(){return c},QR:function(){return l}});var i=t(9268),r=t(56008),s=t(86006),o=t(34849);let a=(0,s.createContext)({});function l(){return(0,s.useContext)(a)}let c=e=>{let{children:n}=e,t=(0,r.useRouter)(),l=(0,r.usePathname)(),c=(0,r.useSearchParams)(),{startLoading:u,stopLoading:d}=(0,o.r)(),[f,p]=(0,s.useState)(""),v=e=>(""!==f&&(e+="?version=".concat(f)),e),m=()=>{let e=c.get("version");p(""),e&&p(e)};return(0,s.useEffect)(()=>{m(),d()},[l,c]),(0,i.jsx)(a.Provider,{value:{goToRoute:e=>{u();let n=v(e);if(l===n)return d();t.push(n)},version:f},children:n})}},19458:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var i=t(86006);function r(e,n){let t=(0,i.useRef)(!1);(0,i.useEffect)(()=>{t.current?e():t.current=!0},n)}},15507:function(e,n,t){"use strict";t.d(n,{Z:function(){return i}});class i{}},64301:function(e,n,t){"use strict";t.d(n,{$:function(){return r}});var i=t(86006);let r=(0,i.createContext)({})},76766:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return R}});var i=t(9268),r=t(86006),s=t(44920),o=t(3702),a=t(59808),l=t(290),c=t(52845),u=t(70686),d=t(24139),f=t(64301),p=t(3933),v=t(52899),m=t(67121),x=t(85188),b=t(78980),h=t(11993),C=t(39451),S=t(87823),j=t(15507);class E extends j.Z{}var N=t(61804),g=t(91148);function w(e){let{visible:n,setVisible:t}=e,{create:s}=(0,S.Z)(a.A.ATTRIBUTES),{isValidRes:o}=(0,N.Z)(),{showSuccess:l}=(0,g.V)(),{requiered:c,maxLenght:u,minLenght:d}=(0,b.Z)(),[j,w]=(0,r.useState)([{field:"name",value:"",description:"Nombre",colSize:12,type:v.h.INPUT,validators:[c,u(60),d(3)],invalid:!1,message:!0,icon:"pi-box"}]),[y,R,T,Z]=(0,x.p)(j),{pattern:P,setPattern:A}=(0,r.useContext)(p.m),{attribute:k,setAttribute:U}=(0,r.useContext)(f.$),[V,I]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{void 0===k||V||T(k)},[V]),(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(h.Z,{title:"Nuevo Atributo",visible:n,setVisible:t,children:(0,i.jsx)(C.Z,{form:R,setValue:T,submit:e=>{e.preventDefault();let[n,i]=Z();w([...n]),i&&(y.pattern=new E,y.pattern.id=P.id,s(!0,y).then(e=>{o(e)&&(l(m.V.MESSAGE_SUCCESS,k?m.V.MESSAGE_CREATE_SUCCESS:m.V.MESSAGE_UPDATE_SUCCESS),t(!1),I(!1),U(void 0))}))},value:y,buttonLabel:"Crear"})})})}var y=t(19458);function R(){let{goToRoute:e}=(0,d.QR)(),{pattern:n,setPattern:t}=(0,r.useContext)(p.m),{reloadData:v,setReloadData:m}=(0,l.S)(),[x,b]=(0,r.useState)(!1),h={required:{pattern:{id:null==n?void 0:n.id}},values:[{field:"name",label:"Nombre",value:""}]},{attribute:C,setAttribute:S}=(0,r.useContext)(f.$);return(0,y.Z)(()=>{x||m(!0)},[x]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Z,{}),(0,i.jsxs)("div",{className:"flex justify-content-center align-items-center",style:{minHeight:"100vh",overflowY:"auto"},children:[(0,i.jsxs)("div",{className:"grid",style:{width:"90%"},children:[(0,i.jsx)(c.Z,{title:"Atributos"}),(0,i.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,i.jsx)(o.z,{onClick:()=>{b(!0),S(void 0)},label:"Nuevo",icon:"pi pi-inbox"})}),(0,i.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,i.jsx)(u.Z,{columns:[{field:"name",header:"Nombre"}],baseFilter:h,endpoint:a.A.ATTRIBUTES,showRepotGenerator:!1})})]}),x&&(0,i.jsx)(w,{visible:x,setVisible:b})]})]})}},3933:function(e,n,t){"use strict";t.d(n,{m:function(){return r}});var i=t(86006);let r=(0,i.createContext)({})},94699:function(){},56008:function(e,n,t){e.exports=t(30794)}},function(e){e.O(0,[87,546,123,313,856,780,831,253,769,744],function(){return e(e.s=5658)}),_N_E=e.O()}]);