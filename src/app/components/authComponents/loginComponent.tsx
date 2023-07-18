import { Card } from "primereact/card"
import InputForm from "../formComponents/inputForm"
import PasswordForm from "../formComponents/passwordForm"
import { Button } from "primereact/button"
import { AuthService } from "../../services/authService";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "../../hooks/handleForm";
import { AuthUtil } from "../../utils/authUtil";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormTypes } from "../../constants/formTypeConstant";
import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function LoginComponent() {

    const router = useRouter();

    const authService: AuthService = new AuthService();

    const [showRecoveryDialog, setShowRecoveryDialog] = useState<boolean>(false);
    const [recoveryMail, setRecoveryMail] = useState<string>("");
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

    const getMessages = () => {
        return [
            <Button type="button" label="Olvidaste tu contraseña?" onClick={() => setShowRecoveryDialog(true)} text />,
        ]
    }

    const handleEmailRecovery = () => {
        authService.sendRecoveryEmail(recoveryMail).then(
            res => {
                console.log(res);
                
            }
        )
    }

    

    return (
        <>
            <Dialog header="Email de verificacion" visible={showRecoveryDialog} style={{ width: '50vw' }} onHide={() => setShowRecoveryDialog(false)}>
                <form className="pt-5 grid" onSubmit={handleEmailRecovery}>
                    <div className="col-12">
                        <p className="text-900 font-bold text-xl">Escribe tu dirección de correo, y recibiras un mensaje en caso de que este registrada</p>
                    </div>
                    <div className="col-8">
                        <span className="p-float-label p-input-icon-right" style={{ width: '100%' }} >
                            <i className={'pi pi-envelope'} style={{ color: '#9E6A90' }}></i>
                            <InputText style={{ width: '100%' }} id="mail" value={recoveryMail} onChange={(e) => setRecoveryMail(e.target.value)} />
                            <label htmlFor="mail" >Correo:</label>
                        </span>
                    </div>
                    <div className="col-4">
                        <Button label="Enviar Mensaje"></Button>
                    </div>
                </form>

            </Dialog>
            <Container title="Login">
                <FormGenerator messages={getMessages()} buttonLabel="Ingresar" form={form} value={credential} setValue={setCredential} submit={handleLogin}></FormGenerator>
            </Container>
        </>
    )
}