(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[10],{77305:function(e,t,i){Promise.resolve().then(i.bind(i,36335))},3275:function(e,t,i){"use strict";i.d(t,{Z:function(){return o}});var n=i(9268),r=i(70686),s=i(56008),a=i(59808),c=i(97340);function o(e){let{columns:t,handleSelection:i,showReport:o=!0}=e;(0,s.useRouter)();let{getCredentials:l}=(0,c.Z)(),u={values:[{field:"category",label:"Categor\xeda",value:""},{field:"description",label:"Descripci\xf3n",value:""},{field:"name",label:"Nombre",value:""}],required:{company:{id:l().company}}};return(0,n.jsx)(r.Z,{baseFilter:u,columns:t,onRowSelect:i,endpoint:a.A.INVENTORY,showRepotGenerator:o})}},44920:function(e,t,i){"use strict";i.d(t,{Z:function(){return x}});var n=i(9268),r=i(86006),s=i(3702),a=i(11993),c=i(48555),o=i(87823),l=i(59808),u=i(3275),d=i(24139),p=i(97340);function f(e){let{inventorySelected:t,visible:i,setVisible:s}=e,{goToRoute:f}=(0,d.QR)(),{getAllByFilter:v}=(0,o.Z)(l.A.INVENTORY),[m,x]=(0,r.useState)([]),{getCredentials:b}=(0,p.Z)(),[h,S]=(0,r.useState)({category:"",company:{id:b().company},description:"",name:""}),{mainInventory:j,setMainInventory:g}=(0,c.H)();return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(a.Z,{title:"Selecione un inventario",visible:i,setVisible:s,children:(0,n.jsx)(u.Z,{columns:[{field:"name",header:"Nombre"},{field:"description",header:"Descripci\xf3n"},{field:"category",header:"Categoria"}],handleSelection:e=>{g(e.data),s(!1),f("/pages/main/inventory/product")},showReport:!1})})})}i(94699);var v=i(20379),m=i(45770);function x(){let{getValue:e}=(0,m.Z)(),{goToRoute:t,version:i}=(0,d.QR)(),[a,c]=(0,r.useState)(!1),[o,l]=(0,r.useState)(!0),[u,p]=(0,r.useState)(0),{setAuthorized:x}=(0,v.E)(),b=e("role"),h=()=>{p(window.innerWidth),window.innerWidth<=767?l(!1):l(!0)};(0,r.useEffect)(()=>(h(),window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h)}),[]);let S=[{icon:"pi pi-user",label:"Usuarios",roles:["C","M"],command:()=>{t("/pages/main/user")}},{icon:"pi pi-th-large",label:"Inventarios",roles:["C","M"],command:()=>{t("/pages/main/inventory")}},{icon:"pi pi-inbox",label:"Productos",roles:["C","M"],command:()=>{c(!0)}},{icon:"pi pi-users",label:"Proveedores",roles:["C","M"],command:()=>{t("/pages/main/inventory/supplier")}},{icon:"pi pi-shopping-cart",label:"Compras",roles:["C","M","D"],command:()=>{t("/pages/main/buy")}},{icon:"pi pi-dollar",label:"Ventas",roles:["C","M","D","P","G"],command:()=>{t("/pages/main/sale")}},{icon:"pi pi-money-bill",label:"Gastos",roles:["C","M","D","P"],command:()=>{t("/pages/main/spent")}}].filter(e=>null!==b&&e.roles.includes(b)),j=()=>{l(e=>!e)};return(0,n.jsxs)("div",{children:[""!==i&&(0,n.jsxs)("div",{className:"navigation",children:[(0,n.jsx)(s.z,{className:"back",icon:"pi pi-arrow-left",onClick:()=>{window.history.back()}}),(0,n.jsx)(s.z,{className:"forward",icon:"pi pi-arrow-right",onClick:()=>{window.history.forward()}})]}),(0,n.jsxs)("div",{className:"navbar-container ".concat(o?"visible":""),children:[(0,n.jsx)("div",{className:"navbar-icons-container",onClick:()=>u<=767&&j(),children:S.map((e,t)=>(0,n.jsx)(s.z,{icon:e.icon,title:e.label,className:"navbar-icon",onClick:e.command,label:u<=767?e.label:""},t))}),(0,n.jsx)("div",{className:"navbar-power-off-container",children:(0,n.jsx)(s.z,{icon:"pi pi-power-off",className:"navbar-icon2",title:"Cerrar sesi\xf3n",label:u<=767?"Salir":"",onClick:()=>{x(!1)}})}),a&&(0,n.jsx)(f,{visible:a,setVisible:c})]}),u<=767&&(0,n.jsx)(s.z,{icon:"pi pi-bars",className:"navbar-toggle-btn ".concat(o?"visible":""),onClick:j}),o&&(0,n.jsx)(f,{visible:a,setVisible:c})]})}},52845:function(e,t,i){"use strict";i.d(t,{Z:function(){return r}});var n=i(9268);function r(e){let{title:t}=e;return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,n.jsx)("h2",{style:{fontSize:"50px",color:"#9e6a90",fontStyle:"italic",marginTop:"1px"},children:t})})})}},59808:function(e,t,i){"use strict";i.d(t,{A:function(){return n}});class n{}n.INVENTORY="inventory",n.PRODUCT="product",n.USER="user",n.SUPPLIER="supplier",n.SPENT="spent",n.ATTRIBUTES="atributes",n.SALE="sale",n.BUY="buy",n.PATTERN="pattern",n.KINDOFPRODUCT="kindOfProduct",n.CHARACTERISTIC="characteristic"},35864:function(e,t,i){"use strict";i.d(t,{y:function(){return r}});var n=i(9268);function r(){return{formatDate:e=>{let[t,i,n,r=0,s=0,a=0]=e,c=n.toString().padStart(2,"0"),o=i.toString().padStart(2,"0"),l="".concat(c,"/").concat(o,"/").concat(t),u="".concat(r.toString().padStart(2,"0"),":").concat(s.toString().padStart(2,"0"),":").concat(a.toString().padStart(2,"0"));return 0===r&&0===s&&0===a?l:"".concat(l," - ").concat(u)},formatCurrency:e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e),formatDetail:e=>(0,n.jsx)("ul",{style:{padding:"0",listStyle:"inside"},children:Object.keys(e).map(t=>(0,n.jsxs)("li",{children:[t,": ",e[t]]},"prop-name-"+t))})}}},34849:function(e,t,i){"use strict";i.d(t,{P:function(){return c},r:function(){return a}});var n=i(9268),r=i(86006);let s=(0,r.createContext)({});function a(){return(0,r.useContext)(s)}function c(e){let{children:t}=e,[i,a]=(0,r.useState)(!1);return(0,n.jsx)(s.Provider,{value:{isLoading:i,startLoading:()=>a(!0),stopLoading:()=>a(!1)},children:t})}},48555:function(e,t,i){"use strict";i.d(t,{H:function(){return c},l:function(){return o}});var n=i(9268),r=i(73855),s=i(86006);let a=(0,s.createContext)({});function c(){return(0,s.useContext)(a)}function o(e){let{children:t}=e,[i,s]=(0,r.W)("inventory");return(0,n.jsx)(a.Provider,{value:{mainInventory:i,setMainInventory:s},children:t})}},24139:function(e,t,i){"use strict";i.d(t,{KQ:function(){return l},QR:function(){return o}});var n=i(9268),r=i(56008),s=i(86006),a=i(34849);let c=(0,s.createContext)({});function o(){return(0,s.useContext)(c)}let l=e=>{let{children:t}=e,i=(0,r.useRouter)(),o=(0,r.usePathname)(),l=(0,r.useSearchParams)(),{startLoading:u,stopLoading:d}=(0,a.r)(),[p,f]=(0,s.useState)(""),v=e=>(""!==p&&(e+="?version=".concat(p)),e),m=()=>{let e=l.get("version");f(""),e&&f(e)};return(0,s.useEffect)(()=>{m(),d()},[o,l]),(0,n.jsx)(c.Provider,{value:{goToRoute:e=>{u();let t=v(e);if(o===t)return d();i.push(t)},version:p},children:t})}},19458:function(e,t,i){"use strict";i.d(t,{Z:function(){return r}});var n=i(86006);function r(e,t){let i=(0,n.useRef)(!1);(0,n.useEffect)(()=>{i.current?e():i.current=!0},t)}},36335:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return E}});var n=i(9268),r=i(86006),s=i(44920),a=i(3702),c=i(70686),o=i(2357),l=i(52899),u=i(67121),d=i(85188),p=i(78980),f=i(11993),v=i(39451),m=i(87823),x=i(59808),b=i(97340),h=i(61804),S=i(91148);function j(e){let{visible:t,setVisible:i}=e,{createAll:s}=(0,m.Z)(x.A.SPENT),[j,g]=(0,r.useState)([]),[C,y]=(0,r.useState)(!1),{getCredentials:N}=(0,b.Z)(),{isValidRes:E}=(0,h.Z)(),{showSuccess:w}=(0,S.V)(),{requiered:R,maxLenght:P,minLenght:Z}=(0,p.Z)(),[D,T]=(0,r.useState)([{field:"price",value:"",description:"Precio",colSize:12,type:l.h.NUMBER,validators:[R,P(200),Z(3)],invalid:!1,message:!0,icon:"pi-dollar"},{field:"description",value:"",description:"Descripci\xf3n",colSize:12,type:l.h.INPUT,validators:[R,P(120),Z(3)],invalid:!1,message:!0,icon:"pi-pencil"}]),[k,A,V,z]=(0,d.p)(D),{spent:U,setSpent:I}=(0,r.useContext)(o.R),[M,F]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{void 0===U||M||V(U)},[M]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(f.Z,{title:"Tabla de gastos",visible:t,setVisible:i,children:[(0,n.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,n.jsx)(a.z,{label:"Agregar",icon:"pi pi-plus",onClick:()=>y(!0)})}),(0,n.jsx)(c.Z,{useFilter:!1,showRepotGenerator:!1,columns:[{field:"price",header:"Precio"},{field:"description",header:"Descripci\xf3n"}],staticValues:j}),(0,n.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,n.jsx)(a.z,{label:"Cargar gastos",icon:"pi pi-check",onClick:()=>{let e=j.map(e=>(e.user={id:N().user},e));s(!0,e).then(e=>{E(e)&&(w(u.V.MESSAGE_SUCCESS,u.V.MESSAGE_CREATE_SUCCESS),i(!1),F(!1),I(void 0))})}})})]}),(0,n.jsx)(f.Z,{title:"Nuevo Gasto",visible:C,setVisible:y,children:(0,n.jsx)(v.Z,{form:A,setValue:V,submit:e=>{e.preventDefault();let[t,i]=z();if(T([...t]),i){let e={price:k.price,description:k.description};g(t=>[...t,e]),V({price:"",description:""}),y(!1)}},value:k,buttonLabel:"Agregar"})})]})}var g=i(290),C=i(52845),y=i(35864),N=i(19458);function E(){let[e,t]=(0,r.useState)(!1),{getCredentials:i}=(0,b.Z)(),{formatDate:l}=(0,y.y)(),{setReloadData:u}=(0,g.S)(),d={required:{user:{id:i().user},spentDate:new Date},values:[{field:"price",label:"Precio",value:0},{field:"description",label:"Descripcion",value:""}]},{setSpent:p}=(0,r.useContext)(o.R);return(0,N.Z)(()=>{e||u(!0)},[e]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.Z,{}),(0,n.jsxs)("div",{className:"flex justify-content-center align-items-center",style:{minHeight:"100vh",overflowY:"auto"},children:[(0,n.jsxs)("div",{className:"grid",style:{width:"90%"},children:[(0,n.jsx)(C.Z,{title:"Gastos"}),(0,n.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,n.jsx)(a.z,{onClick:()=>{t(!0),p(void 0)},label:"Nuevo",icon:"pi pi-plus"})}),(0,n.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,n.jsx)(c.Z,{columns:[{field:"spentDate",header:"Fecha de gasto"},{field:"price",header:"Precio"},{field:"description",header:"Descripci\xf3n"}],baseFilter:d,endpoint:x.A.SPENT,customMap:e=>({...e,spentDate:l(e.spentDate)})})})]}),e&&(0,n.jsx)(j,{visible:e,setVisible:t})]})]})}},2357:function(e,t,i){"use strict";i.d(t,{R:function(){return r}});var n=i(86006);let r=(0,n.createContext)({})},94699:function(){},56008:function(e,t,i){e.exports=i(30794)}},function(e){e.O(0,[87,546,123,313,856,780,831,253,769,744],function(){return e(e.s=77305)}),_N_E=e.O()}]);