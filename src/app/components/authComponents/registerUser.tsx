"use client";

import { FormTypes } from "@/app/constants/formTypeConstant";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { FormEvent, useState } from "react";
import { Button } from "primereact/button"
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { useHandleForm } from "@/app/hooks/useHandleForm";
import { useNavigationContext } from "@/app/context/navigationContext";


export default function RegisterUser({onValidSubmit}: {onValidSubmit: (page: number, value: any) => void}) {
    /**
     * Instancia inicial de los formcontrols
     */
    const {goToRoute}= useNavigationContext();
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
                icon: "pi-user"
            },
            {
                field: "userName",
                value: "",
                description: "Usuario",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(36), minLenght(3)],
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
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
            },
        ]
    );


    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [user, form, setUser, validateFormControls] = useHandleForm(controls);


    const handleRegisterUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);



        if (valid) {
            onValidSubmit(1, form.getFormControlValues());
        }
    }

    const getMessagesRegister = () => {
        return [
            <Button key={'account-button'} type="button" label="Ya tengo cuenta" onClick={() =>  goToRoute("/pages/auth/login")} text />,
        ]
    }


    return(
        <div className="lg:p-6 md:p-10 p-4">
            <Container title="Registro de usuario">
                <FormGenerator buttonLabel="Continuar" form={form} value={user} setValue={setUser} submit={handleRegisterUser} register={getMessagesRegister()}></FormGenerator>
            </Container>
        </div>
    )
}