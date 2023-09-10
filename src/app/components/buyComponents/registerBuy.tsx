import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import { buyContext } from "@/app/pages/main/buy/buyContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Button } from "primereact/button";
import TableGeneral from "../tableComponents/tableGeneral";
import AuthUtil from "@/app/hooks/utils/authUtils";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { useToastContext } from "@/app/context/toastContext";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { defaultPaginator } from "@/app/constants/defaultPaginator";
import { useFormats } from "@/app/constants/formatConstants";

export default function RegisterBuy({ visible, setVisible }: { visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
    const { createAll } = useCRUDService(Endpoints.BUY);

    const { getCredentials } = AuthUtil();

    const [buys, setBuys] = useState<any[]>([]);

    const { showSuccess } = useToastContext();

    const pattern = useCRUDService(Endpoints.PATTERN);
    const attributes = useCRUDService(Endpoints.ATTRIBUTES);

    const [newBuyVisible, setNewBuyVisible] = useState(false);
    const { isValidRes } = ResErrorHandler();
    const { requiered, maxLenght, minLenght } = useValidators();

    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "inventory",
                value: "",
                description: "Inventario",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [requiered, maxLenght(200), minLenght(3)],
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
                            id: getCredentials().company
                        },
                    }
                },
                fieldDependency: [
                    { field: "product", value: "id", toInput: true, enable: true },
                    { field: "kindOfProduct", value: "id", toInput: false, enable: false },
                ]
            },
            {
                field: "product",
                value: "",
                description: "Producto",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [requiered, maxLenght(200), minLenght(3)],
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
                    { field: "kindOfProduct", value: "id", toInput: true, enable: true },
                    { field: "price", value: "unitaryValue", toInput: false, enable: true }
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
                field: "kindOfProduct",
                value: "",
                description: "Sub-Producto",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [requiered, maxLenght(200), minLenght(3)],
                invalid: false,
                message: true,
                columns: [
                    { field: 'amount', header: 'Cantidad' },
                ],
                icon: "pi-user",
                service: Endpoints.KINDOFPRODUCT,
                disabled: true,
                filter: {
                    required: {
                    },
                    values: [
                    ]
                },
                customMap: (subProduct: any) => {
                    subProduct.characteristics.map((res: any) => {
                        subProduct[res.name] = res.value;
                    })

                    subProduct.name = subProduct.product.name; 
            
                    return subProduct;
                },
                generateCustomColumns: (data: any) => {
                    return new Promise(async (resolve, reject) => {
                        try {

                            const patterFind = await pattern.getAllByFilter(true, defaultPaginator, {
                                inventory: {
                                    id: data.inventory.id
                                },
                            })

                            const attributesFind = await attributes.getAllByFilter(true, defaultPaginator, {
                                pattern: {
                                    id: patterFind[0].id
                                }
                            })

                            let generatedColumns: ColumnMeta[] = [];
                            generatedColumns.push({ field: "name", header: "Producto" });
                            const mappedAtr = attributesFind.map(value => ({
                                field: value.name,
                                header: value.name,
                            }));

                            generatedColumns = [...generatedColumns, ...mappedAtr];

                             
                            generatedColumns.push(
                            { field: "amount", header: "Cantidad" });

                            resolve(generatedColumns);
                        } catch (error) {
                            reject(new Error())
                        }

                    })
                },
            },
            {
                field: "price",
                value: "",
                description: "Precio",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [requiered, maxLenght(200), minLenght(1)],
                invalid: false,
                message: true,
                icon: "pi-user",
                disabled: true
            },
            {
                field: "amount",
                value: "",
                description: "Cantidad",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [requiered, maxLenght(200), minLenght(1)],
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


    const {formatDetail} = useFormats();

    const columns: ColumnMeta[] = [
        { field: 'nameInventory', header: 'Inventario' },
        { field: 'nameProduct', header: 'Producto' },
        { field: "details", header: 'Detalle', format: formatDetail},
        { field: 'amount', header: 'Cantidad' },
        { field: 'price', header: 'Precio' },
    ];

    const addBuy = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if (valid) {

            const subProductId = buyToRegister.kindOfProduct.id;
            delete buyToRegister.kindOfProduct.amount;
            delete buyToRegister.kindOfProduct.characteristics;
            delete buyToRegister.kindOfProduct.id;
            delete buyToRegister.kindOfProduct.name;
            delete buyToRegister.kindOfProduct.product;

            const newBuy = {
                price: buyToRegister.price,
                amount: buyToRegister.amount,
                inventory: buyToRegister.inventory,
                product: buyToRegister.product,
                nameInventory: buyToRegister.nameinventory,
                nameProduct: buyToRegister.nameproduct,
                details: buyToRegister.kindOfProduct,
                kindOfProduct: subProductId
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
        const modifiedBuys = buys.map((buy) => {
            delete buy.inventory;
            delete buy.nameInventory;
            delete buy.nameProduct;
            delete buy.product;
            delete buy.details;

            buy.user = {
                id: getCredentials().user
            }

            buy.kindOfProduct = {
                id: buy.kindOfProduct
            }

            return buy;
        })

        createAll(true, modifiedBuys).then(res => {
            if (!isValidRes(res)) {
                return;
            }
            showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS)
            setVisible(false)
            setSubmited(false)
            setBuy(undefined)
        })
    }


    return (
        <>
            <PopUp title="Tabla de compras" visible={visible} setVisible={setVisible}>
                <div className="col-12 flex justify-content-start">
                    <Button label="Agregar" icon="pi pi-plus" onClick={() => setNewBuyVisible(true)}></Button>
                </div>
                <TableGeneral useFilter={false} showRepotGenerator={false} columns={columns} staticValues={buys}></TableGeneral>
                <div className="col-12 flex justify-content-start">
                    <Button label="Cargar compras" icon="pi pi-check" onClick={loadBuys}></Button>
                </div>
            </PopUp>
            <PopUp title="Nueva Compra" visible={newBuyVisible} setVisible={setNewBuyVisible}>
                <FormGenerator form={form} setValue={setBuyToRegister} submit={addBuy} value={buyToRegister} buttonLabel="Agregar"></FormGenerator>
            </PopUp>
        </>
    )

}