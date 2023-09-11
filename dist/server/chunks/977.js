exports.id = 977;
exports.ids = [977];
exports.modules = {

/***/ 76329:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 6210))

/***/ }),

/***/ 99406:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ InventoryTable)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tableComponents_tableGeneral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69011);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_constants_endpointsConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62353);
/* harmony import */ var _app_hooks_utils_authUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31015);





function InventoryTable({ columns, handleSelection, showReport = true }) {
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { getCredentials } = (0,_app_hooks_utils_authUtils__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const inventoryFilter = {
        values: [
            {
                field: "category",
                label: "Categor\xeda",
                value: ""
            },
            {
                field: "description",
                label: "Descripci\xf3n",
                value: ""
            },
            {
                field: "name",
                label: "Nombre",
                value: ""
            }
        ],
        required: {
            company: {
                id: getCredentials().company
            }
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tableComponents_tableGeneral__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        baseFilter: inventoryFilter,
        columns: columns,
        onRowSelect: handleSelection,
        endpoint: _app_constants_endpointsConstants__WEBPACK_IMPORTED_MODULE_3__/* .Endpoints */ .A.INVENTORY,
        showRepotGenerator: showReport
    });
}


/***/ }),

/***/ 90399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ NavBar)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/primereact/button/button.cjs.js
var button_cjs = __webpack_require__(18176);
// EXTERNAL MODULE: ./src/app/components/popUp.tsx
var popUp = __webpack_require__(66131);
// EXTERNAL MODULE: ./src/app/context/mainContext.tsx
var mainContext = __webpack_require__(98608);
// EXTERNAL MODULE: ./src/app/hooks/services/useCRUDService.ts + 2 modules
var useCRUDService = __webpack_require__(80479);
// EXTERNAL MODULE: ./src/app/constants/endpointsConstants.ts
var endpointsConstants = __webpack_require__(62353);
// EXTERNAL MODULE: ./src/app/components/inventoryComponents/intentoryTable.tsx
var intentoryTable = __webpack_require__(99406);
// EXTERNAL MODULE: ./src/app/context/navigationContext.tsx
var navigationContext = __webpack_require__(81506);
// EXTERNAL MODULE: ./src/app/hooks/utils/authUtils.ts
var authUtils = __webpack_require__(31015);
;// CONCATENATED MODULE: ./src/app/components/inventoryComponents/selectInventory.tsx









function SelectInventory({ inventorySelected, visible, setVisible }) {
    const { goToRoute } = (0,navigationContext/* useNavigationContext */.QR)();
    const { getAllByFilter } = (0,useCRUDService/* default */.Z)(endpointsConstants/* Endpoints */.A.INVENTORY);
    const [inventorys, setInventorys] = (0,react_.useState)([]);
    const { getCredentials } = (0,authUtils/* default */.Z)();
    const [inventoryFilter, setInventoryFitler] = (0,react_.useState)({
        category: "",
        company: {
            id: getCredentials().company
        },
        description: "",
        name: ""
    });
    const { mainInventory, setMainInventory } = (0,mainContext/* useMainContext */.H)();
    const columns = [
        {
            field: "name",
            header: "Nombre"
        },
        {
            field: "description",
            header: "Descripci\xf3n"
        },
        {
            field: "category",
            header: "Categoria"
        }
    ];
    const handleSelection = (inventory)=>{
        setMainInventory(inventory.data);
        setVisible(false);
        goToRoute("/pages/main/inventory/product");
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(popUp/* default */.Z, {
            title: "Selecione un inventario",
            visible: visible,
            setVisible: setVisible,
            children: /*#__PURE__*/ jsx_runtime_.jsx(intentoryTable/* default */.Z, {
                columns: columns,
                handleSelection: handleSelection,
                showReport: false
            })
        })
    });
}

// EXTERNAL MODULE: ./src/app/components/styleNavBar.css
var styleNavBar = __webpack_require__(41901);
// EXTERNAL MODULE: ./src/app/context/authContext.tsx
var authContext = __webpack_require__(14016);
// EXTERNAL MODULE: ./src/app/hooks/services/storageService.ts
var storageService = __webpack_require__(19511);
;// CONCATENATED MODULE: ./src/app/components/navBar.tsx








