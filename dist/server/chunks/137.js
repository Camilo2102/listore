exports.id = 137;
exports.ids = [137];
exports.modules = {

/***/ 84234:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 88681))

/***/ }),

/***/ 17442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ FormGenerator)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/app/constants/formTypeConstant.ts
var formTypeConstant = __webpack_require__(42550);
// EXTERNAL MODULE: ./node_modules/primereact/inputtext/inputtext.cjs.js
var inputtext_cjs = __webpack_require__(71785);
;// CONCATENATED MODULE: ./src/app/components/formComponents/inputForm.tsx


function InputForm({ formControl, value, onValueChange, icon, numbers = false }) {
    const handleInput = (e)=>{
        const value = e.target.value;
        onValueChange({
            [formControl.field]: value
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: "p-float-label p-input-icon-right",
        style: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "pi " + icon,
                style: {
                    color: "#9E6A90"
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(inputtext_cjs.InputText, {
                keyfilter: numbers ? "int" : undefined,
                style: {
                    width: "100%"
                },
                id: formControl.field,
                disabled: formControl.disabled,
                className: formControl.invalid ? "p-invalid" : "",
                value: value[formControl.field],
                onChange: handleInput
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                htmlFor: formControl.field,
                children: formControl.description
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/primereact/checkbox/checkbox.cjs.js
var checkbox_cjs = __webpack_require__(27636);
;// CONCATENATED MODULE: ./src/app/components/formComponents/checkBoxForm.tsx


function CheckBoxForm({ formControl, value, onValueChange }) {
    const handleChange = (e)=>{
        let _values = [
            ...value[formControl.field]
        ];
        if (e.checked) _values.push(e.value);
        else _values.splice(_values.indexOf(e.value), 1);
        onValueChange({
            [formControl.field]: _values
        });
    };
    const generateOptions = ()=>{
        return formControl.options?.map((option)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex align-items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(checkbox_cjs/* Checkbox */.X, {
                        inputId: "check" + option.code,
                        disabled: formControl.disabled,
                        className: formControl.invalid ? "p-invalid" : "",
                        name: option.code,
                        value: option.value,
                        onChange: handleChange,
                        checked: value[formControl.field].includes(option.value)
                    }, "box" + option.code),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "check" + option.code,
                        children: [
                            option.description,
                            " "
                        ]
                    }, "label" + option.code)
                ]
            }, "div" + option.code));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: generateOptions()
    });
}

// EXTERNAL MODULE: ./node_modules/primereact/calendar/calendar.cjs.js
var calendar_cjs = __webpack_require__(52186);
;// CONCATENATED MODULE: ./src/app/components/formComponents/calendarForm.tsx


function CalendarForm({ formControl, value, onValueChange }) {
    const handleDate = (data)=>{
        onValueChange({
            [formControl.field]: data
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: "p-float-label",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(calendar_cjs/* Calendar */.f, {
                style: {
                    width: "100%"
                },
                inputId: formControl.field,
                disabled: formControl.disabled,
                maxDate: formControl.maxDate,
                minDate: formControl.minDate,
                className: formControl.invalid ? "p-invalid" : "",
                value: value[formControl.field],
                onChange: (e)=>handleDate(e.value)
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                htmlFor: formControl.field,
                children: formControl.description
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/primereact/dropdown/dropdown.cjs.js
var dropdown_cjs = __webpack_require__(1042);
;// CONCATENATED MODULE: ./src/app/components/formComponents/dropDownForm.tsx


function DropDownForm({ formControl, value, onValueChange }) {
    const handleDropdown = (value)=>{
        onValueChange({
            [formControl.field]: value
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: "p-float-label",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(dropdown_cjs.Dropdown, {
                style: {
                    width: "100% !important"
                },
                disabled: formControl.disabled,
                inputId: formControl.field,
                className: `${formControl.invalid ? "p-invalid" : ""}`,
                value: value[formControl.field],
                onChange: (e)=>handleDropdown(e.value),
                options: formControl.options,
                optionLabel: "code",
                optionValue: "value"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                htmlFor: formControl.field,
                children: formControl.description
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/primereact/password/password.cjs.js
var password_cjs = __webpack_require__(58790);
;// CONCATENATED MODULE: ./src/app/components/formComponents/passwordForm.tsx


function PasswordForm({ formControl, value, onValueChange }) {
    const handlePassword = (e)=>{
        const value = e.target.value;
        onValueChange({
            [formControl.field]: value
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
        className: "p-float-label",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(password_cjs/* Password */.r, {
                style: {
                    width: "100%"
                },
                inputStyle: {
                    width: "100%"
                },
                disabled: formControl.disabled,
                inputId: formControl.field,
                feedback: formControl.feedback,
                className: formControl.invalid ? "p-invalid" : "",
                toggleMask: true,
                value: value[formControl.field],
                onChange: handlePassword
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                htmlFor: formControl.field,
                children: formControl.description
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/primereact/radiobutton/radiobutton.cjs.js
var radiobutton_cjs = __webpack_require__(23064);
;// CONCATENATED MODULE: ./src/app/components/formComponents/radioButtonForm.tsx


function RadioButtonForm({ formControl, value, onValueChange }) {
    const handleChange = (e)=>{
        const value = e.value;
        onValueChange({
            [formControl.field]: value
        });
    };
    const generateOptions = ()=>{
        return formControl.options?.map((option)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex align-items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(radiobutton_cjs/* RadioButton */.E, {
                        inputId: "radio" + option.code,
                        disabled: formControl.disabled,
                        className: formControl.invalid ? "p-invalid" : "",
                        name: option.code,
                        value: option.value,
                        onChange: handleChange,
                        checked: value[formControl.field] === option.value
                    }, "box" + option.code),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "radio" + option.code,
                        children: [
                            option.description,
                            " "
                        ]
                    }, "label" + option.code)
                ]
            }, "div" + option.code));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: generateOptions()
    });
}

// EXTERNAL MODULE: ./node_modules/primereact/button/button.cjs.js
var button_cjs = __webpack_require__(18176);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/app/components/popUp.tsx
var popUp = __webpack_require__(66131);
// EXTERNAL MODULE: ./src/app/components/tableComponents/tableGeneral.tsx + 5 modules
var tableGeneral = __webpack_require__(69011);
// EXTERNAL MODULE: ./src/app/hooks/services/useCRUDService.ts + 2 modules
var useCRUDService = __webpack_require__(80479);
// EXTERNAL MODULE: ./src/app/hooks/utils/resErrorHandler.ts
var resErrorHandler = __webpack_require__(7367);
;// CONCATENATED MODULE: ./src/app/components/formComponents/inputHelper.tsx








function InputHelper({ formControl, value, onValueChange, icon }) {
    const [visible, setVisible] = (0,react_.useState)(false);
    const [showText, setShowText] = (0,react_.useState)("");
    const { isValidRes } = (0,resErrorHandler/* default */.Z)();
    const { getById } = (0,useCRUDService/* default */.Z)(formControl.service);
    const loadData = ()=>{
        setVisible(true);
    };
    const selectValue = (value)=>{
        const item = value.data;
        setShowText(item.name);
        onValueChange({
            [formControl.field]: item,
            ["name" + formControl.field]: item.name
        }, formControl.fieldDependency);
        setVisible(false);
    };
    (0,react_.useEffect)(()=>{
        const id = value[formControl.field].id;
        if (id === undefined) {
            return;
        }
        getById(true, value[formControl.field].id).then((res)=>{
            if (!isValidRes(res)) {
                return;
            }
            const { id, name } = res;
            setShowText(res.name);
            onValueChange({
                [formControl.field]: id,
                ["name" + formControl.field]: name
            }, formControl.fieldDependency);
        });
    //eslint-disable-next-line
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "p-inputgroup",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        className: "p-float-label",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(inputtext_cjs.InputText, {
                                readOnly: true,
                                id: formControl.field,
                                disabled: formControl.disabled,
                                className: formControl.invalid ? "p-invalid" : "",
                                value: showText
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                htmlFor: formControl.field,
                                children: formControl.description
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                        type: "button",
                        disabled: formControl.disabled,
                        onClick: loadData
                    })
                ]
            }),
            visible && formControl.columns && /*#__PURE__*/ jsx_runtime_.jsx(popUp/* default */.Z, {
                title: formControl.description,
                visible: visible,
                setVisible: setVisible,
                children: /*#__PURE__*/ jsx_runtime_.jsx(tableGeneral/* default */.Z, {
                    showRepotGenerator: false,
                    customMap: formControl.customMap,
                    columns: formControl.columns,
                    baseFilter: formControl.filter,
                    endpoint: formControl.service,
                    onRowSelect: selectValue
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/app/hooks/utils/inputTypeSelector.tsx









/**
 * Se encarga de convertir el formControl en un field ya listo para ser usado
 * @param formControl El formcontrol con la informacion para el campo
 * @param value El valor actual del objeto
 * @param setValue Asigna el valor
 * @returns devuelve el elemento listo para ser usado
 */ function inputTypeSelector(formControl, value, setValue) {
    const type = formControl.type ? formControl.type : "";
    const types = {
        [formTypeConstant/* FormTypes */.h.INPUT]: /*#__PURE__*/ jsx_runtime_.jsx(InputForm, {
            icon: formControl.icon,
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.CHECKBOX]: /*#__PURE__*/ jsx_runtime_.jsx(CheckBoxForm, {
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.DATE]: /*#__PURE__*/ jsx_runtime_.jsx(CalendarForm, {
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.DROPDOWN]: /*#__PURE__*/ jsx_runtime_.jsx(DropDownForm, {
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.PASSWORD]: /*#__PURE__*/ jsx_runtime_.jsx(PasswordForm, {
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.RADIO]: /*#__PURE__*/ jsx_runtime_.jsx(RadioButtonForm, {
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.NUMBER]: /*#__PURE__*/ jsx_runtime_.jsx(InputForm, {
            numbers: true,
            icon: formControl.icon,
            formControl: formControl,
            value: value,
            onValueChange: (data)=>{
                setValue(data);
            }
        }),
        [formTypeConstant/* FormTypes */.h.INPUTHELPER]: /*#__PURE__*/ jsx_runtime_.jsx(InputHelper, {
            formControl: formControl,
            value: value,
            onValueChange: (data, dependency)=>{
                setValue(data, dependency);
            }
        }),
        "": /*#__PURE__*/ jsx_runtime_.jsx("h3", {
            children: "Sin implementar"
        })
    };
    return types[type];
}

;// CONCATENATED MODULE: ./src/app/components/CRUDComponents/formGenerator.tsx




function FormGenerator({ form, value, setValue, submit, buttonLabel = "submit", update = false, messages, register }) {
    const generateFields = ()=>{
        const controls = form.getFormControls();
        return controls.map((control)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `col-12 md:col-${control.colSize || "6"} py-4`,
                children: inputTypeSelector(control, value, setValue)
            }, control.field));
    };
    const getMessages = ()=>{
        return messages?.map((msg, i)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-12 flex justify-content-center md:justify-content-end",
                children: msg
            }, i));
    };
    const getMessagesRegister = ()=>{
        return register?.map((msg, i)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-12 flex justify-content-center",
                children: msg
            }, i));
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
        onSubmit: (e)=>submit(e),
        className: "grid",
        children: [
            generateFields(),
            getMessages(),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "col-12 text-center",
                children: /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                    severity: update ? undefined : "success",
                    label: buttonLabel
                })
            }),
            getMessagesRegister()
        ]
    });
}


/***/ }),

/***/ 66131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PopUp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primereact_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6120);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



function PopUp({ title = "Header", children, visible, setVisible }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(primereact_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
        header: title,
        visible: visible,
        onHide: ()=>{
            setVisible(false);
        },
        style: {
            width: "50vw"
        },
        breakpoints: {
            "960px": "75vw",
            "641px": "100vw"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "py-4",
            children: children
        })
    });
}


/***/ }),

/***/ 69011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ TableGeneral)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/primereact/column/column.cjs.js
var column_cjs = __webpack_require__(59210);
// EXTERNAL MODULE: ./node_modules/primereact/datatable/datatable.cjs.js
var datatable_cjs = __webpack_require__(14760);
// EXTERNAL MODULE: ./node_modules/primereact/button/button.cjs.js
var button_cjs = __webpack_require__(18176);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/jspdf/dist/jspdf.node.min.js
var jspdf_node_min = __webpack_require__(54085);
// EXTERNAL MODULE: ./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js
var jspdf_plugin_autotable = __webpack_require__(85262);
var jspdf_plugin_autotable_default = /*#__PURE__*/__webpack_require__.n(jspdf_plugin_autotable);
// EXTERNAL MODULE: ./node_modules/xlsx/xlsx.js
var xlsx = __webpack_require__(9067);
// EXTERNAL MODULE: ./node_modules/file-saver/dist/FileSaver.min.js
var FileSaver_min = __webpack_require__(13302);
var FileSaver_min_default = /*#__PURE__*/__webpack_require__.n(FileSaver_min);
// EXTERNAL MODULE: ./src/app/hooks/useHandleInput.ts
var useHandleInput = __webpack_require__(99700);
// EXTERNAL MODULE: ./src/app/hooks/services/useCRUDService.ts + 2 modules
var useCRUDService = __webpack_require__(80479);
// EXTERNAL MODULE: ./src/app/context/tableContext.tsx
var tableContext = __webpack_require__(99308);
// EXTERNAL MODULE: ./node_modules/primereact/overlaypanel/overlaypanel.cjs.js
var overlaypanel_cjs = __webpack_require__(98063);
// EXTERNAL MODULE: ./src/app/constants/formTypeConstant.ts
var formTypeConstant = __webpack_require__(42550);
// EXTERNAL MODULE: ./src/app/models/formModels/validators.ts
var validators = __webpack_require__(52356);
;// CONCATENATED MODULE: ./src/app/hooks/utils/dateUtils.ts
function DateUtil() {
    /**
   * Obtiene la fecha actual.
   * @returns La fecha actual.
   */ const getCurrentDate = ()=>new Date();
    /**
   * Valida si el valor es una fecha valida
   * @param value valor a validar
   * @returns devuelve si el valor es una instancia valida de una fecha
   */ const validateDate = (value)=>value instanceof Date;
    const formatFullDate = (value)=>{
        if (!validateDate(value)) {
            return value;
        }
        return value.toLocaleDateString("es-ES");
    };
    /**
   * Agrega una cantidad especificada de días a una fecha.
   * @param date La fecha a la que se agregarán los días.
   * @param days La cantidad de días a agregar.
   * @returns La nueva fecha después de agregar los días.
   */ const addDays = (date, days)=>{
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    /**
   * Se devuelve una cantidad especificada de días a una fecha.
   * @param date La fecha a la que se agregarán los días.
   * @param days La cantidad de días a devolverse.
   * @returns La nueva fecha después de regresear los días.
   */ const removeDays = (date, days)=>{
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    };
    /**
   * Agrega una cantidad especificada de días a la fecha actual.
   * @param days La cantidad de días a agregar.
   * @returns La nueva fecha después de agregar los días.
   */ const addDaysFromNow = (days)=>{
        const result = new Date();
        result.setDate(result.getDate() + days);
        return result;
    };
    const removeDaysFromNow = (days)=>{
        const result = new Date();
        result.setDate(result.getDate() - days);
        return result;
    };
    /**
     * Calcula la diferencia en días entre dos fechas.
     * @param date1 La primera fecha.
     * @param date2 La segunda fecha.
     * @returns La diferencia en días entre las dos fechas.
     */ const differenceInDays = (date1, date2)=>{
        const timeDiff = date2.getTime() - date1.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    /**
     * Calcula los días desde la fecha actual hasta una fecha objetivo.
     * @param targetDate La fecha objetivo.
     * @returns Los días desde la fecha actual hasta la fecha objetivo.
     */ const daysFromNow = (targetDate)=>{
        const currentDate = getCurrentDate();
        return differenceInDays(currentDate, targetDate);
    };
    /**
     * Calcula los días antes de una fecha objetivo a partir de la fecha actual.
     * @param targetDate La fecha objetivo.
     * @returns Los días antes de la fecha objetivo a partir de la fecha actual.
     */ const daysBefore = (targetDate)=>{
        const currentDate = getCurrentDate();
        return differenceInDays(targetDate, currentDate);
    };
    return {
        getCurrentDate,
        validateDate,
        formatFullDate,
        addDays,
        removeDays,
        addDaysFromNow,
        differenceInDays,
        daysFromNow,
        daysBefore
    };
}

;// CONCATENATED MODULE: ./src/app/hooks/useFilterSelect.tsx




const convertToInputText = (field, description)=>{
    //eslint-disable-next-line
    const { requiered, maxLenght, minLenght } = (0,validators/* default */.Z)();
    return {
        field: field,
        value: "",
        description: description,
        colSize: 12,
        type: formTypeConstant/* FormTypes */.h.INPUT,
        validators: [
            requiered,
            maxLenght(60),
            minLenght(3)
        ],
        invalid: false,
        message: true
    };
};
const convertToInputNumber = (field, description)=>{
    //eslint-disable-next-line
    const { requiered, maxLenght, minLenght } = (0,validators/* default */.Z)();
    return {
        field: field,
        value: 0,
        description: description,
        colSize: 12,
        type: formTypeConstant/* FormTypes */.h.NUMBER,
        validators: [
            requiered,
            maxLenght(60),
            minLenght(3)
        ],
        invalid: false,
        message: true
    };
};
const convertToInputDate = (field, description)=>{
    //eslint-disable-next-line
    const { requiered, maxLenght, minLenght } = (0,validators/* default */.Z)();
    return {
        field: field,
        value: null,
        description: description,
        colSize: 12,
        type: formTypeConstant/* FormTypes */.h.DATE,
        validators: [
            requiered
        ],
        invalid: false,
        message: true
    };
};
function useGeneratedForm(filter) {
    const { validateDate } = DateUtil();
    const selectValues = ()=>{
        const controls = [];
        filter.values.forEach((value)=>{
            const valueType = validateDate(value.value) ? "date" : typeof value.value;
            const description = value.label;
            const key = value.field;
            const selectedInput = selectInputFromType(valueType, key, description);
            if (selectedInput) {
                controls.push(selectedInput);
            }
        });
        return controls;
    };
    const selectInputFromType = (valueType, field, description)=>{
        switch(valueType){
            case "string":
                return convertToInputText(field, description);
            case "number":
                return convertToInputNumber(field, description);
            case "object":
            case "date":
                return convertToInputDate(field, description);
        }
        return null;
    };
    return selectValues();
}
function useCleanFilterInput(initialValue) {
    Object.keys(initialValue.values).forEach((key)=>{
        const valueType = typeof initialValue.values[key];
        if (valueType === "string") {
            initialValue.values[key] = "";
        }
        if (valueType === "number") {
            initialValue.values[key] = 0;
        }
        if (valueType === "object") {
            initialValue.values[key] = initialValue.values[key];
        }
    });
    const [value, setValue] = (0,useHandleInput/* useHandleInput */.w)(initialValue);
    return [
        value,
        setValue
    ];
}

// EXTERNAL MODULE: ./src/app/components/CRUDComponents/formGenerator.tsx + 8 modules
var formGenerator = __webpack_require__(17442);
// EXTERNAL MODULE: ./src/app/hooks/useHandleForm.ts + 1 modules
var useHandleForm = __webpack_require__(89032);
// EXTERNAL MODULE: ./node_modules/primereact/chip/chip.cjs.js
var chip_cjs = __webpack_require__(79842);
;// CONCATENATED MODULE: ./src/app/hooks/utils/selectionUtil.ts
function validateInput(input) {
    if (typeof input === "string") {
        return input.trim() !== "";
    } else if (typeof input === "number") {
        return input !== 0;
    } else if (input instanceof Date) {
        return true;
    } else {
        return false;
    }
}
function parseToFilter(filter) {
    let object = {};
    filter.values.forEach((value)=>{
        object[value.field] = value.value;
    });
    object = {
        ...object,
        ...filter.required
    };
    return object;
}

;// CONCATENATED MODULE: ./src/app/components/tableComponents/tableFilter.tsx










const chipGenerator = (filter, setFilter, setTempFilter)=>{
    const { validateDate, formatFullDate } = DateUtil();
    const handleChipRemove = (key)=>{
        filter.values.forEach((value)=>{
            if (value.field === key) {
                const asignValue = validateDate(value.value) ? null : "";
                value.value = asignValue;
                setTempFilter({
                    [key]: asignValue
                });
            }
        });
        setFilter({
            values: filter.values
        });
    };
    return filter.values.map((value)=>{
        if (validateInput(value.value)) {
            const asignValue = formatFullDate(value.value);
            return /*#__PURE__*/ jsx_runtime_.jsx(chip_cjs/* Chip */.A, {
                label: value.label + " : " + asignValue,
                removable: true,
                onRemove: (e)=>handleChipRemove(value.field)
            }, value.field);
        }
    });
};
function TableFilter({ filter, setFilter }) {
    const overlayRef = (0,react_.useRef)(null);
    const generatedControls = useGeneratedForm(filter);
    const [applyFilters, setApplyFilters] = (0,react_.useState)(false);
    const handleApplyFilters = (e)=>{
        e.preventDefault();
        setApplyFilters(true);
    };
    const [tempFilter, form, setTempFilter, validateFormControls] = (0,useHandleForm/* useHandleForm */.p)(generatedControls);
    (0,react_.useEffect)(()=>{
        if (applyFilters) {
            filter.values.forEach((value)=>{
                Object.keys(tempFilter).forEach((key)=>{
                    if (key === value.field) {
                        value.value = tempFilter[key];
                    }
                });
            });
            setFilter({
                values: [
                    ...filter.values
                ]
            });
            overlayRef.current.toggle("");
            setApplyFilters(false);
        }
    //eslint-disable-next-line
    }, [
        applyFilters
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(overlaypanel_cjs/* OverlayPanel */.T, {
                ref: overlayRef,
                children: /*#__PURE__*/ jsx_runtime_.jsx(formGenerator/* default */.Z, {
                    buttonLabel: "Filtrar",
                    setValue: setTempFilter,
                    value: tempFilter,
                    form: form,
                    submit: handleApplyFilters
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex justify-content-center align-items-center gap-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                        icon: "pi pi-filter-fill",
                        rounded: true,
                        outlined: true,
                        "aria-label": "Filter",
                        onClick: (e)=>overlayRef.current.toggle(e)
                    }),
                    chipGenerator(filter, setFilter, setTempFilter)
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/app/hooks/useDeepCopy.ts
function useDeepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

// EXTERNAL MODULE: ./src/app/hooks/utils/resErrorHandler.ts
var resErrorHandler = __webpack_require__(7367);
;// CONCATENATED MODULE: ./src/app/components/tableComponents/tableGeneral.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 
















function TableGeneral({ useFilter = true, columns, gridLines, stripedRows, onRowSelect, showRepotGenerator = true, endpoint, baseFilter, customMap, staticValues, name = "exportacion" }) {
    const [values, setValues] = (0,react_.useState)([]);
    const { reloadData, setReloadData, loadingData, setLoadingData } = (0,tableContext/* useTableContext */.S)();
    const { isValidRes } = (0,resErrorHandler/* default */.Z)();
    const { getAllByFilter, countAllByFilter } = (0,useCRUDService/* default */.Z)(endpoint);
    const [paginator, setPaginator] = (0,useHandleInput/* useHandleInput */.w)({
        rows: 10,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });
    //eslint-disable-next-line
    const [filter, setFilter] = useFilter ? useCleanFilterInput(useDeepCopy(baseFilter)) : (0,useHandleInput/* useHandleInput */.w)({});
    const valuesSetter = (e, field, values, action, format)=>{
        if (values) {
            return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: values[e[field]]
            });
        }
        if (field === "supplier") {
            return /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                icon: "pi pi-users",
                severity: "secondary",
                rounded: true,
                outlined: true,
                onClick: ()=>{
                    action && action(e);
                }
            });
        }
        if (field === "CRUDupdate") {
            return /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                icon: "pi pi-pencil",
                rounded: true,
                outlined: true,
                onClick: ()=>{
                    action && action(e);
                }
            });
        }
        if (field === "CRUDdelete") {
            return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                    icon: "pi pi-trash",
                    severity: "danger",
                    rounded: true,
                    outlined: true,
                    onClick: ()=>{
                        action && action(e);
                    }
                })
            });
        }
        if (field === "buy") {
            return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                    icon: "pi pi-shopping-bag",
                    rounded: true,
                    outlined: true,
                    onClick: ()=>{
                        action && action(e);
                    }
                })
            });
        }
        if (field === "sale") {
            return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                    icon: "pi pi-dollar",
                    rounded: true,
                    outlined: true,
                    onClick: ()=>{
                        action && action(e);
                    }
                })
            });
        }
        if (field === "pattern") {
            return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                    icon: "pi pi-box",
                    rounded: true,
                    outlined: true,
                    onClick: ()=>{
                        action && action(e);
                    }
                })
            });
        }
        let value = e[field];
        if (format) {
            value = format(value);
        }
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: value
        });
    };
    const setPage = (e)=>{
        setPaginator({
            rows: e.rows,
            page: e.page,
            first: e.first,
            pagesVisited: ++paginator.pagesVisited,
            loaded: false
        });
    };
    const generateColumns = ()=>{
        return columns.map((column)=>/*#__PURE__*/ jsx_runtime_.jsx(column_cjs/* Column */.s, {
                field: column.field,
                header: column.header,
                sortable: column.sortable,
                body: (e)=>valuesSetter(e, column.field, column.values, column.action, column.format)
            }, column.field));
    };
    const usefulColumns = (0,react_.useMemo)(()=>columns.filter((column)=>!(column.field === "supplier" || column.field === "CRUDupdate" || column.field === "CRUDdelete" || column.field === "buy" || column.field === "sale" || column.field === "pattern")), [
        columns
    ]);
    const exportColumns = (0,react_.useMemo)(()=>usefulColumns.map((column)=>column.header), [
        usefulColumns
    ]);
    const exportValues = (0,react_.useMemo)(()=>values.map((obj)=>usefulColumns.map((item)=>obj[item.field])), [
        values,
        usefulColumns
    ]);
    const exportPdf = ()=>{
        const doc = new jspdf_node_min["default"]("p", "mm", "a4");
        jspdf_plugin_autotable_default()(doc, {
            head: [
                exportColumns
            ],
            body: exportValues
        });
        doc.save(`${name}.pdf`);
    };
    const exportToExcel = ()=>{
        const exportData = exportValues.map((subArray)=>{
            const rowData = {};
            exportColumns.forEach((column, index)=>{
                if (column.toLowerCase().includes("fecha") || column.toLowerCase().includes("date")) {
                    const dateArray = subArray[index];
                    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
                    rowData[column] = dateObject;
                } else {
                    rowData[column] = subArray[index];
                }
            });
            return rowData;
        });
        const worksheet = xlsx.utils.json_to_sheet(exportData, {
            header: exportColumns
        });
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
        const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });
        const blob = new Blob([
            excelBuffer
        ], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        FileSaver_min_default()(blob, `${name}.xlsx`);
    };
    const handleFilterChange = (partialT)=>{
        setFilter(partialT);
        setPaginator({
            loaded: false
        });
    };
    const header = /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex align-items-center justify-content-between gap-2",
        children: [
            baseFilter && useFilter && /*#__PURE__*/ jsx_runtime_.jsx(TableFilter, {
                filter: filter,
                setFilter: handleFilterChange
            }),
            showRepotGenerator && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex justify-content-between gap-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                        type: "button",
                        icon: "pi pi-file-excel",
                        severity: "info",
                        rounded: true,
                        outlined: true,
                        onClick: exportToExcel,
                        "data-pr-tooltip": "XLS"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(button_cjs.Button, {
                        type: "button",
                        icon: "pi pi-file-pdf",
                        severity: "danger",
                        rounded: true,
                        outlined: true,
                        onClick: exportPdf,
                        "data-pr-tooltip": "PDF"
                    })
                ]
            })
        ]
    });
    const getData = (filter)=>{
        getAllByFilter(true, paginator, filter).then((res)=>{
            if (!isValidRes(res)) {
                return;
            }
            countData(filter);
            let values = res;
            if (customMap) {
                values = res.map(customMap);
            }
            setValues(values);
        });
    };
    const countData = (filter)=>{
        countAllByFilter(true, filter).then((res)=>{
            if (!isValidRes(res)) {
                return;
            }
            setPaginator({
                totalRecords: res,
                loaded: true
            });
            setReloadData(false);
            setLoadingData(false);
        });
    };
    (0,react_.useEffect)(()=>{
        if (endpoint && baseFilter && !paginator.loaded || reloadData) {
            setLoadingData(true);
            const parsedFilter = parseToFilter(filter);
            getData(parsedFilter);
        }
    //eslint-disable-next-line
    }, [
        paginator,
        reloadData
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        style: {
            width: "100%"
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx(datatable_cjs/* DataTable */.w, {
            loading: loadingData,
            lazy: true,
            header: header,
            rowsPerPageOptions: [
                5,
                10,
                25,
                50
            ],
            paginatorTemplate: paginator.totalRecords > 10 ? "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" : "",
            currentPageReportTemplate: "{first} a {last} de {totalRecords}",
            first: paginator.first,
            selectionMode: "single",
            onRowSelect: onRowSelect,
            metaKeySelection: false,
            onPage: setPage,
            paginator: true,
            rows: paginator.rows,
            totalRecords: paginator.totalRecords,
            style: {
                borderRadius: "5px"
            },
            showGridlines: gridLines,
            stripedRows: true,
            value: staticValues ?? values,
            removableSort: columns.some((column)=>column.sortable),
            children: generateColumns()
        })
    });
}


