import User from "@/app/models/user";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormEvent, useEffect, useState } from "react";
import { handleForm } from "@/app/hooks/handleForm";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import FormControl from "@/app/models/formModels/formControl";
import { RolesOptions } from "@/app/constants/roleValues";
import { Messages } from "@/app/constants/messageConstant";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/navigation";
import RegisterWorkerDTO from "@/app/dto/registerWorkerDTO";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import useAuthService from "@/app/hooks/services/useAuthService";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { ToastUtil } from "@/app/utils/toastUtil";
import { useNavigationContext } from "@/app/context/navigationContext";

export default function RegisterWorker({ userSelected }: { userSelected?: User }) {
    const {registerUser} = useAuthService();
    const {update} = useCRUDService(Endpoints.USER);
    const {goToRoute}= useNavigationContext();

    const [submited, setSubmited] = useState<boolean>(false);
    const [workerToRegister, setWorkerToRegister] = useState<User>({
        name: "",
        role: "",
        active: "N",
        credential: {
            id: "",
            mail: "",
            password: null,
            userName: ""
        },
        company: {
            id: ""
        }
    });
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
                icon: "pi-user",
                disabled: userSelected !== undefined
            },
            {
                field: "userName",
                value: "",
                description: "Usuario",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(12), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user",
                disabled: userSelected !== undefined
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
                disabled: userSelected !== undefined
            },
            {
                field: "role",
                value: "",
                type: FormTypes.DROPDOWN,
                colSize: 12,
                description: "Rol",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
                options: RolesOptions
            }
        ]
    );


    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [user, form, setUser, validateFormControls] = handleForm(controls);


    const handleRegisterWorker = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            const password = controls.find(control => control.field === 'password')?.value;
            const checkPassword = controls.find(control => control.field === 'passwordCheck')?.value;
            if (password === checkPassword) {
                const { name, userName, mail, role } = user;
                setWorkerToRegister(
                    {
                        id: workerToRegister.id ? workerToRegister.id : undefined,
                        name, 
                        role, 
                        active: userSelected ? 'S' : "N",
                        credential: {
                            id: workerToRegister.credential?.id ? workerToRegister.credential?.id : undefined,
                            mail,
                            userName,
                            password: null
                        },
                        company: {
                            id: AuthUtil.getCredentials().company
                        }
                    }
                )
                setSubmited(true);
                return;
            }
            ToastUtil.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_PASSWORD_MISMATCH)
        }
    }

    const registerNewWorker = () => {
        registerUser(workerToRegister).then(
            res => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS);
                goToRoute("/pages/main/user")
            }
        );
    }

    const updateWorker = () => {
        update(true, workerToRegister).then(
            res => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_UPDATE_SUCCESS);
                goToRoute("/pages/main/user")
            }
        )
    }

    useEffect(() => {
        if (!submited && userSelected) {
            setWorkerToRegister(userSelected);
            setUser(userSelected);
            return;
        }
        if (submited) {
            if(userSelected === undefined){
                registerNewWorker();
            } else {
                updateWorker();
            }
        }
    }, [submited])


    return (
        <div className="lg:p-6 md:p-10 p-4">
            <Container title="Registro de trabajador">
                <FormGenerator buttonLabel={userSelected === undefined ? 'Guardar' : 'Actualizar'} update={userSelected === undefined} form={form} value={user} setValue={setUser} submit={handleRegisterWorker}></FormGenerator>
            </Container>
        </div>
        
    )
}