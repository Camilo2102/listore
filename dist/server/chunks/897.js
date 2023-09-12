exports.id = 897;
exports.ids = [897];
exports.modules = {

/***/ 1511:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4029))

/***/ }),

/***/ 85103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  C: () => (/* binding */ RolesMap),
  W: () => (/* binding */ RolesOptions)
});

;// CONCATENATED MODULE: ./src/app/constants/roleConstants.ts
class Roles {
    static{
        this.CHALLENGER_DESC = "Challenger";
    }
    static{
        this.MASTER_DESC = "Master";
    }
    static{
        this.DIAMOND_DESC = "Diamond";
    }
    static{
        this.PLATINUM_DESC = "Platinum";
    }
    static{
        this.GOLD_DESC = "Gold";
    }
    static{
        this.CHALLENGER_VAL = "C";
    }
    static{
        this.MASTER_VAL = "M";
    }
    static{
        this.DIAMOND_VAL = "D";
    }
    static{
        this.PLATINUM_VAL = "P";
    }
    static{
        this.GOLD_VAL = "G";
    }
}

;// CONCATENATED MODULE: ./src/app/constants/roleValues.ts

const RolesMap = {
    [Roles.CHALLENGER_VAL]: Roles.CHALLENGER_DESC,
    [Roles.MASTER_VAL]: Roles.MASTER_DESC,
    [Roles.DIAMOND_VAL]: Roles.DIAMOND_DESC,
    [Roles.PLATINUM_VAL]: Roles.PLATINUM_DESC,
    [Roles.GOLD_VAL]: Roles.GOLD_DESC
};
const RolesOptions = [
    {
        code: Roles.DIAMOND_DESC,
        value: Roles.DIAMOND_VAL,
        description: Roles.DIAMOND_DESC
    },
    {
        code: Roles.PLATINUM_DESC,
        value: Roles.PLATINUM_VAL,
        description: Roles.PLATINUM_DESC
    },
    {
        code: Roles.GOLD_DESC,
        value: Roles.GOLD_VAL,
        description: Roles.GOLD_DESC
    }
];


/***/ }),

/***/ 4029:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _userContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10624);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function UserLayout({ children }) {
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_userContext__WEBPACK_IMPORTED_MODULE_2__/* .userContext */ .x.Provider, {
            value: {
                user,
                setUser
            },
            children: children
        })
    });
}


/***/ }),

/***/ 10624:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ userContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* __next_internal_client_entry_do_not_use__ userContext auto */ 
const userContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});


/***/ }),

/***/ 36500:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21313);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`D:\listore\listore\src\app\pages\main\user\layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;