/***/ }),

/***/ 42550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ FormTypes)
/* harmony export */ });
class FormTypes {
    static{
        this.INPUT = "input";
    }
    static{
        this.PASSWORD = "password";
    }
    static{
        this.CHECKBOX = "checkbox";
    }
    static{
        this.DROPDOWN = "dropdown";
    }
    static{
        this.DATE = "date";
    }
    static{
        this.RADIO = "radio";
    }
    static{
        this.NUMBER = "number";
    }
    static{
        this.INPUTHELPER = "input-helper";
    }
}


/***/ }),

/***/ 33538:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ Messages)
/* harmony export */ });
class Messages {
    static{
        //Mensajes de header
        this.MESSAGE_SUCCESS = "Realizado con \xe9xito";
    }
    static{
        this.MESSAGE_WARN = "Peligro";
    }
    static{
        this.MESSAGE_INFO = "Ten en cuenta";
    }
    static{
        this.MESSAGE_ERROR = "Error";
    }
    static{
        //Mensajes de body
        this.MESSAGE_CREATE_SUCCESS = "Creado con exito";
    }
    static{
        this.MESSAGE_UPDATE_SUCCESS = "Actualizado con exito";
    }
    static{
        this.MESSAGE_DELETE_SUCCESS = "Eliminado con exito";
    }
    static{
        this.MESSAGE_NO_TOKEN = "No hay un token";
    }
    static{
        // Mensajes de los validadores
        this.MESSAGE_REQUIERED = "Campo requerido: ";
    }
    static{
        this.MESSAGE_MAX_LENGTH = "Longitud maxima: ";
    }
    static{
        this.MESSAGE_NO_MAX_LENGTH_STABLISHED = "No se ha definido una longitud maxima para: ";
    }
    static{
        this.MESSAGE_MIN_LENGTH = "Longitud minima: ";
    }
    static{
        this.MESSAGE_NO_MIN_LENGTH_STABLISHED = "No se ha definido una longitud minima para: ";
    }
    static{
        this.MESSAGE_DUPLICATE_REGISTER = "El registro esta duplicado ";
    }
    static{
        this.MESSAGE_SERVER_UNAVAIABLE = "El servidor esta caido sebas :)";
    }
    static{
        this.MESSAGE_PASSWORD_MISMATCH = "Las contrase\xf1as no coinciden: ";
    }
    static{
        this.MESSAGE_SUCCESS_DISABLED = "Deshabilitado con exito";
    }
    static{
        this.MESSAGE_HEAER_DELETE = "Deseas eliminar?";
    }
    static{
        this.MESSAGE_BODY_DELETE = "Deseas eliminar el registro: ";
    }
    static{
        this.NO_MODEL_MESSAGE = "No se ha creado un modelo";
    }
    static{
        this.NO_MODEL_MESSAGE_BODY = "Seras redirigido a la pagina para crear uno";
    }
}


