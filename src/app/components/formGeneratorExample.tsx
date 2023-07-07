import { FormEvent, useState } from "react";
import FormGenerator from "./formGenerator";
import FormControl from "@/models/formModels/formControl";
import Validators from "@/models/formModels/validators";
import { DateUtil } from "../utils/dateUtil";
import { handleForm } from "../hooks/handleForm";
import { FormTypes } from "../constants/formTypeConstant";
import { ToastService } from "../services/toastService";

export default function FormGeneratorExample () {
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
                validators: [Validators.requiered, Validators.maxLenght(10), Validators.minLenght(3)],
                invalid: false,
                message: true,
                colSize: 12
            },
            {
                field: "password",
                value: "",
                type: FormTypes.PASSWORD,
                description: "Password",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
            },
            {
                field: "date",
                value: null,
                type: FormTypes.DATE,
                description: "Date",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
                minDate: new Date(),
                maxDate: DateUtil.addDaysFromNow(2),
            },
            {
                field: "checkBox",
                value: [],
                description: "CheckBox",
                type: FormTypes.CHECKBOX,
                validators: [Validators.requiered, Validators.minLenght(2)],
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
                validators: [Validators.requiered],
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
                validators: [Validators.requiered],
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
            ToastService.showSuccess("Si", "");
        }


    }
    
    return(
        <FormGenerator form={form} value={value} setValue={setValue} submit={handleSubmit}></FormGenerator>
    )
}