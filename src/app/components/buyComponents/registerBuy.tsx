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
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Button } from "primereact/button";
import TableGeneral from "../tableComponents/tableGeneral";

export default function RegisterBuy({ visible, setVisible }: { visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
    const { createAll } = useCRUDService(Endpoints.BUY);

    const [buys, setBuys] = useState<any[]>([]);

    const [newBuyVisible, setNewBuyVisible] = useState(false);

    const [controls, setControls] = useState<FormControl[]>(
        [
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
                fieldDependency: [
                    {field: "product", value: "id", toInput: true, enable: true}
                ]
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
                fieldDependency: [
                    {field: "unitaryValue", value: "unitaryValue", toInput: false, enable: false}
                ],
                filter: {
                    required: {
                        supplier: {
                        },
                    },
                    values: [

                    ]
                }
            },
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
    const { buy, setBuy } = useContext(buyContext);

    const [submited, setSubmited] = useState<boolean>(false);

    useEffect(() => {
        if (buy !== undefined && !submited) {
            setBuyToRegister(buy)
        }
    }, [submited])

    const columns: ColumnMeta[] = [
        {field: 'nameInventory', header: 'Inventario'},
        { field: 'nameProduct', header: 'Producto' },
        { field: 'amount', header: 'Cantidad' },
        { field: 'price', header: 'Precio' },
    ];

    const addBuy = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if(valid){
            const newBuy ={
                price: buyToRegister.price,
                amount: buyToRegister.amount,
                inventory: buyToRegister.inventory,
                product: buyToRegister.product,
                nameInventory: buyToRegister.nameinventory,
                nameProduct: buyToRegister.nameproduct
            };

            setBuys(prevBuy => [...prevBuy, newBuy]);

            setBuyToRegister({
                price: "",
                amount: "",
                inventory: "",
                product: ""
            });

            setNewBuyVisible(false);
        }
    }

    const loadBuys = () => {
        const modifiedBuys = buys.map((buy) =>{
            delete buy.inventory;
            delete buy.nameInventory;
            delete buy.nameProduct;

            buy.product = {
                id: buy.product.id
            }

            buy.user = {
                id: AuthUtil.getCredentials().user
            }

            return buy;
        })

        createAll(true, modifiedBuys).then(res =>{
            if(!ResErrorHandler.isValidRes(res)){
                return;
            }
            ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS)
            setVisible(false)
            setSubmited(false)
            setBuy(undefined)
        })
    }

   

    return (
        <>
            <PopUp title="Tabla de compras" visible={visible} setVisible={setVisible}>
                <div className="col-12 flex justify-content-start">
                    <Button label="Agregar" icon="pi pi-plus" onClick={ () => setNewBuyVisible(true)}></Button>
                </div>
                <TableGeneral useFilter={false} showRepotGenerator={false} columns={columns} staticValues={buys}></TableGeneral>
                <div className="col-12 flex justify-content-start">
                    <Button  label="Cargar compras" icon="pi pi-check" onClick={loadBuys}></Button>
                </div>
            </PopUp>
            <PopUp title="Nueva Compra" visible={newBuyVisible} setVisible={setNewBuyVisible}>
                <FormGenerator form={form} setValue={setBuyToRegister} submit={addBuy} value={buyToRegister} buttonLabel="Agregar"></FormGenerator>
            </PopUp>
        </>
    )

}