/***/ }),

/***/ 99308:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ useTableContext),
/* harmony export */   a: () => (/* binding */ TableProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ useTableContext,TableProvider auto */ 

const TableContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
function useTableContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TableContext);
}
function TableProvider({ children }) {
    const [reloadData, setReloadData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [loadingData, setLoadingData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TableContext.Provider, {
        value: {
            reloadData,
            setReloadData,
            loadingData,
            setLoadingData
        },
        children: children
    });
}


/***/ }),

/***/ 68285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ useAuthService)
/* harmony export */ });
/* harmony import */ var _useHttpFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28950);

function useAuthService() {
    const endpoint = "auth";
    const { httpGet, httpPost, httpDelete } = (0,_useHttpFactory__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    /**
     * permite el inicio de sesion del usuario
     * @param crendential datos para el inicio de sesion
     * @returns respuesta del body de la peticion
     */ const login = (crendential)=>{
        return httpPost(endpoint + "/login", false, crendential);
    };
    /**
     * SE encarga de generar la peticion para poder registrar un usario
     * @param registerUser Usuario a registerar en el sistema
     * @returns El estado de la creacion del usuario
     */ const register = (registerUser)=>{
        return httpPost(endpoint + "/register", false, registerUser);
    };
    /**
     * Permite el registro de un usuario dentro de la organizacion
     * @param registerWorker el usuario a registrar
     * @returns el estado de la creacion del usuario
     */ const registerUser = (registerWorker)=>{
        return httpPost(endpoint + "/registerUser", true, registerWorker);
    };
    /**
     * Valida que las credenciales no esten registradas previamente
     * @param credential El lado a validar(Contraseña o nombre de usuario)
     * @returns la peticion para obtener el estado
     */ const validateCredential = (credential)=>{
        return httpGet(endpoint + `/validateCredential?credential=${credential}`, false);
    };
    /**
     * Se encarga de deshabilitar el usuario creado
     * @param id el id del usuario a eliminar
     * @returns el estado de la eliminacion
     */ const disableUser = (id)=>{
        return httpDelete(endpoint + `/disableUser?id=${id}`, true);
    };
    /**
     * Se encarga de reestablecer la contraseña
     * @param passwordChange el objeto con los datos del registro
     * @returns la peticion para resetear la contraseña
     */ const enableUser = (passwordChange)=>{
        return httpPost(endpoint + "/enableUser", false, passwordChange);
    };
    /**
     * Envia el mensaje al back para que valide la direccion de correo y envie el mensaje en caso de estar registrado
     * @param email el correo al que se va a enviar el mensaje
     * @returns el estado de envio del correo
     */ const sendRecoveryEmail = (email)=>{
        return httpGet(endpoint + "/recoverPassword?mail=" + email, false);
    };
    /**
     * Envia una peticion para validar que el token fue enviado correctamente
     * @returns la peticion para validar el token
     */ const validateToken = ()=>{
        return httpGet(endpoint + "/validateToken", true);
    };
    return {
        login,
        register,
        registerUser,
        validateCredential,
        disableUser,
        enableUser,
        sendRecoveryEmail,
        validateToken
    };
}


/***/ }),

