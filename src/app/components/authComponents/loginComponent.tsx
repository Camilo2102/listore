import { Button } from "primereact/button"
import { FormEvent, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { useHandleForm } from "../../hooks/useHandleForm";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormTypes } from "../../constants/formTypeConstant";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useAuthContext } from "@/app/context/authContext";
import useAuthService from "@/app/hooks/services/useAuthService";
import { useNavigationContext } from "@/app/context/navigationContext";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";
import AuthUtil from "@/app/hooks/utils/authUtils";

export default function LoginComponent() {

    const {goToRoute}= useNavigationContext();
    const {login, sendRecoveryEmail} = useAuthService();
    const {isValidRes} = ResErrorHandler();
    const [showRecoveryDialog, setShowRecoveryDialog] = useState<boolean>(false);
    const [recoveryMail, setRecoveryMail] = useState<string>("");
    const {authorized, setAuthorized} = useAuthContext();
    const {setCredentials} = AuthUtil();

    const {requiered, maxLenght, minLenght} = useValidators();
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
                validators: [requiered, maxLenght(36), minLenght(3)],
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
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
            }
        ]
    );

    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [credential, form, setCredential, validateFormControls] = useHandleForm(controls);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            login(credential).then(res => {
                if(!isValidRes(res)){
                    return;
                 }
                setCredentials(res.token, res.company, res.user, res.role);
                setAuthorized("true");
                goToRoute("/pages/main/sale")
            })
        }

    }

    const getMessages = () => {
        return [
            <Button key={'forgotten-password-button'} type="button" label="Olvidaste tu contraseña?" onClick={() => setShowRecoveryDialog(true)} text />,
        ]
    }

    const getMessagesRegister = () => {
        return [
            <Button key={'new-account-button'} type="button" label="Crear nueva cuenta" onClick={() =>  goToRoute("/pages/auth/register")} text />,
        ]
    }

    const handleEmailRecovery = () => {
        sendRecoveryEmail(recoveryMail).then(
            res => {
                if(!isValidRes(res)){
                    return;
                 }
            }
        )
    }

    

    return (
        <>
            <Dialog header="Email de verificacion" visible={showRecoveryDialog} style={{ width: 'md:50vw 70vm' }} onHide={() => setShowRecoveryDialog(false)}>
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
                <FormGenerator messages={getMessages()} register={getMessagesRegister()} buttonLabel="Ingresar" form={form} value={credential} setValue={setCredential} submit={handleLogin}></FormGenerator>
            </Container>
        </>
    )
}