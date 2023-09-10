import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { patternContext } from "@/app/pages/main/inventory/pattern/patternContext";
import { attributeContext } from "@/app/pages/main/inventory/pattern/attribute/attributeContext";
import PatternModel from "@/app/models/pattern";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";
import { useToastContext } from "@/app/context/newToastContext";

export default function RegisterAttribute({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const {create} = useCRUDService(Endpoints.ATTRIBUTES);
    const {isValidRes} = ResErrorHandler();
    const {showSuccess} = useToastContext();

    const {requiered, maxLenght, minLenght} = useValidators();

    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "name",
                value: "",
                description: "Nombre",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(60), minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
             },
        ]
    );
    const [attributeToRegister, form, setAttributeToRegister, validateFormControls] = handleForm(controls);
    const { pattern, setPattern } = useContext(patternContext);
    const {attribute, setAttribute} = useContext(attributeContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleAttribute = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
           attributeToRegister.pattern = new PatternModel();
           attributeToRegister.pattern.id = pattern.id;
            create(true, attributeToRegister).then(
                res => {
                    if(!isValidRes(res)){
                        return;
                     }
                    showSuccess(Messages.MESSAGE_SUCCESS, attribute? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setAttribute(undefined)
                }
            )
        }
    }
    useEffect(() =>{
        if(attribute !== undefined && !submited){
            setAttributeToRegister(attribute);
        }
    }, [submited])

    return (
        <>
            <PopUp title="Nuevo Atributo" visible= {visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setAttributeToRegister} submit={handleAttribute} value={attributeToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    )

}