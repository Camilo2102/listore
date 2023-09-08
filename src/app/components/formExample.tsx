import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { FormEvent, useState } from "react";

import { handleForm } from "../hooks/handleForm";
import { Card } from "primereact/card";
import InputForm from "./formComponents/inputForm";
import PasswordForm from "./formComponents/passwordForm";
import CalendarForm from "./formComponents/calendarForm";
import CheckBoxForm from "./formComponents/checkBoxForm";
import DropDownForm from "./formComponents/dropDownForm";
import RadioButtonForm from "./formComponents/radioButtonForm";
import { Button } from "primereact/button";
import { FormTypes } from "../constants/formTypeConstant";
import DateUtil from "../hooks/utils/dateUtils";
import toastUtil from "../hooks/utils/toastUtils";

export default function FormExample() {
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

    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [value, form, setValue, validateFormControls] = handleForm(controls);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);


        if (valid) {
            showSuccess("Si", "");
        }


    }

    return (
        <Card title="Formularios" style={{ height: '100%', width: '100%' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='py-5'>
                    <InputForm formControl={controls[0]} value={value} onValueChange={(data) => { setValue(data) }}></InputForm>
                </div>
                <div className='py-5'>
                    <PasswordForm formControl={controls[1]} value={value} onValueChange={(data) => { setValue(data) }}></PasswordForm>
                </div>
                <div className="py-5">
                    <CalendarForm formControl={controls[2]} value={value} onValueChange={(data) => { setValue(data) }}></CalendarForm>
                </div>
                <div className="py-5">
                    <CheckBoxForm formControl={controls[3]} value={value} onValueChange={(data) => setValue(data)}></CheckBoxForm>
                </div>
                <div className="py-5">
                    <DropDownForm formControl={controls[4]} value={value} onValueChange={(data) => setValue(data)}></DropDownForm>
                </div>
                <div className="py-5">
                    <RadioButtonForm formControl={controls[5]} value={value} onValueChange={(data) => setValue(data)}></RadioButtonForm>
                </div>
                <div className='text-center'>
                    <Button type='submit' label="Primary" />
                </div>
            </form>
        </Card>
    )
}