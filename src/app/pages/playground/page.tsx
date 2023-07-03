"use client"

import { handleForm } from "@/app/hooks/handleForm";
import { ToastService } from "@/app/services/toastService";
import FormControl from "@/models/formModels/formControl";
import Validators from "@/models/formModels/validators";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FormEvent, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import InputForm from "@/app/components/formComponents/inputForm";
import PasswordForm from "@/app/components/formComponents/passwordForm";
import CalendarForm from "@/app/components/formComponents/calendarForm";
import { DateUtil } from "@/app/utils/dateUtil";
import CheckBoxForm from "@/app/components/formComponents/checkBoxForm";
import DropDownForm from "@/app/components/formComponents/dropDownForm";
import RadioButtonForm from "@/app/components/formComponents/radioButtonForm";

export default function PlayGround() {
    /**
    * Instancia inicial de los formcontrols
    */
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "input",
                value: "",
                description: "Input",
                validators: [Validators.requiered, Validators.maxLenght, Validators.minLenght],
                invalid: false,
                message: true,
                maxLenght: 10,
                minLenght: 3
            },
            {
                field: "password",
                value: "",
                description: "Password",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
                maxLenght: 10,
                minLenght: 3
            },
            {
                field: "date",
                value: null,
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
                validators: [Validators.requiered, Validators.minLenght],
                invalid: false,
                message: true,
                minLenght: 2,
                options: [
                    {code: "pizza", value: "Piz", description: "Pizza"},
                    {code: "pizza2", value: "Piz2", description: "Pizza2"},
                ]
            },
            {
                field: "dropDown",
                value: null,
                description: "DropDown",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
                options: [
                    {code: "pizza", value: "Piz", description: "Pizza"},
                    {code: "pizza2", value: "Piz2", description: "Pizza2"},
                ]
            },
            {
                field: "radioButton",
                value: null,
                description: "RadioButton",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
                options: [
                    {code: "pizza", value: "Piz", description: "Pizza"},
                    {code: "pizza2", value: "Piz2", description: "Pizza2"},
                ]
            }
        ]
    );

    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [value, setValue, validateFormControls] = handleForm(controls);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);


        if (valid) {
            ToastService.showSuccess("Si", "");
        }


    }

    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card title="Play ground">
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
        </div>
    )
}