import User from "@/app/models/user";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormEvent, useEffect, useState } from "react";
import { handleForm } from "@/app/hooks/handleForm";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import FormControl from "@/app/models/formModels/formControl";
import { RolesOptions } from "@/app/constants/roleValues";
import { AuthService } from "@/app/services/authService";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/generalConstant";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/navigation";
import RegisterWorkerDTO from "@/app/dto/registerWorkerDTO";

export default function RegisterWorker({ userSelected }: { userSelected?: User }) {
    const authService = new AuthService();
    const router = useRouter();

    const [submited, setSubmited] = useState<boolean>(false);
    const [workerToRegister, setWorkerToRegister] = useState<User>({
        name: "",
        role: "",
        active: "",
        credential: {
            id: "",
            mail: "",
            password: "",
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
                icon: "pi-user"
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


    const handleWorker = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            const password = controls.find(control => control.field === 'password')?.value;
            const checkPassword = controls.find(control => control.field === 'passwordCheck')?.value;
            if (password === checkPassword) {
                const { name, userName, mail, password, role } = user;

                setWorkerToRegister(
                    {
                        id: workerToRegister.id ? workerToRegister.id : undefined,
                        name,
                        role,
                        active: 'S',
                        credential: {
                            id: workerToRegister.credential?.id ? workerToRegister.credential?.id : undefined,
                            mail,
                            userName
                        },
                        company: {
                            id: AuthUtil.getCredentials().company
                        }
                    }
                )
                setSubmited(true);
                return;
            }
            ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_PASSWORD_MISMATCH)
        }
    }

    useEffect(() => {
        if (!submited && userSelected) {
            setWorkerToRegister(userSelected);
            setUser(userSelected);
            return;
        }
        if (submited) {
            authService.registerUser(workerToRegister).then(
                res => {
                    ToastService.showSuccess(Messages.MESSAGE_SUCCESS, userSelected ? Messages.MESSAGE_UPDATE_SUCCESS : Messages.MESSAGE_CREATE_SUCCESS);
                    router.push("/pages/main/user")
                }
            );
        }
    }, [submited])


    return (
        <Container title="Registro de trabajador">
            <FormGenerator buttonLabel={userSelected === undefined ? 'Guardar' : 'Actualizar'} update={userSelected === undefined} form={form} value={user} setValue={setUser} submit={handleWorker}></FormGenerator>
        </Container>
    )
}