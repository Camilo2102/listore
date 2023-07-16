"use client";

import { FormTypes } from "@/app/constants/formTypeConstant";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { FormEvent, useState } from "react";
import Container from "../container";
import FormGenerator from "../formGenerator";
import { handleForm } from "@/app/hooks/handleForm";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import {AuthService} from "@/app/services/authService";


export default function ValidationComponent (){
    const authService = new AuthService();
    /**
     * Instancia inicial de los formcontrols
     */
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "password",
                value: "",
                type: FormTypes.PASSWORD,
                colSize: 12,
                feedback: true,
                description: "Contraseña",
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
            },
            {
                field: "passwordCheck",
                value: "",
                type: FormTypes.PASSWORD,
                colSize: 12,
                description: "Confirmar Contraseña",
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
            }
        ]
    );


    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [user, form, setUser, validateFormControls] = handleForm(controls);


    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);



        if (valid) {
            const password = controls.find(control => control.field === 'password')?.value;
            const checkPassword = controls.find(control => control.field === 'passwordCheck')?.value;

            if(password === checkPassword) {
                return onValidSubmit(1, form.getFormControlValues());
            }

            ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_PASSWORD_MISMATCH)
        }
    }


    return(
        <Container title="Validación de contraseña">
            <FormGenerator buttonLabel="Continuar" form={form} value={user} setValue={setUser} submit={handleLogin}></FormGenerator>
        </Container>
    )
}


function onValidSubmit(arg0: number, arg1: any) {
    throw new Error("Function not implemented.");
}

