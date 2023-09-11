"use client";

import { FormTypes } from "@/app/constants/formTypeConstant";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { FormEvent, useState } from "react";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { useHandleForm } from "@/app/hooks/useHandleForm";

export default function RegisterCompany({onValidSubmit}: {onValidSubmit: (value: any) => void}) {
    /**
     * Instancia inicial de los formcontrols
    */

    const {requiered, maxLenght, minLenght} = useValidators();

    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "name",
                value: "",
                description: "Nombre",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(36), minLenght(3)],
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
                validators: [requiered, maxLenght(13), minLenght(3)],
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
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-pencil",
            },
        ]
    );


    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [user, form, setUser, validateFormControls] = useHandleForm(controls);


    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            onValidSubmit(form.getFormControlValues());
        }
    }


    return(
        <div className="lg:p-6 md:p-10 p-4">
            <Container title="Registro de compañia" >
                <FormGenerator buttonLabel="Continuar" form={form} value={user} setValue={setUser} submit={handleLogin}></FormGenerator>
            </Container>
        </div>
       
    )
}