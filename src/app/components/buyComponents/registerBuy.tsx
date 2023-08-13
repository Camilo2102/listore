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
import { BuyService } from "@/app/services/buyService";
import { buyContext } from "@/app/pages/main/buy/buyContext";
import User from "@/app/models/user";
import { AuthUtil } from "@/app/utils/authUtil";

export default function RegisterBuy({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const buyService = new BuyService();
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "price",
                value: "",
                description: "Precio",
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
    const [buyToRegister, form, setBuyToRegister, validateFormControls] = handleForm(controls);
    const {product, setProduct} = useContext(productContext);
    const {buy, setBuy} = useContext(buyContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleBuy = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
           buyToRegister.user = new User();
           buyToRegister.user.id =  AuthUtil.getCredentials().user;
           buyToRegister.product = new ProductModel()
           buyToRegister.product.id = product.id
            buyService.create(true, buyToRegister).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastService.showSuccess(Messages.MESSAGE_SUCCESS, buy? Messages.MESSAGE_CREATE_SUCCESS: Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setBuy(undefined)
                }
            )
        }
    }
    useEffect(() =>{
        if(buy !== undefined && !submited){
            setBuyToRegister(buy)
        }
    }, [submited])

    return (
        <>
            <PopUp title="Nueva Compra" visible= {visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setBuyToRegister} submit={handleBuy} value={buyToRegister} buttonLabel="Crear"></FormGenerator>
           
            </PopUp>
        </>
    )

}