import PopUp from "../popUp";
import { FormEvent, useEffect, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import useValidators from "@/app/models/formModels/validators";
import { useHandleForm } from "@/app/hooks/useHandleForm";
import FormGenerator from "../CRUDComponents/formGenerator";
import InventoryModel from "@/app/models/inventory";
import { Messages } from "@/app/constants/messageConstant";
import { useMainContext } from "@/app/context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useSupplier } from "@/app/context/supplierContext";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { useToastContext } from "@/app/context/toastContext";

export default function RegisterSupplier({visible, setVisible}:{visible:boolean, setVisible:(partialT: Partial<boolean>) => void}) {

    const {create} = useCRUDService(Endpoints.SUPPLIER);
    const {isValidRes} = ResErrorHandler();
    const {showSuccess} = useToastContext();
    const {requiered, maxLenght, minLenght} = useValidators();
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "name",
                value: "",
                description: "Nombre",
                colSize: 6,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(36), minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "phone",
                value: "",
                description: "Número telefonico",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [requiered, maxLenght(17), minLenght(6)],
                invalid: false,
                message: true,
                icon: "pi-phone"
            },
            {
                field: "mail",
                value: "",
                description: "Email",
                colSize: 6,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(30), minLenght(6)],
                invalid: false,
                message: true,
                icon: "pi-envelope"
            },
            {
                field: "address",
                value: "",
                description: "Dirección",
                colSize: 6,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(60), minLenght(6)],
                invalid: false,
                message: true,
                icon: "pi-directions"
            },
            {
                field: "description",
                value: "",
                description: "Descripción",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [requiered, maxLenght(40), minLenght(6)],
                invalid: false,
                message: true,
                icon: "pi-pencil"
            },
        ]
    );

    const [supplierToRegister, form, setSupplierToRegister, validateFormControls] = useHandleForm(controls);
    const { mainInventory, setMainInventory } = useMainContext();
    const {supplier, setSupplier} = useSupplier();
    
    const [submited, setSubmited] = useState<boolean>(false);
    const handleSupplier = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
            
            supplierToRegister.inventory = new InventoryModel()
            supplierToRegister.inventory.id = mainInventory.id
            create(true, supplierToRegister).then(
                res => {
                    if(!isValidRes(res)){
                        return;
                     }
                    showSuccess(Messages.MESSAGE_SUCCESS, supplier? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setSupplier(undefined)
                }
            )
            
        }
    }

    useEffect(() =>{        
        if(supplier !== undefined && !submited){
            setSupplierToRegister(supplier)
        }
        //eslint-disable-next-line
    }, [submited])


    return (
        <>
            <PopUp title="Proveedor" visible= {visible} setVisible={setVisible}>
               <FormGenerator form={form} setValue={setSupplierToRegister} submit={handleSupplier} value={supplierToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    );
}