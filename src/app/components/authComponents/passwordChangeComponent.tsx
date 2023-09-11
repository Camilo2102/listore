"use client";
import { useHandleForm } from "@/app/hooks/useHandleForm";
import { FormEvent, useEffect, useState } from "react";
import Container from "../container";
import { FormTypes } from "@/app/constants/formTypeConstant";
import useValidators from "@/app/models/formModels/validators";
import FormControl from "@/app/models/formModels/formControl";
import { useSearchParams } from "next/navigation";
import PasswordChange from "@/app/models/passwordChange";
import FormGenerator from "../CRUDComponents/formGenerator";
import { Messages } from "@/app/constants/messageConstant";
import useAuthService from "@/app/hooks/services/useAuthService";
import { useNavigationContext } from "@/app/context/navigationContext";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { useToastContext } from "@/app/context/toastContext";


export default function PasswordChangeComponent() {
    const {goToRoute}= useNavigationContext();
    const searchParams = useSearchParams()

    const {enableUser} = useAuthService();
    const {isValidRes} = ResErrorHandler();
    const { showError} = useToastContext();

    const {requiered, maxLenght, minLenght} = useValidators();
    /**
     * Instancia inicial de los formcontrols
     */
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "code",
                value: "",
                description: "Código de verificación",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(6), minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-envelope"
            },
            {
                field: "password",
                value: "",
                type: FormTypes.PASSWORD,
                colSize: 12,
                feedback: true,
                description: "Contraseña",
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
            },
            {
                field: "passwordCheck",
                value: "",
                type: FormTypes.PASSWORD,
                colSize: 12,
                description: "Confirmar Contraseña",
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
            }
        ]
    );

    const [passwordToChange, setPasswordToChange] = useState<PasswordChange>(
        {
            code: "",
            password: "",
            token: ""
        }
    );

    const [submited, setSubmited] = useState<boolean>(false);

    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [passwordForm, form, setPasswordForm, validateFormControls] = useHandleForm(controls);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            const password = controls.find(control => control.field === 'password')?.value;
            const checkPassword = controls.find(control => control.field === 'passwordCheck')?.value;

            if (password === checkPassword) {
                const { password, code } = passwordForm;
                const token = searchParams.get('token') as string;
                setPasswordToChange(
                    {
                        password,
                        code,
                        token
                    }
                );

                setSubmited(true);
                return;
            }
            showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_PASSWORD_MISMATCH)
        }
    }

    useEffect(() => {
        if (submited) {
            enableUser(passwordToChange).then(res => {
                if(!isValidRes(res)){
                    return;
                 }
                goToRoute("/pages/auth/login")
            })
            setSubmited(false);

        }
        //eslint-disable-next-line
    }, [submited]);

    return (
        <div className="md:p-8 p-4">
            <Container title="Contraseña" >
                <FormGenerator buttonLabel="Ingresar" form={form} value={passwordForm} setValue={setPasswordForm} submit={handleLogin}></FormGenerator>
            </Container>
        </div>
    )
}