function NavBar() {
    const { getValue } = (0,storageService/* default */.Z)();
    const { goToRoute, version } = (0,navigationContext/* useNavigationContext */.QR)();
    const [visibleSelectInventory, setVisibleSelectInventory] = (0,react_.useState)(false);
    const [navBarVisible, setNavBarVisible] = (0,react_.useState)(true);
    const [screenWidth, setScreenWidth] = (0,react_.useState)(0);
    const { setAuthorized } = (0,authContext/* useAuthContext */.E)();
    const role = getValue("role");
    const handleResize = ()=>{
        setScreenWidth(window.innerWidth);
        if (window.innerWidth <= 767) {
            setNavBarVisible(false);
        } else {
            setNavBarVisible(true);
        }
    };
    (0,react_.useEffect)(()=>{
        // Detectar el ancho de la pantalla y actualizar el estado
        handleResize(); // Llamarlo al principio para establecer el estado inicial
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const items = [
        {
            icon: "pi pi-user",
            label: "Usuarios",
            roles: [
                "C",
                "M"
            ],
            command: ()=>{
                goToRoute("/pages/main/user");
            }
        },
        {
            icon: "pi pi-th-large",
            label: "Inventarios",
            roles: [
                "C",
                "M"
            ],
            command: ()=>{
                goToRoute("/pages/main/inventory");
            }
        },
        {
            icon: "pi pi-inbox",
            label: "Productos",
            roles: [
                "C",
                "M"
            ],
            command: ()=>{
                setVisibleSelectInventory(true);
            }
        },
        {
            icon: "pi pi-users",
            label: "Proveedores",
            roles: [
                "C",
                "M"
            ],
            command: ()=>{
                goToRoute("/pages/main/inventory/supplier");
            }
        },
        {
            icon: "pi pi-shopping-cart",
            label: "Compras",
            roles: [
                "C",
                "M",
                "D"
            ],
            command: ()=>{
                goToRoute("/pages/main/buy");
            }
        },
        {
            icon: "pi pi-dollar",
            label: "Ventas",
            roles: [
                "C",
                "M",
                "D",
                "P",
                "G"
            ],
            command: ()=>{
                goToRoute("/pages/main/sale");
            }
        },
        {
            icon: "pi pi-money-bill",
            label: "Gastos",
            roles: [
                "C",
                "M",
                "D",
                "P"
            ],
            command: ()=>{
                goToRoute("/pages/main/spent");
            }
        }
    ];
    const filteredItems = items.filter((item)=>role !== null && item.roles.includes(role));
    const exit = ()=>{
        setAuthorized(false);
    };
    const toggleNavBarVisibility = ()=>{
        setNavBarVisible((prevVisible)=>!prevVisible);
    };
    // navegacion
    const goBack = ()=>{
        window.history.back();
    };
    const goForward = ()=>{
        window.history.forward();
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            version !== "" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "navigation",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                        className: "back",
                        icon: "pi pi-arrow-left",
                        onClick: goBack
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                        className: "forward",
                        icon: "pi pi-arrow-right",
                        onClick: goForward
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `navbar-container ${navBarVisible ? "visible" : ""}`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "navbar-icons-container",
                        onClick: ()=>screenWidth <= 767 && toggleNavBarVisibility(),
                        children: filteredItems.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                                icon: item.icon,
                                title: item.label,
                                className: "navbar-icon",
                                onClick: item.command,
                                label: screenWidth <= 767 ? item.label : ""
                            }, index))
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "navbar-power-off-container",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                            icon: "pi pi-power-off",
                            className: "navbar-icon2",
                            title: "Cerrar sesi\xf3n",
                            label: screenWidth <= 767 ? "Salir" : "",
                            onClick: exit
                        })
                    }),
                    visibleSelectInventory && /*#__PURE__*/ jsx_runtime_.jsx(SelectInventory, {
                        visible: visibleSelectInventory,
                        setVisible: setVisibleSelectInventory
                    })
                ]
            }),
            screenWidth <= 767 && /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                icon: "pi pi-bars",
                className: `navbar-toggle-btn ${navBarVisible ? "visible" : ""}`,
                onClick: toggleNavBarVisibility
            }),
            navBarVisible && /*#__PURE__*/ jsx_runtime_.jsx(SelectInventory, {
                visible: visibleSelectInventory,
                setVisible: setVisibleSelectInventory
            })
        ]
    });
}


/***/ }),

/***/ 62353:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Endpoints)
/* harmony export */ });
class Endpoints {
    static{
        this.INVENTORY = "inventory";
    }
    static{
        this.PRODUCT = "product";
    }
    static{
        this.USER = "user";
    }
    static{
        this.SUPPLIER = "supplier";
    }
    static{
        this.SPENT = "spent";
    }
    static{
        this.ATTRIBUTES = "atributes";
    }
    static{
        this.SALE = "sale";
    }
    static{
        this.BUY = "buy";
    }
    static{
        this.PATTERN = "pattern";
    }
    static{
        this.KINDOFPRODUCT = "kindOfProduct";
    }
    static{
        this.CHARACTERISTIC = "characteristic";
    }
}


/***/ }),

/***/ 98608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useMainContext),
/* harmony export */   l: () => (/* binding */ MainProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96479);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ useMainContext,MainProvider auto */ 


const mainContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function useMainContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(mainContext);
}
function MainProvider({ children }) {
    const [mainInventory, setMainInventory] = (0,_app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__/* .useHandleContext */ .W)("inventory");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(mainContext.Provider, {
        value: {
            mainInventory,
            setMainInventory
        },
        children: children
    });
}


/***/ }),

/***/ 53116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $h: () => (/* binding */ useProductContext),
/* harmony export */   GW: () => (/* binding */ ProductProvider)
/* harmony export */ });
/* unused harmony export ProductContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96479);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ ProductContext,useProductContext,ProductProvider auto */ 


const ProductContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function useProductContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(ProductContext);
}
function ProductProvider({ children }) {
    const [product, setProduct] = (0,_app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__/* .useHandleContext */ .W)("product");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProductContext.Provider, {
        value: {
            product,
            setProduct
        },
        children: children
    });
}


