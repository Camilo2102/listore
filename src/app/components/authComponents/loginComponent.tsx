import { Card } from "primereact/card"
import InputForm from "../formComponents/inputForm"
import PasswordForm from "../formComponents/passwordForm"
import { Button } from "primereact/button"
import { AuthService } from "../../services/authService";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "../../hooks/handleForm";
import { AuthUtil } from "../../utils/authUtil";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormTypes } from "../../constants/formTypeConstant";

export default function LoginComponent() {

    const router = useRouter();

    const authService: AuthService = new AuthService();

    /**
     * Instancia inicial de los formcontrols
     */
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "mail",
                value: "",
                description: "Correo",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-envelope"
            },
            {
                field: "password",
                value: "",
                type: FormTypes.PASSWORD,
                colSize: 12,
                description: "Contraseña",
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
            }
        ]
    );

    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [credential, form, setCredential, validateFormControls] = handleForm(controls);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            authService.login(credential).then(res => {
                AuthUtil.setCredentials(res.token, res.company);
                router.push("/pages/main/user")
            })
        }

    }


    return (
        <Container title="Login">
            <FormGenerator buttonLabel="Ingresar" form={form} value={credential} setValue={setCredential} submit={handleLogin}></FormGenerator>
        </Container>
    )
}