"use client"
import PopUp from "@/app/components/popUp";
import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "@/app/constants/formTypeConstant";
import useValidators from "@/app/models/formModels/validators";
import { handleForm } from "@/app/hooks/handleForm";
import FormGenerator from "@/app/components/CRUDComponents/formGenerator";
import InventoryModel from "@/app/models/inventory";
import { Messages } from "@/app/constants/messageConstant";
import { FormEvent, useEffect, useState } from "react";
import { useProductContext } from "@/app/context/productContext";
import { useMainContext } from "@/app/context/mainContext";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { useToastContext } from "@/app/context/newToastContext";


export default function RegisterProduct({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
   const { mainInventory, setMainInventory } = useMainContext();
   const { create } = useCRUDService(Endpoints.PRODUCT);
   const {isValidRes} = ResErrorHandler();
   const {showSuccess} = useToastContext();
   const {requiered, maxLenght, minLenght} = useValidators();
   const [controls, setControls] = useState<FormControl[]>(
      [
         {
            field: "supplier",
            value: "",
            description: "Proveedores",
            colSize: 12,
            type: FormTypes.INPUTHELPER,
            validators: [requiered],
            invalid: false,
            message: true,
            columns: [
               { field: 'name', header: 'Nombre' },
               { field: 'description', header: 'Descripcion' },
               { field: 'phone', header: 'Telefono' },
            ],
            icon: "pi-user",
            service: Endpoints.SUPPLIER,
            filter: {
               required: {
                  inventory: {
                     id: mainInventory?.id,
                  }
               },
               values: [
                  { field: 'name', label: 'Nombre', value: '' },
                  { field: "description", label: "Descripcion", value: "" },
                  { field: "address", label: "Dirección", value: "" },
                  { field: "mail", label: "Correo", value: "" },
                  { field: "phone", label: "Télefono", value: 0 }
               ]
            },
         },
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
         {
            field: "unitaryValue",
            value: "",
            description: "Valor unitario",
            colSize: 12,
            type: FormTypes.NUMBER,
            validators: [requiered, maxLenght(200), minLenght(1)],
            invalid: false,
            message: true,
            icon: "pi-dollar"
         },
         {
            field: "wholeSalePrice",
            value: "",
            description: "Precio por mayor",
            colSize: 12,
            type: FormTypes.NUMBER,
            validators: [requiered, maxLenght(60), minLenght(1)],
            invalid: false,
            message: true,
            icon: "pi-dollar"
         },
         {
            field: "category",
            value: "",
            description: "Categoría",
            colSize: 12,
            type: FormTypes.INPUT,
            validators: [requiered, maxLenght(60), minLenght(3)],
            invalid: false,
            message: true,
            icon: "pi-bars"
         },
      ]
   );

   const [productToRegister, form, setProductToRegister, validateFormControls] = handleForm(controls);
   const [submited, setSubmited] = useState<boolean>(false);
   const { product, setProduct } = useProductContext();


   const handleProduct = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const [formControls, valid] = validateFormControls();

      setControls([...formControls]);

      if (valid) {
         productToRegister.inventory = {
            id: mainInventory.id
         };

         delete productToRegister.namesupplier;

         productToRegister.supplier = {
            id: productToRegister.supplier.id,
         }
         productToRegister.amount =0

         create(true, productToRegister).then(res => {
            if (!isValidRes(res)) {
               return;
            }
            showSuccess(Messages.MESSAGE_SUCCESS, inventorySelected ? Messages.MESSAGE_UPDATE_SUCCESS : Messages.MESSAGE_CREATE_SUCCESS);
            setVisible(false);
            setProduct(undefined);
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
            <FormGenerator form={form} value={productToRegister} setValue={setProductToRegister} submit={handleProduct} buttonLabel="Crear" />
         </PopUp>
      </>
   )
}
