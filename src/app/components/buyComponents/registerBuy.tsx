import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { productContext } from "@/app/pages/main/inventory/product/productContext";
import { ToastUtil } from "@/app/utils/toastUtil";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import ProductModel from "@/app/models/product";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { buyContext } from "@/app/pages/main/buy/buyContext";
import User from "@/app/models/user";
import { AuthUtil } from "@/app/utils/authUtil";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";

export default function RegisterBuy({ visible, setVisible }: { visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
    const { create } = useCRUDService(Endpoints.BUY);

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
            {
                field: "inventory",
                value: "",
                description: "Inventario",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                columns: [
                    { field: 'name', header: 'Nombre' },
                    { field: 'description', header: 'Descripcion' },
                    { field: 'category', header: 'Categoria' },
                ],
                icon: "pi-user",
                service: Endpoints.INVENTORY,
                filter: {
                    values: [
                        { field: 'category', label: 'Categoría', value: '' },
                        { field: 'description', label: 'Descripción', value: '' },
                        { field: 'name', label: 'Nombre', value: '' }
                    ],
                    required: {
                        company: {
                            id: AuthUtil.getCredentials().company
                        },
                    }
                },
                fieldDependency: "product"
            },
            {
                field: "product",
                value: "",
                description: "Producto",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                columns: [
                    { field: 'name', header: 'Nombre' },
                    { field: 'description', header: 'Descripcion' },
                ],
                icon: "pi-user",
                service: Endpoints.PRODUCT,
                disabled: true,
                filter: {
                    required: {},
                    values: [

                    ]
                }
            },

        ]
    );
    const [buyToRegister, form, setBuyToRegister, validateFormControls] = handleForm(controls);
    const { buy, setBuy } = useContext(buyContext);

    const [submited, setSubmited] = useState<boolean>(false);
    const handleBuy = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if (valid) {
            buyToRegister.user = new User();
            buyToRegister.user.id = AuthUtil.getCredentials().user;
            buyToRegister.product = {
                id: buyToRegister.product
            };
            delete buyToRegister.inventory;
            delete buyToRegister.nameinventory;
            delete buyToRegister.nameproduct;
            
            create(true, buyToRegister).then(
                res => {
                    if (!ResErrorHandler.isValidRes(res)) {
                        return;
                    }
                    ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, buy ? Messages.MESSAGE_CREATE_SUCCESS : Messages.MESSAGE_UPDATE_SUCCESS)
                    setVisible(false)
                    setSubmited(false)
                    setBuy(undefined)
                }
            )
        }
    }
    useEffect(() => {
        if (buy !== undefined && !submited) {
            setBuyToRegister(buy)
        }
    }, [submited])

    return (
        <>
            <PopUp title="Nueva Compra" visible={visible} setVisible={setVisible}>
                <FormGenerator form={form} setValue={setBuyToRegister} submit={handleBuy} value={buyToRegister} buttonLabel="Crear"></FormGenerator>
            </PopUp>
        </>
    )

}