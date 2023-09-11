exports.id = 531;
exports.ids = [531];
exports.modules = {

/***/ 20488:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 90125, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 86249, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 97844, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 61522, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 13100, 23))

/***/ }),

/***/ 6743:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 56718))

/***/ }),

/***/ 14016:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useAuthContext),
/* harmony export */   H: () => (/* binding */ AuthProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96479);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ useAuthContext,AuthProvider auto */ 


const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function useAuthContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(AuthContext);
}
function AuthProvider({ children }) {
    const [authorized, setAuthorized] = (0,_app_hooks_useHandleContextHook__WEBPACK_IMPORTED_MODULE_1__/* .useHandleContext */ .W)("authorized");
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            authorized,
            setAuthorized
        },
        children: children
    });
}


/***/ }),

/***/ 7805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ LoadingProvider),
/* harmony export */   r: () => (/* binding */ useLoading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const LoadingContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
function useLoading() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LoadingContext);
}
function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const startLoading = ()=>setIsLoading(true);
    const stopLoading = ()=>setIsLoading(false);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LoadingContext.Provider, {
        value: {
            isLoading,
            startLoading,
            stopLoading
        },
        children: children
    });
}


/***/ }),

/***/ 81506:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KQ: () => (/* binding */ NavigationProvider),
/* harmony export */   QR: () => (/* binding */ useNavigationContext)
/* harmony export */ });
/* unused harmony export NavigationContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _loadingContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7805);





const NavigationContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({});
function useNavigationContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(NavigationContext);
}
const NavigationProvider = ({ children })=>{
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.usePathname)();
    const params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useSearchParams)();
    const { startLoading, stopLoading } = (0,_loadingContext__WEBPACK_IMPORTED_MODULE_3__/* .useLoading */ .r)();
    const [version, setVersion] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const pathWithVersion = (path)=>{
        if (version !== "") {
            path += `?version=${version}`;
        }
        return path;
    };
    const goToRoute = (path)=>{
        startLoading();
        const modifiedPath = pathWithVersion(path);
        if (pathname === modifiedPath) {
            return stopLoading();
        }
        router.push(modifiedPath);
    };
    const getVersion = ()=>{
        const paramVersion = params.get("version");
        setVersion("");
        if (paramVersion) {
            setVersion(paramVersion);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        getVersion();
        stopLoading();
    //eslint-disable-next-line
    }, [
        pathname,
        params
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NavigationContext.Provider, {
        value: {
            goToRoute,
            version
        },
        children: children
    });
};


/***/ }),

/***/ 72230:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ useToastContext),
/* harmony export */   Z: () => (/* binding */ ToastProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(113);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);



const ToastContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
function useToastContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ToastContext);
}
function ToastProvider({ children }) {
    const Toast = sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast)=>{
            toast.addEventListener("mouseenter", (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().stopTimer));
            toast.addEventListener("mouseleave", (sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().resumeTimer));
        }
    });
    /**
     * Mostrar mensaje realizado correctamente (verde)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */ const showSuccess = (title, message)=>{
        Toast.fire({
            icon: "success",
            title: title,
            text: message,
            showConfirmButton: false
        });
    };
    /**
     * Mostrar mensaje erroneo (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */ const showError = (title, message)=>{
        Toast.fire({
            icon: "error",
            title: title,
            text: message,
            showConfirmButton: false
        });
    };
    /**
     * Mostrar mensaje advertencia (rojo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */ const showWarn = (title, message)=>{
        Toast.fire({
            icon: "warning",
            title: title,
            text: message,
            showConfirmButton: false
        });
    };
    /**
     * Mostrar mensaje informativo (amarillo)
     * @param title titulo del mensaje
     * @param message mensaje del mensaje xD
     */ const showInfo = (title, message)=>{
        Toast.fire({
            icon: "info",
            title: title,
            text: message,
            showConfirmButton: false
        });
    };
    const showErrorWithButton = (title, message)=>{
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
            position: "center",
            icon: "error",
            title: title,
            text: message,
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ToastContext.Provider, {
        value: {
            showError,
            showInfo,
            showSuccess,
            showWarn,
            showErrorWithButton
        },
        children: children
    });
}


/***/ }),

/***/ 19511:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ StorageService)
/* harmony export */ });
function StorageService() {
    const saveValue = (key, value)=>{
        localStorage.setItem(key, value);
    };
    const getValue = (value)=>{
        return localStorage.getItem(value);
    };
    const deleteValue = (value)=>{
        localStorage.removeItem(value);
    };
    const deleteStorage = ()=>{
        localStorage.clear();
    };
    return {
        saveValue,
        getValue,
        deleteValue,
        deleteStorage
    };
}


/***/ }),

/***/ 96479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ useHandleContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_storageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19511);


const useHandleContext = (key)=>{
    const { getValue, deleteValue, saveValue } = (0,_services_storageService__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getValue(key) !== null ? JSON.parse(getValue(key)) : undefined);
    const setValueAndStore = (t)=>{
        setValue(t);
        if (t === undefined) {
            return deleteValue(key);
        }
        saveValue(key, JSON.stringify(t));
    };
    return [
        value,
        setValueAndStore
    ];
};


/***/ }),

/***/ 56718:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/app/theme.css
var theme = __webpack_require__(90698);
// EXTERNAL MODULE: ./node_modules/primereact/resources/primereact.min.css
var primereact_min = __webpack_require__(33453);
// EXTERNAL MODULE: ./node_modules/primeicons/primeicons.css
var primeicons = __webpack_require__(51091);
// EXTERNAL MODULE: ./node_modules/primeflex/primeflex.css
var primeflex = __webpack_require__(63468);
// EXTERNAL MODULE: ./src/app/context/authContext.tsx
var authContext = __webpack_require__(14016);
// EXTERNAL MODULE: ./src/app/context/loadingContext.tsx
var loadingContext = __webpack_require__(7805);
// EXTERNAL MODULE: ./src/app/context/navigationContext.tsx
var navigationContext = __webpack_require__(81506);
// EXTERNAL MODULE: ./src/app/context/toastContext.tsx
var toastContext = __webpack_require__(72230);
;// CONCATENATED MODULE: ./src/app/providers/globalProviders.tsx





function GlobalProviders({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(loadingContext/* LoadingProvider */.P, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(navigationContext/* NavigationProvider */.KQ, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(toastContext/* default */.Z, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(authContext/* AuthProvider */.H, {
                    children: children
                })
            })
        })
    });
}

;// CONCATENATED MODULE: ./src/app/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: "p-0 m-0",
            children: /*#__PURE__*/ jsx_runtime_.jsx(GlobalProviders, {
                children: children
            })
        })
    });
}


/***/ }),

/***/ 54232:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21313);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`D:\listore\listore\src\app\layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 82819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93180);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 90698:
/***/ (() => {



/***/ })

};
;