/***/ 80479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ useCRUDService)
});

;// CONCATENATED MODULE: ./src/app/constants/routesConstants.ts
class Routes {
    static{
        this.GET_ALL_ROUTE = "/getAll";
    }
    static{
        this.GET_ALL_COUNT_ROUTE = "/getAllCount";
    }
    static{
        this.GET_ALL_BY_PAGE_ROUTE = "/getAllByPage";
    }
    static{
        this.GET_ALL_BY_FILTER = "/getAllByFilters";
    }
    static{
        this.GET_BY_ID_ROUTE = "/getById";
    }
    static{
        this.COUNT_ALL_BY_FILTERS = "/countAllByFilters";
    }
    static{
        this.CREATE_ROUTE = "/create";
    }
    static{
        this.UPDATE_ROUTE = "/update";
    }
    static{
        this.DELETE_ROUTE = "/delete";
    }
    static{
        this.CREATE_ALL_ROUTE = "/createAll";
    }
    static{
        this.DELETEALL_ROUTE = "/deleteAll";
    }
}

// EXTERNAL MODULE: ./src/app/hooks/useHttpFactory.ts
var useHttpFactory = __webpack_require__(28950);
;// CONCATENATED MODULE: ./src/app/hooks/useCRUDFactory.ts


function useCRUDFactory(baseUrl) {
    const { httpGet, httpPost, httpPut, httpDelete } = (0,useHttpFactory/* default */.Z)();
    /**
     * Obtiene la peticion para traer todos los elementos de un objeto T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @returns la peticion lista que trae los objetos de un elemento T
     */ const getAll = (secure = true)=>{
        const petitioRoute = baseUrl + Routes.GET_ALL_ROUTE;
        return httpGet(petitioRoute, secure);
    };
    /**
     * Obtiene la peticion para traer la cantidad de elementos de un objeto T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @returns la peticion lista para obtener la cantidad de registros
     */ const getAllCount = (secure = true)=>{
        const petitioRoute = baseUrl + Routes.GET_ALL_COUNT_ROUTE;
        return httpGet(petitioRoute, secure);
    };
    /**
     * Obtiene la peticion para traer todos los elementos de un objeto T, teniendo en cuenta un paginador
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param page indica la pagina que se va a obtener
     * @param pageSize el tamaño de los elementos
     * @returns la peticion lista para traer los elemtnos T paginados
     */ const getAllByPage = (secure = true, page = 0, pageSize = 10)=>{
        const petitioRoute = baseUrl + Routes.GET_ALL_BY_PAGE_ROUTE + `?pageNumber=${page}&pageSize=${pageSize}`;
        return httpGet(petitioRoute, secure);
    };
    /**
     * Este metodo se encarga de obtener los valores que cumplan con los filtros ingresados
     * @param secure indica si requiere token, por defecto es true
     * @param page indica la pagina que se va a obtener
     * @param pageSize el tamaño de los elementos
     * @param t El objeto a filtrar
     * @returns  la lista de objetos filtrados
     */ const getAllByFilter = (secure = true, paginator, t)=>{
        const petitioRoute = baseUrl + Routes.GET_ALL_BY_FILTER + `?pageNumber=${paginator.page}&pageSize=${paginator.rows}`;
        return httpPost(petitioRoute, secure, [
            t
        ]);
    };
    //  todo    
    const countAllByFilter = (secure = true, t)=>{
        const petitioRoute = baseUrl + Routes.COUNT_ALL_BY_FILTERS;
        return httpPost(petitioRoute, secure, [
            t
        ]);
    };
    /**
     * Obtiene la peticion para crear un registro de tipo T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param body el objeto que se va a enviar en la peticion de tipo T
     * @returns el objeto creado
     */ const create = (secure = true, body)=>{
        const petitioRoute = baseUrl + Routes.CREATE_ROUTE;
        return httpPost(petitioRoute, secure, [
            body
        ]);
    };
    /**
     * Obtiene la peticion para actualizar un registro de tipo T
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param body el objeto a actualizar, importante que tenga el id, en caso contrario falla
     * @returns la peticion con el objeto actualizado
     */ const update = (secure = true, body)=>{
        const petitioRoute = baseUrl + Routes.UPDATE_ROUTE;
        return httpPut(petitioRoute, secure, [
            body
        ]);
    };
    /**
     * Se elimina un registro por id
     * @param baseUrl la url basica para hacer la peticion
     * @param secure indica si requiere token, por defecto es true
     * @param id el id del elemento a eliminar
     * @returns el estado de la operacion
     */ const deleteData = (secure = true, id)=>{
        const petitioRoute = baseUrl + Routes.DELETE_ROUTE + `?id=${id}`;
        return httpDelete(petitioRoute, secure);
    };
    const createAll = (secure = true, body)=>{
        const petitioRoute = baseUrl + Routes.CREATE_ALL_ROUTE;
        return httpPost(petitioRoute, secure, body);
    };
    const deleteAll = (secure = true, id)=>{
        const petitioRoute = baseUrl + Routes.DELETEALL_ROUTE + `?id=${id}`;
        return httpDelete(petitioRoute, secure);
    };
    const getById = (secure = true, id)=>{
        const petitioRoute = baseUrl + Routes.GET_BY_ID_ROUTE + `?id=${id}`;
        return httpGet(petitioRoute, secure);
    };
    return {
        getAll,
        getAllCount,
        getAllByPage,
        getAllByFilter,
        countAllByFilter,
        create,
        update,
        deleteData,
        createAll,
        getById,
        deleteAll
    };
}

