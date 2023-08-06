"use client"
import PopUp from "@/app/components/popUp";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import FormGenerator from "@/app/components/CRUDComponents/formGenerator";
import InventoryModel from "@/app/models/inventory";
import { InventoryService } from "@/app/services/inventoryService";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import { AuthUtil } from "@/app/utils/authUtil";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { inventoryContext } from "@/app/pages/main/inventory/inventoryContext";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";


export default function RegisterInventory({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
   const inventoryService = new InventoryService();
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
   const { inventory, setInventory } = useContext(inventoryContext);
   const handleInventory = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [formControls, valid] = validateFormControls();

      setControls([...formControls]);

      if (valid) {
         const { name, description, category } = inventoryToRegister;

         inventoryService.create(true, {
            id: inventory?.id,
            name,
            description,
            category,
            company: { id: AuthUtil.getCredentials().company }
         }).then(res => {
            if(!ResErrorHandler.isValidRes(res)){
               return;
            }
            ToastService.showSuccess(Messages.MESSAGE_SUCCESS, inventory ? Messages.MESSAGE_UPDATE_SUCCESS : Messages.MESSAGE_CREATE_SUCCESS);
            setVisible(false);
            setInventory(undefined);
         });
        
      }
   }

   useEffect(() => {

      if (inventory !== undefined && !submited) {
         setInventoryToRegister(inventory);
         setInventory(inventory);
      }

   }, [submited]);

   return (
      <>
         <PopUp title="Registro de inventario" visible={visible} setVisible={setVisible}>
            <FormGenerator form={form} value={inventoryToRegister} setValue={setInventoryToRegister} submit={handleInventory} />
         </PopUp>
      </>
   )
}
