(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[714],{89920:function(e,t,n){Promise.resolve().then(n.bind(n,59403))},52845:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(9268);function a(e){let{title:t}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,i.jsx)("h2",{style:{fontSize:"50px",color:"#9e6a90",fontStyle:"italic",marginTop:"1px"},children:t})})})}},59808:function(e,t,n){"use strict";n.d(t,{A:function(){return i}});class i{}i.INVENTORY="inventory",i.PRODUCT="product",i.USER="user",i.SUPPLIER="supplier",i.SPENT="spent",i.ATTRIBUTES="atributes",i.SALE="sale",i.BUY="buy",i.PATTERN="pattern",i.KINDOFPRODUCT="kindOfProduct",i.CHARACTERISTIC="characteristic"},35864:function(e,t,n){"use strict";n.d(t,{y:function(){return a}});var i=n(9268);function a(){return{formatDate:e=>{let[t,n,i,a=0,r=0,l=0]=e,o=i.toString().padStart(2,"0"),u=n.toString().padStart(2,"0"),c="".concat(o,"/").concat(u,"/").concat(t),s="".concat(a.toString().padStart(2,"0"),":").concat(r.toString().padStart(2,"0"),":").concat(l.toString().padStart(2,"0"));return 0===a&&0===r&&0===l?c:"".concat(c," - ").concat(s)},formatCurrency:e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e),formatDetail:e=>(0,i.jsx)("ul",{style:{padding:"0",listStyle:"inside"},children:Object.keys(e).map(t=>(0,i.jsxs)("li",{children:[t,": ",e[t]]},"prop-name-"+t))})}}},93030:function(e,t,n){"use strict";n.d(t,{$h:function(){return o},GW:function(){return u}});var i=n(9268),a=n(73855),r=n(86006);let l=(0,r.createContext)({});function o(){return(0,r.useContext)(l)}function u(e){let{children:t}=e,[n,r]=(0,a.W)("product");return(0,i.jsx)(l.Provider,{value:{product:n,setProduct:r},children:t})}},19458:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var i=n(86006);function a(e,t){let n=(0,i.useRef)(!1);(0,i.useEffect)(()=>{n.current?e():n.current=!0},t)}},59403:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N}});var i=n(9268),a=n(86006),r=n(3702),l=n(70686),o=n(80436),u=n(52899),c=n(67121),s=n(85188),d=n(78980),f=n(11993),p=n(39451),v=n(59808),m=n(87823),h=n(97340),y=n(61804),S=n(91148);function x(e){let{visible:t,setVisible:n}=e,{createAll:x}=(0,m.Z)(v.A.SALE),[b,j]=(0,a.useState)([]),[C,E]=(0,a.useState)(!1),{getCredentials:V}=(0,h.Z)(),{isValidRes:g}=(0,y.Z)(),{showSuccess:N}=(0,S.V)(),{requiered:P,maxLenght:U,minLenght:I}=(0,d.Z)(),[R,T]=(0,a.useState)([{field:"inventory",value:"",description:"Inventario",colSize:6,type:u.h.INPUTHELPER,validators:[P,U(200),I(3)],invalid:!1,message:!0,columns:[{field:"name",header:"Nombre"},{field:"description",header:"Descripcion"},{field:"category",header:"Categoria"}],icon:"pi-user",service:v.A.INVENTORY,filter:{values:[{field:"category",label:"Categor\xeda",value:""},{field:"description",label:"Descripci\xf3n",value:""},{field:"name",label:"Nombre",value:""}],required:{company:{id:V().company}}},fieldDependency:[{field:"product",value:"id",toInput:!0,enable:!0}]},{field:"product",value:"",description:"Producto",colSize:6,type:u.h.INPUTHELPER,validators:[P,U(200),I(3)],invalid:!1,message:!0,columns:[{field:"name",header:"Nombre"},{field:"description",header:"Descripcion"}],icon:"pi-user",service:v.A.PRODUCT,disabled:!0,fieldDependency:[{field:"unitaryValue",value:"unitaryValue",toInput:!1,enable:!1}],filter:{required:{supplier:{}},values:[]}},{field:"unitaryValue",value:"",description:"Valor unitario",colSize:6,type:u.h.NUMBER,validators:[P,U(200),I(3)],invalid:!1,message:!0,icon:"pi-dollar",disabled:!0},{field:"amount",value:"",description:"Cantidad",colSize:6,type:u.h.NUMBER,validators:[P,U(7),I(1)],invalid:!1,message:!0,icon:"pi-tags"}]),[A,D,Z,z]=(0,s.p)(R),{sale:F,setSale:k}=(0,a.useContext)(o.z),[O,_]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{void 0===F||O||Z(F)},[O]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(f.Z,{title:"Tabla de ventas",visible:t,setVisible:n,children:[(0,i.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,i.jsx)(r.z,{label:"Agregar",icon:"pi pi-plus",onClick:()=>E(!0)})}),(0,i.jsx)(l.Z,{useFilter:!1,showRepotGenerator:!1,columns:[{field:"nameInventory",header:"Inventario"},{field:"nameProduct",header:"Producto"},{field:"amount",header:"Cantidad"},{field:"unitaryValue",header:"Valor unitario"}],staticValues:b}),(0,i.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,i.jsx)(r.z,{label:"Cargar ventas",icon:"pi pi-check",onClick:()=>{let e=b.map(e=>(delete e.inventory,delete e.nameInventory,delete e.nameProduct,e.product={id:e.product.id},e.user={id:V().user},e));x(!0,e).then(e=>{g(e)&&(N(c.V.MESSAGE_SUCCESS,c.V.MESSAGE_CREATE_SUCCESS),n(!1),_(!1),k(void 0))})}})})]}),(0,i.jsx)(f.Z,{title:"Nueva Venta",visible:C,setVisible:E,children:(0,i.jsx)(p.Z,{form:D,setValue:Z,submit:e=>{e.preventDefault();let[t,n]=z();if(T([...t]),n){let e={unitaryValue:A.unitaryValue,amount:A.amount,inventory:A.inventory,product:A.product,nameInventory:A.nameinventory,nameProduct:A.nameproduct};j(t=>[...t,e]),Z({unitaryValue:"",amount:"",inventory:"",product:""}),E(!1)}},value:A,buttonLabel:"Agregar"})})]})}var b=n(93030),j=n(290),C=n(52845),E=n(35864),V=n(19458),g=n(45770);function N(){let{product:e}=(0,b.$h)(),[t,n]=(0,a.useState)(!1),{setReloadData:u}=(0,j.S)(),{getCredentials:c}=(0,h.Z)(),{getValue:s}=(0,g.Z)(),{formatDate:d,formatCurrency:f}=(0,E.y)(),p=s("role"),m={values:[{field:"unitaryValue",label:"Valor Unitario",value:0},{field:"amount",label:"Cantidad",value:0},{field:"initialDate",label:"Fecha Inicial",value:null},{field:"finalDate",label:"Fecha Final",value:null}],required:{user:{id:"M"===p||"C"===p?void 0:c().user}}},{setSale:y}=(0,a.useContext)(o.z),S=[{field:"saleDate",header:"Fecha de venta",format:d},{field:"product",header:"Producto"},{field:"unitaryValue",header:"Valor unitario",format:f},{field:"amount",header:"Cantidad"},{field:"totalValue",header:"Valor total",format:f},..."M"===p||"C"===p?[{field:"nameUser",header:"Usuario"}]:[]];return(0,V.Z)(()=>{t||u(!0)},[t]),(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("div",{className:"flex justify-content-center align-items-center",style:{minHeight:"100vh",overflowY:"auto"},children:[(0,i.jsxs)("div",{className:"grid",style:{width:"90%"},children:[(0,i.jsx)(C.Z,{title:"Ventas"}),(0,i.jsx)("div",{className:"col-12 flex justify-content-start",children:(0,i.jsx)(r.z,{onClick:()=>{n(!0),y(void 0)},label:"Nuevo",icon:"pi pi-plus"})}),(0,i.jsx)("div",{className:"col-12 flex justify-content-center",children:(0,i.jsx)(l.Z,{columns:S,baseFilter:m,endpoint:v.A.SALE,customMap:e=>{let t=e.user.name,n=e.product.name,i=e.unitaryValue*e.amount;return{...e,product:n,totalValue:i,nameUser:t}}})})]}),t&&(0,i.jsx)(x,{visible:t,setVisible:n})]})})}},80436:function(e,t,n){"use strict";n.d(t,{z:function(){return a}});var i=n(86006);let a=(0,i.createContext)({})}},function(e){e.O(0,[87,546,123,313,856,780,831,253,769,744],function(){return e(e.s=89920)}),_N_E=e.O()}]);