;// CONCATENATED MODULE: ./src/app/hooks/services/useCRUDService.ts

function useCRUDService(endpoint) {
    const basePetitions = useCRUDFactory("api/" + endpoint);
    return {
        ...basePetitions
    };
}


/***/ }),

/***/ 89032:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  p: () => (/* binding */ useHandleForm)
});

;// CONCATENATED MODULE: ./src/app/models/formModels/form.ts
/**
 * Clase encargada del manejo de los forms
 */ class Form {
    constructor(formControl){
        this.valid = true;
        this.formControls = formControl;
    }
    /**
     * Valida que el formulario cuente con formcontrols para generar un key value lo genera a partir del field y del value
     * @returns devolver un objeto clave: valor {key: value}, para poder ser usado en el useState 
     */ getFormControlValues() {
        if (!this.withFormControls()) return;
        return this.formControls.reduce((acc, control)=>{
            acc[control.field] = control.value;
            return acc;
        }, {});
    }
    /**
     * Toma los formcontrols y valida con los validadores del formcontrol que este correctamente 
     * @returns los controles modificados con los estados del form y las clases en caso de que falte un campo
     */ validateForm() {
        this.valid = true;
        this.formControls.forEach((form)=>{
            form.invalid = form.validators ? form.validators.some((validator)=>validator(form)) : false;
            if (form.invalid) {
                this.valid = false;
            }
        });
        return this.formControls;
    }
    /**
     * 
     * @param field 
     */ enableField(field) {
        this.formControls.forEach((control)=>{
            if (control.field === field) {
                control.disabled = false;
            }
        });
    }
    updateFilter(field, value) {
        this.formControls.forEach((control)=>{
            if (control.field === field) {
                control.filter = {
                    values: [],
                    required: {
                        ...control.filter?.required,
                        ...value
                    }
                };
            }
        });
    }
    updateColumns(field, value) {
        this.formControls.forEach((control)=>{
            if (control.field === field && control.generateCustomColumns) {
                control.generateCustomColumns(value).then((res)=>{
                    control.columns = res;
                });
            }
        });
    }
    /**
     * se encarga de tomar los valores que tenga dentro del useState para ponerlos como valores en los fromcontrols, es decir poner el valor en el fromcontroll
     * @param values los valores a parchar dentro de los formcontrols
     */ pathValue(values) {
        this.formControls.forEach((control)=>{
            if (values.hasOwnProperty(control.field)) {
                control.value = values[control.field];
            }
        });
    }
    /**
     * 
     * @returns Regresa el estado del formulario
     */ isValid() {
        return this.valid;
    }
    /**
     * Se encarga que al hacer un nuevo input(sin estar validando) se resetee el status para que limpie es estado invalido
     * @param field 
     */ resetStatus(field) {
        this.formControls.forEach((control)=>{
            if (control.field === field) {
                control.invalid = false;
            }
        });
    }
    /**
     * Valida que se tengan formcontrols en el formulario
     * @returns si hay formcontrols en el sistema
     */ withFormControls() {
        return this.formControls.length > 0;
    }
    /**
     * 
     * @returns Regresa los fromcontrols
     */ getFormControls() {
        return this.formControls;
    }
}

