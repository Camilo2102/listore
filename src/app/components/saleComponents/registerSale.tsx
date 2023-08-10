import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { productContext } from "@/app/pages/main/inventory/product/productContext";
import { ToastService } from "@/app/services/toastService";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import ProductModel from "@/app/models/product";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import User from "@/app/models/user";
import { AuthUtil } from "@/app/utils/authUtil";
import { SaleService } from "@/app/services/saleService";
import { saleContext } from "@/app/pages/main/inventory/product/sale/saleContext";

export default function RegisterSale({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const saleService = new SaleService();
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "unitaryValue",
                value: "",
                description: "Valor unitario",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "amount",
                value: "",
                description: "Cantidad",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
        ]
    );
    const [saleToRegister, form, setSaleToRegister, validateFormControls] = handleForm(controls);
    const {product, setProduct} = useContext(productContext);
    const {sale, setSale} = useContext(saleContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleBuy = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
           saleToRegister.user = new User();
           saleToRegister.user.id =  AuthUtil.getCredentials().user;
           saleToRegister.product = new ProductModel()
           saleToRegister.product.id = product.id
            saleService.create(true, saleToRegister).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastService.showSuccess(Messages.MESSAGE_SUCCESS, sale? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setSale(undefined)
                }
            )
        }
    }
    useEffect(() =>{
        if(sale !== undefined && !submited){
            setSaleToRegister(sale)
        }
    }, [submited])

    return (
        <>
            <PopUp title="Nueva Venta" visible= {visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setSaleToRegister} submit={handleBuy} value={saleToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    )

}