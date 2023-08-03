"use client"
import PopUp from "@/app/components/popUp";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import Validators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import FormGenerator from "@/app/components/CRUDComponents/formGenerator";
import InventoryModel from "@/app/models/inventory";

import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductService } from "@/app/services/productService";
import { inventoryContext } from "@/app/pages/main/inventory/inventoryContext";
import { productContext } from "@/app/pages/main/inventory/product/productContext";


export default function RegisterInventory({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
   const productService = new ProductService();
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
            field: "unitaryValue",
            value: "",
            description: "Valor unitario",
            colSize: 12,
            type: FormTypes.NUMBER,
            validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
            invalid: false,
            message: true,
            icon: "pi-user"
         },
         {
            field: "wholeSalePrice",
            value: "",
            description: "Precio por mayor",
            colSize: 12,
            type: FormTypes.NUMBER,
            validators: [Validators.requiered, Validators.maxLenght(60), Validators.minLenght(3)],
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
         },
         {
            field: "amount",
            value: "",
            description: "Cantidad",
            colSize: 12,
            type: FormTypes.NUMBER,
            validators: [Validators.requiered, Validators.maxLenght(60), Validators.minLenght(3)],
            invalid: false,
            message: true,
            icon: "pi-user"
         }
      ]
   );

   const [productToRegister, form, setProductToRegister, validateFormControls] = handleForm(controls);
   const [submited, setSubmited] = useState<boolean>(false);
   const { inventory, setInventory } = useContext(inventoryContext);
   const { product, setProduct } = useContext(productContext);
  

   const handleProduct = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [formControls, valid] = validateFormControls();

      setControls([...formControls]);

      if (valid) {
         const { name, unitaryValue, wholeSalePrice, category, amount } = productToRegister;

         productService.create(true, {
            name,
            unitaryValue,
            wholeSalePrice,
            category,
            amount,
            inventory: { id: inventory.id }
         }).then(res => {
            ToastService.showSuccess(Messages.MESSAGE_SUCCESS, inventorySelected ? Messages.MESSAGE_UPDATE_SUCCESS : Messages.MESSAGE_CREATE_SUCCESS);
            setVisible(false);
            // setInventory(undefined)
         });

      }
   }

   useEffect(() => {
      if (product !== undefined && !submited) {
         setProductToRegister(product);
      }
   }, [product, submited]);

   return (
      <>
         <PopUp title="Registro de producto" visible={visible} setVisible={setVisible}>
            <FormGenerator form={form} value={productToRegister} setValue={setProductToRegister} submit={handleProduct} />
         </PopUp>
      </>
   )
}
