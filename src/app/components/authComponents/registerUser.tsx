"use client";

import { FormTypes } from "@/app/constants/formTypeConstant";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { FormEvent, useState } from "react";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { handleForm } from "@/app/hooks/handleForm";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import {AuthService} from "@/app/services/authService";

export default function RegisterUser({onValidSubmit}: {onValidSubmit: (page: number, value: any) => void}) {
    const authService = new AuthService();
    /**
     * Instancia inicial de los formcontrols
     */
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "name",
                value: "",
                description: "Nombre",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "userName",
                value: "",
                description: "Usuario",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "mail",
                value: "",
                description: "Correo",
                icon: "pi-envelope",
                type: FormTypes.INPUT,
                colSize: 12,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
            },
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
            onValidSubmit(1, form.getFormControlValues());
        }
    }


    return(
        <Container title="Registro de usuario">
            <FormGenerator buttonLabel="Continuar" form={form} value={user} setValue={setUser} submit={handleLogin}></FormGenerator>
        </Container>
    )
}