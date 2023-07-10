"use client";

import { FormTypes } from "@/app/constants/formTypeConstant";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { FormEvent, useState } from "react";
import Container from "../container";
import FormGenerator from "../formGenerator";
import { handleForm } from "@/app/hooks/handleForm";

export default function RegisterCompany({onValidSubmit}: {onValidSubmit: (value: any) => void}) {
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
                icon: "pi-home"
            },
            {
                field: "phone",
                value: "",
                description: "Teléfono",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(13), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-phone"
            },
            {
                field: "description",
                value: "",
                description: "Descripción",
                type: FormTypes.INPUT,
                colSize: 12,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-pencil",
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
            onValidSubmit(form.getFormControlValues());
        }
    }


    return(
        <Container title="Registro de compañia">
            <FormGenerator buttonLabel="Continuar" form={form} value={user} setValue={setUser} submit={handleLogin}></FormGenerator>
        </Container>
    )
}