import { FormEvent, useState } from "react";
import FormGenerator from "./CRUDComponents/formGenerator";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { handleForm } from "../hooks/handleForm";
import { FormTypes } from "../constants/formTypeConstant";
import DateUtil from "../hooks/utils/dateUtils";
import toastUtil from "../hooks/utils/toastUtils";

export default function FormGeneratorExample () {
    const {addDaysFromNow} = DateUtil();
    const {showSuccess} = toastUtil();
     /**
   * Instancia inicial de los formcontrols
   */
     const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "input",
                value: "",
                description: "Input",
                type: FormTypes.INPUT,
                validators: [useValidators.requiered, useValidators.maxLenght(10), useValidators.minLenght(3)],
                invalid: false,
                message: true,
                colSize: 12
            },
            {
                field: "password",
                value: "",
                type: FormTypes.PASSWORD,
                description: "Password",
                validators: [useValidators.requiered],
                invalid: false,
                message: true,
            },
            {
                field: "date",
                value: null,
                type: FormTypes.DATE,
                description: "Date",
                validators: [useValidators.requiered],
                invalid: false,
                message: true,
                minDate: new Date(),
                maxDate: addDaysFromNow(2),
            },
            {
                field: "checkBox",
                value: [],
                description: "CheckBox",
                type: FormTypes.CHECKBOX,
                validators: [useValidators.requiered, useValidators.minLenght(2)],
                invalid: false,
                message: true,
                options: [
                    { code: "pizza", value: "Piz", description: "Pizza" },
                    { code: "pizza2", value: "Piz2", description: "Pizza2" },
                ]
            },
            {
                field: "dropDown",
                value: null,
                description: "DropDown",
                type: FormTypes.DROPDOWN,
                validators: [useValidators.requiered],
                invalid: false,
                message: true,
                options: [
                    { code: "pizza", value: "Piz", description: "Pizza" },
                    { code: "pizza2", value: "Piz2", description: "Pizza2" },
                ]
            },
            {
                field: "radioButton",
                value: null,
                description: "RadioButton",
                type: FormTypes.RADIO,
                validators: [useValidators.requiered],
                invalid: false,
                message: true,
                options: [
                    { code: "pizza", value: "Piz", description: "Pizza" },
                    { code: "pizza2", value: "Piz2", description: "Pizza2" },
                ]
            }
        ]
    );

    const [value, form, setValue, validateFormControls] = handleForm(controls);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);


        if (valid) {
            showSuccess("Si", "");
        }


    }
    
    return(
        <FormGenerator form={form} value={value} setValue={setValue} submit={handleSubmit}></FormGenerator>
    )
}