// EXTERNAL MODULE: ./src/app/hooks/useHandleInput.ts
var useHandleInput = __webpack_require__(99700);
;// CONCATENATED MODULE: ./src/app/hooks/useHandleForm.ts


const useHandleForm = (formControls)=>{
    const form = new Form(formControls);
    const [value, setValue] = (0,useHandleInput/* useHandleInput */.w)(form.getFormControlValues());
    /**
     * Se encarga de validar cuando se ejecute un cambio en el input y resetea el status del formcontrol
     * @param partialT el objeto parcial a ingresar
     */ const inputChange = (partialT, dependency)=>{
        if (dependency !== undefined) {
            dependency.forEach((dependence)=>{
                dependence.enable && form.enableField(dependence.field);
                const value = partialT[Object.keys(partialT)[0]][dependence.value];
                const field = Object.keys(partialT)[0];
                const obj = {
                    [field]: {
                        id: value
                    }
                };
                if (dependence.toInput) {
                    form.updateFilter(dependence.field, obj);
                } else {
                    partialT = {
                        ...partialT,
                        [dependence.field]: value
                    };
                    form.updateColumns(dependence.field, obj);
                }
            });
        }
        Object.keys(partialT).forEach((key)=>{
            form.resetStatus(key);
        });
        setValue(partialT);
    };
    /**
     * Parcha el valor actual en el formulario
     * @returns la validacion del formulario
     */ const validateForm = ()=>{
        form.pathValue(value);
        return [
            form.validateForm(),
            form.isValid()
        ];
    };
    return [
        value,
        form,
        inputChange,
        ()=>validateForm()
    ];
};


