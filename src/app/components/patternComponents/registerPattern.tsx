import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { ToastUtil } from "@/app/utils/toastUtil";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import InventoryModel from "@/app/models/inventory";
import { useMainContext } from "@/app/context/mainContext";
import { patternContext } from "@/app/pages/main/inventory/pattern/patternContext";

export default function RegisterPattern({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const {create} = useCRUDService(Endpoints.PATTERN);

    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "name",
                value: "",
                description: "Nombre",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(60), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
             },
        ]
    );
    const [patternToRegister, form, setPatternToRegister, validateFormControls] = handleForm(controls);
    const { mainInventory, setMainInventory } = useMainContext();
    const {pattern, setPattern} = useContext(patternContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleBuy = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
           patternToRegister.inventory = new InventoryModel();
           patternToRegister.inventory.id = mainInventory.id
            create(true, patternToRegister).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, pattern? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setPattern(undefined)
                }
            )
        }
    }
    useEffect(() =>{
        if(pattern !== undefined && !submited){
            setPatternToRegister(pattern)
        }
    }, [submited])

    return (
        <>
            <PopUp title="Nuevo Modelo" visible= {visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setPatternToRegister} submit={handleBuy} value={patternToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    )

}