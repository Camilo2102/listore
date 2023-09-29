import User from "@/app/models/user";
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormEvent, useEffect, useState } from "react";
import { useHandleForm } from "@/app/hooks/useHandleForm";
import { FormTypes } from "@/app/constants/formTypeConstant";
import useValidators from "@/app/models/formModels/validators";
import FormControl from "@/app/models/formModels/formControl";
import { RolesOptions } from "@/app/constants/roleValues";
import { Messages } from "@/app/constants/messageConstant";

import useAuthService from "@/app/hooks/services/useAuthService";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";

import { useNavigationContext } from "@/app/context/navigationContext";
import AuthUtil from "@/app/hooks/utils/authUtils";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { useToastContext } from "@/app/context/toastContext";
import PopUp from "../popUp";


export default function RegisterWorker({ userSelected, visible, setVisible }: { userSelected?: User, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
    const { registerUser } = useAuthService();
    const { update } = useCRUDService(Endpoints.USER);
    const { goToRoute } = useNavigationContext();
    const { getCredentials } = AuthUtil();
    const { isValidRes } = ResErrorHandler();
    const { showSuccess, showError } = useToastContext();
    const { requiered, maxLenght, minLenght } = useValidators();
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
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user",
                
            },
            {
                field: "userName",
                value: "",
                description: "Usuario",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(12), minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user",
                disabled: userSelected !== undefined,
                
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
                disabled: userSelected !== undefined,
               
            },
            {
                field: "role",
                value: "",
                type: FormTypes.DROPDOWN,
                colSize: 12,
                description: "Rol",
                validators: [requiered],
                invalid: false,
                message: true,
                options: RolesOptions
            }
        ]
    );


    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [user, form, setUser, validateFormControls] = useHandleForm(controls);


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
                            id: getCredentials().company
                        }
                    }
                )
                setSubmited(true);
                return;
            }
            showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_PASSWORD_MISMATCH)
        }
    }

    const registerNewWorker = () => {
        registerUser(workerToRegister).then(
            res => {
                if (!isValidRes(res)) {
                    return;
                }
                showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS);
                setVisible(false);
                
            }
        );
    }

    const updateWorker = () => {
        update(true, workerToRegister).then(
            res => {
                if (!isValidRes(res)) {
                    return;
                }
                showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_UPDATE_SUCCESS);
               setVisible(false);
            }
        )
    }

    useEffect(() => {
 
        if (!submited && userSelected) {
          setWorkerToRegister(userSelected);
      
          // Comprobaciones de nulidad para userSelected.credential
          const userName = userSelected.credential?.userName || '';
          const mail = userSelected.credential?.mail || '';
      
          setUser({
            ...user,
            name: userSelected.name || '',
            role: userSelected.role || '',
            userName: userName,
            mail: mail,
          });
          return;
        }
        if (submited) {
          if (userSelected === undefined) {
            registerNewWorker();
          } else {
            updateWorker();
          }
        }
        //eslint-disable-next-line
      }, [submited]);
      


    return (
        <>
            <PopUp title="Registro de trabajadores" visible={visible} setVisible={setVisible}>
                <FormGenerator form={form} value={user} setValue={setUser} submit={handleRegisterWorker} buttonLabel="Crear"></FormGenerator>
            </PopUp >
        </>

    )
}