/***/ }),

/***/ 99700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ useHandleInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * hook encargado de asignar los valores e ingresarlos sin importar la clase
 * @param initialValue importante pasar los datos inicializados en cero
 * @returns el valor y la funcion para asignarlos
 */ function useHandleInput(initialValue) {
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
    const setValuePartial = (partialT)=>{
        setValue((prevValue)=>({
                ...prevValue,
                ...partialT
            }));
    };
    return [
        value,
        setValuePartial
    ];
}


/***/ }),

/***/ 28950:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ useHttpFactory)
/* harmony export */ });
/* harmony import */ var _constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33538);
/* harmony import */ var _context_authContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14016);
/* harmony import */ var _context_toastContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72230);
/* harmony import */ var _utils_authUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31015);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function useHttpFactory() {
    const APIURL = "http://localhost:7879/";
    const { authorized, setAuthorized } = (0,_context_authContext__WEBPACK_IMPORTED_MODULE_1__/* .useAuthContext */ .E)();
    const { getCredentials } = (0,_utils_authUtils__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const { showError } = (0,_context_toastContext__WEBPACK_IMPORTED_MODULE_2__/* .useToastContext */ .V)();
    /**
         * Valida si se requiere un token de autorización y lo agrega a los encabezados de la petición.
         * @param secure Indica si es necesaria la autorización.
         * @param headers Los encabezados a los que se agregará el token de autorización.
         */ const requireToken = (secure, headers)=>{
        headers.append("Content-Type", "application/json");
        if (secure) {
            const token = getCredentials().token;
            if (token) {
                headers.append("Authorization", `${token}`);
            } else {
                showError(_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_WARN, _constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_NO_TOKEN);
            }
        } else {
            headers.delete("Authorization");
        }
    };
    /**
         * Maneja la respuesta de la petición fetch, realizando validaciones y parseando los datos.
         * @param fetchPetition La petición fetch a la cual se le va a aplicar la validación de los datos.
         * @returns Una promesa que se resuelve con los datos obtenidos si la respuesta es exitosa.
         */ const handleFetchPetition = (fetchPetition)=>{
        return fetchPetition.then((res)=>{
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            }
            throw res;
        }).catch((err)=>{
            err.json().then((res)=>{
                if (res.status === 401) {
                    setAuthorized(false);
                }
                showError(_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, res.error);
            });
        }).catch((err)=>{
            showError(_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, _constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_SERVER_UNAVAIABLE);
        });
    };
    /**
     * Realiza una solicitud HTTP GET.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */ const httpGet = (url, secure)=>{
        const headers = new Headers();
        requireToken(secure, headers);
        const fetchPetition = fetch(APIURL + url, {
            method: "GET",
            headers: headers
        });
        return handleFetchPetition(fetchPetition);
    };
    /**
     * Realiza una solicitud HTTP POST.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @param body El cuerpo a enviar en el método POST.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */ const httpPost = (url, secure, body)=>{
        const headers = new Headers();
        requireToken(secure, headers);
        const fetchPetition = fetch(APIURL + url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        return handleFetchPetition(fetchPetition);
    };
    /**
     * Realiza una solicitud HTTP PUT.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @param body El cuerpo a enviar en el método PUT.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */ const httpPut = (url, secure, body)=>{
        const headers = new Headers();
        requireToken(secure, headers);
        const fetchPetition = fetch(APIURL + url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
            mode: "cors"
        });
        return handleFetchPetition(fetchPetition);
    };
    /**
     * Realiza una solicitud HTTP DELETE.
     * @param url El endpoint a concatenar con la ruta base.
     * @param secure Indica si se requiere un encabezado de autorización.
     * @returns Una promesa que se resuelve con la respuesta obtenida mediante fetch.
     */ const httpDelete = (url, secure)=>{
        const headers = new Headers();
        requireToken(secure, headers);
        const fetchPetition = fetch(APIURL + url, {
            method: "DELETE",
            headers: headers,
            mode: "cors"
        });
        return handleFetchPetition(fetchPetition);
    };
    return {
        httpGet,
        httpPost,
        httpPut,
        httpDelete
    };
}


