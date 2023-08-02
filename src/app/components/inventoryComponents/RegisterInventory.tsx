
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormEvent, useContext, useEffect, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import InventoryModel from "@/app/models/inventory";
import { AuthUtil } from "@/app/utils/authUtil";
import { InventoryService } from "@/app/services/inventoryService";
import { useRouter } from "next/navigation";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import PopUp from "../popUp";
import { inventoryContext } from "@/app/pages/main/inventory/inventoryContext";
import Company from "@/app/models/company";

export default function RegisterInventory({visible, setVisible}:{visible:boolean, setVisible:(partialT: Partial<boolean>) => void}) {
   
   const inventoryService = new InventoryService();
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

   const [inventoryToRegister, form, setInventorToRegister, validateFormControls] = handleForm(controls);
   const {inventory, setInventory} = useContext(inventoryContext);
   const [submited, setSubmited] = useState<boolean>(false);

   const handleInventory = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [formControls, valid] = validateFormControls();

      setControls([...formControls]);

      if (valid) {
         inventoryToRegister.company = new Company();
         inventoryToRegister.company.id = AuthUtil.getCredentials().company
         setSubmited(true);
      }
   }
   
   useEffect(() => {
      if(submited){
         inventoryService.create(true, inventoryToRegister).then(
            res => {
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS);
                setSubmited(false)
                setVisible(false)
                setInventory(undefined)
            }
        );
      }
      if(inventory !== undefined){
         setInventorToRegister(inventory)
      }
  }, [submited])

   return (
      <PopUp visible={visible} setVisible= {setVisible} title="Registro de inventario">
         <FormGenerator form={form} value={inventoryToRegister} setValue={setInventorToRegister} submit={handleInventory}></FormGenerator>
      </PopUp>
   )
}