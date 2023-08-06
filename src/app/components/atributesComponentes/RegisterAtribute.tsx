import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { atributeContext } from "@/app/pages/main/inventory/product/atribute/atributeContext";
import { productContext } from "@/app/pages/main/inventory/product/productContext";
import { AtributeService } from "@/app/services/atributeService";
import { ToastService } from "@/app/services/toastService";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import ProductModel from "@/app/models/product";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";

export default function RegisterAtribute({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const atributesService = new AtributeService()
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "name",
                value: "",
                description: "Nombre",
                colSize: 6,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "value",
                value: "",
                description: "Valor",
                colSize: 6,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(36), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-pencil"
            }
        ]
    );
    const [atributeToRegister, form, setAtributeToRegister, validateFormControls] = handleForm(controls);
    const {product, setProduct} = useContext(productContext);
    const {atribute, setAtribute} = useContext(atributeContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleAtributes = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
           atributeToRegister.product = new ProductModel()
           atributeToRegister.product.id = product.id
            atributesService.create(true, atributeToRegister).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastService.showSuccess(Messages.MESSAGE_SUCCESS, atribute? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setAtribute(undefined)
                }
            )
        }
    }
    useEffect(() =>{
        if(atribute !== undefined && !submited){
            setAtributeToRegister(atribute)
        }
    }, [submited])

    return (
        <>
            <PopUp title="Atributos producto" visible= {visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setAtributeToRegister} submit={handleAtributes} value={atributeToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    )

}