/***/ }),

/***/ 31015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ AuthUtil)
/* harmony export */ });
/* harmony import */ var _services_storageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19511);

function AuthUtil() {
    const { saveValue, getValue } = (0,_services_storageService__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
    /**
     * Agrega al local storage el jwt
     * @param token token generado por el back
     */ const setCredentials = (token, company, user, role)=>{
        saveValue("token", token);
        saveValue("company", company);
        saveValue("user", user);
        saveValue("role", role);
    };
    /**
     * Obtiene el jwt almacenado
     * @returns jwt almacenado
     */ const getCredentials = ()=>{
        const credentials = {
            token: getValue("token"),
            company: getValue("company"),
            user: getValue("user"),
            role: getValue("role")
        };
        return credentials;
    };
    return {
        setCredentials,
        getCredentials
    };
}


/***/ }),

/***/ 7367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ResErrorHandler)
/* harmony export */ });
function ResErrorHandler() {
    const isValidRes = (res)=>{
        return res !== undefined;
    };
    return {
        isValidRes
    };
}


/***/ }),

/***/ 52356:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ useValidators)
/* harmony export */ });
/* harmony import */ var _app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33538);
/* harmony import */ var _app_context_toastContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72230);


function useValidators() {
    const { showError } = (0,_app_context_toastContext__WEBPACK_IMPORTED_MODULE_1__/* .useToastContext */ .V)();
    /**
     * Validacion de multiples objetos para validar si tienen contenido
     * @param value un objeto de cualquier tipo
     * @returns el estado para saber si esta vacio
     */ const isEmpty = (value)=>{
        if (value === null || value === undefined) {
            return true;
        } else if (typeof value !== "number" && value === "") {
            return true;
        } else if (typeof value === "object" && Object.keys(value).length === 0 && !(value instanceof Date)) {
            return true;
        } else if (value instanceof Date && isNaN(value.getTime())) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * Validador para indicar que el elemento debe tener valor
     * @param formControl el formcontrol con la informacion del elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */ const requiered = (formControl)=>{
        const empty = isEmpty(formControl.value);
        if (empty && formControl.message) {
            showError(_app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, _app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_REQUIERED + formControl.description);
        }
        return empty;
    };
    /**
     * Validador para establecer una longitud maxima
     * @param maxLenght cantidad maxima que puede contener un elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */ const maxLenght = (maxLenght)=>{
        return (formControl)=>{
            if (maxLenght) {
                const isInvalid = formControl.value.length > maxLenght;
                if (isInvalid && formControl.message) {
                    showError(_app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, _app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_MAX_LENGTH + maxLenght + " para " + formControl.description);
                }
                return isInvalid;
            } else {
                showError(_app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, _app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_NO_MAX_LENGTH_STABLISHED + formControl.description);
                return false;
            }
        };
    };
    /**
     * Validador para establecer la longitud minima
     * @param minLength cantidad minima que puede tener un elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */ const minLenght = (minLength)=>{
        return (formControl)=>{
            if (minLength) {
                const isInvalid = formControl.value.length < minLength;
                if (isInvalid && formControl.message) {
                    showError(_app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, _app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_MIN_LENGTH + minLength + " para " + formControl.description);
                }
                return isInvalid;
            } else {
                showError(_app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_ERROR, _app_constants_messageConstant__WEBPACK_IMPORTED_MODULE_0__/* .Messages */ .V.MESSAGE_NO_MIN_LENGTH_STABLISHED + formControl.description);
                return false;
            }
        };
    };
    return {
        minLenght,
        maxLenght,
        requiered
    };
}


/***/ }),

/***/ 88681:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ PageLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/primereact/confirmdialog/confirmdialog.cjs.js
var confirmdialog_cjs = __webpack_require__(82558);
// EXTERNAL MODULE: ./src/app/components/loadingComponent/loadingComponent.css
var loadingComponent = __webpack_require__(15277);
// EXTERNAL MODULE: ./src/app/context/loadingContext.tsx
var loadingContext = __webpack_require__(7805);
;// CONCATENATED MODULE: ./src/app/components/loadingComponent/loadingComponent.tsx



function LoadingComponent() {
    const { isLoading, startLoading, stopLoading } = (0,loadingContext/* useLoading */.r)();
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: isLoading && /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "loading-overlay",
            children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: "pi pi-spin pi-spinner",
                style: {
                    fontSize: "2.5rem"
                }
            })
        })
    });
}

;// CONCATENATED MODULE: ./src/app/pages/mainUtilElements.tsx



function MainUtilElements() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(LoadingComponent, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(confirmdialog_cjs/* ConfirmDialog */.QH, {})
        ]
    });
}

// EXTERNAL MODULE: ./src/app/context/tableContext.tsx
var tableContext = __webpack_require__(99308);
;// CONCATENATED MODULE: ./src/app/providers/mainProviders.tsx


function MainProviders({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(tableContext/* TableProvider */.a, {
        children: children
    });
}

;// CONCATENATED MODULE: ./src/app/pages/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


function PageLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(MainUtilElements, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(MainProviders, {
                children: children
            })
        ]
    });
}


/***/ }),

/***/ 94076:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21313);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`D:\listore\listore\src\app\pages\layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 15277:
/***/ (() => {



/***/ })

};
;