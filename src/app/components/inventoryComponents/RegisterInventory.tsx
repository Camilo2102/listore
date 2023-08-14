"use client"
import PopUp from "@/app/components/popUp";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import FormGenerator from "@/app/components/CRUDComponents/formGenerator";
import InventoryModel from "@/app/models/inventory";
import { ToastUtil } from "@/app/utils/toastUtil";
import { Messages } from "@/app/constants/messageConstant";
import { AuthUtil } from "@/app/utils/authUtil";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { useMainContext } from "@/app/context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";


export default function RegisterInventory({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
   const {create } = useCRUDService(Endpoints.INVENTORY);
   const router = useRouter();

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
         {
            field: "description",
            value: "",
            description: "Descripción",
            colSize: 12,
            type: FormTypes.INPUT,
            validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
            invalid: false,
            message: true,
            icon: "pi-user"
         },
         {
            field: "category",
            value: "",
            description: "Categoria",
            colSize: 12,
            type: FormTypes.INPUT,
            validators: [Validators.requiered, Validators.maxLenght(60), Validators.minLenght(3)],
            invalid: false,
            message: true,
            icon: "pi-user"
         }
      ]
   );

   const [inventoryToRegister, form, setInventoryToRegister, validateFormControls] = handleForm(controls);

   const [submited, setSubmited] = useState<boolean>(false);
   const { mainInventory, setMainInventory } = useMainContext();
   const handleInventory = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [formControls, valid] = validateFormControls();

      setControls([...formControls]);

      if (valid) {
         const { name, description, category } = inventoryToRegister;

         create(true, {
            id: mainInventory?.id,
            name,
            description,
            category,
            company: { id: AuthUtil.getCredentials().company }
         }).then(res => {
            if(!ResErrorHandler.isValidRes(res)){
               return;
            }
            ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, mainInventory ? Messages.MESSAGE_UPDATE_SUCCESS : Messages.MESSAGE_CREATE_SUCCESS);
            setVisible(false);
            setMainInventory(undefined);
         });
        
      }
   }

   useEffect(() => {

      if (mainInventory !== undefined && !submited) {
         setInventoryToRegister(mainInventory);
         setMainInventory(mainInventory);
      }

   }, [submited]);

   return (
      <>
         <PopUp title="Registro de inventario" visible={visible} setVisible={setVisible}>
            <FormGenerator form={form} value={inventoryToRegister} setValue={setInventoryToRegister} submit={handleInventory} buttonLabel="Crear"/>
         </PopUp>
      </>
   )
}