/***/ }),

/***/ 71615:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $E: () => (/* binding */ useSubProductContext),
/* harmony export */   Mn: () => (/* binding */ SubProductProvider)
/* harmony export */ });
/* unused harmony export SubProductContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96479);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ SubProductContext,useSubProductContext,SubProductProvider auto */ 


const SubProductContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function useSubProductContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(SubProductContext);
}
function SubProductProvider({ children }) {
    const [subProduct, setSubProduct] = (0,_app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__/* .useHandleContext */ .W)("subProduct");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SubProductContext.Provider, {
        value: {
            subProduct: subProduct,
            setSubProduct: setSubProduct
        },
        children: children
    });
}


/***/ }),

/***/ 40529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fs: () => (/* binding */ SupplierProvider),
/* harmony export */   jB: () => (/* binding */ useSupplier)
/* harmony export */ });
/* unused harmony export SupplierContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96479);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const SupplierContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function useSupplier() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(SupplierContext);
}
function SupplierProvider({ children }) {
    const [supplier, setSupplier] = (0,_app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__/* .useHandleContext */ .W)("supplier");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SupplierContext.Provider, {
        value: {
            supplier,
            setSupplier
        },
        children: children
    });
}


/***/ }),

/***/ 67103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ useDidMountEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useDidMountEffect(func, deps) {
    const didMount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (didMount.current) {
            func();
        } else {
            didMount.current = true;
        }
    //eslint-disable-next-line
    }, deps);
}


/***/ }),

/***/ 6210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MainLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/app/components/navBar.tsx + 1 modules
var navBar = __webpack_require__(90399);
// EXTERNAL MODULE: ./src/app/context/mainContext.tsx
var mainContext = __webpack_require__(98608);
// EXTERNAL MODULE: ./src/app/context/supplierContext.tsx
var supplierContext = __webpack_require__(40529);
// EXTERNAL MODULE: ./src/app/context/productContext.tsx
var productContext = __webpack_require__(53116);
// EXTERNAL MODULE: ./src/app/context/subProductContext.tsx
var subProductContext = __webpack_require__(71615);
// EXTERNAL MODULE: ./src/app/context/authContext.tsx
var authContext = __webpack_require__(14016);
// EXTERNAL MODULE: ./src/app/context/navigationContext.tsx
var navigationContext = __webpack_require__(81506);
// EXTERNAL MODULE: ./src/app/hooks/services/useAuthService.ts
var useAuthService = __webpack_require__(68285);
// EXTERNAL MODULE: ./src/app/hooks/utils/resErrorHandler.ts
var resErrorHandler = __webpack_require__(7367);
// EXTERNAL MODULE: ./src/app/hooks/services/storageService.ts
var storageService = __webpack_require__(19511);
// EXTERNAL MODULE: ./src/app/hooks/useDidMountEffect.ts
var useDidMountEffect = __webpack_require__(67103);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
;// CONCATENATED MODULE: ./src/app/hooks/useTokenValidation.ts







function useTokenValidator() {
    const { goToRoute } = (0,navigationContext/* useNavigationContext */.QR)();
    const { validateToken } = (0,useAuthService/* default */.Z)();
    const pathname = (0,navigation.usePathname)();
    const { authorized, setAuthorized } = (0,authContext/* useAuthContext */.E)();
    const { isValidRes } = (0,resErrorHandler/* default */.Z)();
    const { deleteStorage } = (0,storageService/* default */.Z)();
    const redirectToLogin = ()=>{
        deleteStorage();
        goToRoute("/pages/auth/login");
    };
    const itsInMainRoute = ()=>{
        return pathname.includes("main");
    };
    const validateTokenStatus = ()=>{
        if (!itsInMainRoute) {
            return;
        }
        if (authorized) {
            return;
        }
        validateToken().then((res)=>{
            if (!isValidRes(res)) {
                redirectToLogin();
            }
        });
    };
    const validateStatus = ()=>{
        if (!itsInMainRoute) {
            return true;
        }
        if (!authorized) {
            redirectToLogin();
            return false;
        }
        return true;
    };
    (0,useDidMountEffect/* default */.Z)(()=>{
        if (!validateStatus()) return;
        const intervalId = setInterval(validateTokenStatus, 30000);
        return ()=>clearInterval(intervalId);
    }, [
        authorized
    ]);
}

;// CONCATENATED MODULE: ./src/app/pages/main/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






function MainLayout({ children }) {
    useTokenValidator();
    return /*#__PURE__*/ jsx_runtime_.jsx(mainContext/* MainProvider */.l, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(supplierContext/* SupplierProvider */.Fs, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(productContext/* ProductProvider */.GW, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(subProductContext/* SubProductProvider */.Mn, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(navBar/* default */.Z, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "lg:ml-5 md:ml-6",
                            children: children
                        })
                    ]
                })
            })
        })
    });
}


/***/ }),

/***/ 44330:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21313);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`D:\listore\listore\src\app\pages\main\layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 41901:
/***/ (() => {



/***/ })

};
;