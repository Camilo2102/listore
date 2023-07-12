
import Container from "../container";
import FormGenerator from "../CRUDComponents/formGenerator";
import { FormEvent, useEffect, useState } from "react";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import InventoryModel from "@/app/models/inventory";
import { AuthUtil } from "@/app/utils/authUtil";
import { InventoryService } from "@/app/services/inventoryService";
import { useRouter } from "next/navigation";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/generalConstant";

export default function RegisterInventory({ inventorySelected }: { inventorySelected?: InventoryModel }) {
   const inventoryService = new InventoryService();
   const router = useRouter();

   const [submited, setSubmited] = useState<boolean>(false);
   const [inventoryToRegister, setInventoryToRegister] = useState<InventoryModel>({
      name: "",
      description: "",
      category: "",
      company: {
         id: ""
      }
   })
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
   const [inventory, form, setInventory, validateFormControls] = handleForm(controls);
   const handleInventory = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [formControls, valid] = validateFormControls();

      setControls([...formControls]);

      if (valid) {
         const { name, description, category } = inventory

         setInventoryToRegister({
            id: inventoryToRegister.id ?? undefined,
            name, description, category,
            company: { id: AuthUtil.getCredentials().company }
         })

         setSubmited(true);
      }
   }
   useEffect(() => {
   
      if(!submited && inventorySelected) {
         setInventoryToRegister(inventorySelected);
         setInventory(inventorySelected);
      }
      if(submited){
         inventoryService.create(true, inventoryToRegister).then(
            res => {
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, inventorySelected ? Messages.MESSAGE_UPDATE_SUCCESS : Messages.MESSAGE_CREATE_SUCCESS);
                router.push("/pages/main/inventory")
                setSubmited(false)
            }
        );
      }
  }, [submited])

   return (
      <Container title="Registro de inventario">
         <FormGenerator form={form} value={inventory} setValue={setInventory} submit={handleInventory}></FormGenerator>
      </Container>
   )
}