import SupplierModel from "@/app/models/supplier";
import Link from "next/link";
import { Button } from "primereact/button";
import PopUp from "../popUp";
import { FormEvent, useContext, useEffect, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import { log } from "console";
import FormGenerator from "../CRUDComponents/formGenerator";
import InventoryModel from "@/app/models/inventory";
import { inventoryContext } from '../../pages/main/inventory/inventoryContext';
import { SupplierService } from "@/app/services/supplierService";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import { supplierContext } from "@/app/pages/main/inventory/supplier/supplierContext";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { mainContext } from "@/app/pages/main/mainContext";

export default function RegisterSupplier({visible, setVisible}:{visible:boolean, setVisible:(partialT: Partial<boolean>) => void}) {

    const supplierService = new SupplierService()
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
                field: "phone",
                value: "",
                description: "Número telefonico",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(17), Validators.minLenght(6)],
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
                validators: [Validators.requiered, Validators.maxLenght(30), Validators.minLenght(6)],
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
                validators: [Validators.requiered, Validators.maxLenght(17), Validators.minLenght(6)],
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
                validators: [Validators.requiered, Validators.maxLenght(40), Validators.minLenght(6)],
                invalid: false,
                message: true,
                icon: "pi-pencil"
            },
        ]
    );

    const [supplierToRegister, form, setSupplierToRegister, validateFormControls] = handleForm(controls);
    const { mainInventory, setMainInventory } = useContext(mainContext);
    const {supplier, setSupplier} = useContext(supplierContext);
    
    const [submited, setSubmited] = useState<boolean>(false);
    const handleSupplier = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
            
            supplierToRegister.inventory = new InventoryModel()
            supplierToRegister.inventory.id = mainInventory.id
            supplierService.create(true, supplierToRegister).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastService.showSuccess(Messages.MESSAGE_SUCCESS, supplier? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
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
    }, [submited])


    return (
        <>
            <PopUp title="Proveedor" visible= {visible} setVisible={setVisible}>
               <FormGenerator form={form} setValue={setSupplierToRegister} submit={handleSupplier} value={supplierToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    );
}