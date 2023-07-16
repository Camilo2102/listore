"use client";
import { handleForm } from "@/app/hooks/handleForm";
import { AuthUtil } from "@/app/utils/authUtil";
import { FormEvent, useEffect, useState } from "react";
import Container from "../container";

import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import FormControl from "@/app/models/formModels/formControl";
import { AuthService } from "@/app/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordChange from "@/app/models/passwordChange";
import FormGenerator from "../CRUDComponents/formGenerator";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";


export default function PasswordChangeComponent() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const authService: AuthService = new AuthService();

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
                validators: [Validators.requiered, Validators.maxLenght(6), Validators.minLenght(3)],
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
    const [passwordForm, form, setPasswordForm, validateFormControls] = handleForm(controls);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        debugger
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
            ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_PASSWORD_MISMATCH)
        }
    }

    useEffect(() => {
        if (submited) {
            authService.enableUser(passwordToChange).then(res => {
                router.push("/pages/auth/login")
            })
            setSubmited(false);

        }
    }, [submited]);

    return (
        <Container title="Contraseña">
            <FormGenerator buttonLabel="Ingresar" form={form} value={passwordForm} setValue={setPasswordForm} submit={handleLogin}></FormGenerator>
        </Container>
    )
}