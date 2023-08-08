import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { ToastService } from "@/app/services/toastService";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import User from "@/app/models/user";
import { AuthUtil } from "@/app/utils/authUtil";
import { SpentService } from "@/app/services/spentService";
import { spentContext } from "@/app/pages/main/spent/spentContext";

export default function RegisterSpent({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const spentService = new SpentService();
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "price",
                value: "",
                description: "Precio",
                colSize: 12,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "description",
                value: "",
                description: "Descripción",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(120), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
             },
        ]
    );
    const [spentToRegister, form, setSpentToRegister, validateFormControls] = handleForm(controls);
    const {spent, setSpent} = useContext(spentContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleBuy = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
           spentToRegister.user = new User();
           spentToRegister.user.id =  AuthUtil.getCredentials().user;
            spentService.create(true, spentToRegister).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastService.showSuccess(Messages.MESSAGE_SUCCESS, spent? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setSpent(undefined)
                }
            )
        }
    }
    useEffect(() =>{
        if(spent !== undefined && !submited){
            setSpentToRegister(spent)
        }
    }, [submited])

    return (
        <>
            <PopUp title="Nuevo Gasto" visible= {visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setSpentToRegister} submit={handleBuy} value={spentToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    )

}