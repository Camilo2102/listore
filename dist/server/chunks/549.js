"use strict";
exports.id = 549;
exports.ids = [549];
exports.modules = {

/***/ 43661:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ TitleTables)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function TitleTables({ title }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "col-12 flex justify-content-center",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                style: {
                    fontSize: "50px",
                    color: "#9e6a90",
                    fontStyle: "italic",
                    marginTop: "1px"
                },
                children: title
            })
        })
    });
}


/***/ }),

/***/ 74470:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ useFormats)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function useFormats() {
    /**
   * Formatea una fecha en una cadena de texto según el formato especificado.
   * @param date La fecha a formatear.
   * @returns La fecha formateada como una cadena de texto.
   */ const formatDate = (date)=>{
        const [year, month, day, hour = 0, minute = 0, second = 0] = date;
        const formattedDay = day.toString().padStart(2, "0");
        const formattedMonth = month.toString().padStart(2, "0");
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
        if (hour === 0 && minute === 0 && second === 0) {
            return formattedDate;
        } else {
            return `${formattedDate} - ${formattedTime}`;
        }
    };
    const formatCurrency = (value)=>{
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(value);
    };
    const formatDetail = (values)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
            style: {
                padding: "0",
                listStyle: "inside"
            },
            children: Object.keys(values).map((key)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                    children: [
                        key,
                        ": ",
                        values[key]
                    ]
                }, "prop-name-" + key))
        });
    };
    return {
        formatDate,
        formatCurrency,
        formatDetail
    };
}


/***/ })

};
;