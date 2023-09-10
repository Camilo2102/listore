import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import useValidators from "@/app/models/formModels/validators";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import { saleContext } from "@/app/pages/main/sale/saleContext";
import { Button } from "primereact/button";
import TableGeneral from "../tableComponents/tableGeneral";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import AuthUtil from "@/app/hooks/utils/authUtils";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";

import { useToastContext } from "@/app/context/toastContext";

export default function RegisterSale({ visible, setVisible }: { visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {
    const { createAll } = useCRUDService(Endpoints.SALE);

    const [sales, setSales] = useState<any[]>([]);

    const [newSaleVisible, setNewSaleVisible] = useState(false);

    const {getCredentials} = AuthUtil();
    const {isValidRes} = ResErrorHandler();
    const {showSuccess} = useToastContext();

    const {requiered, maxLenght, minLenght} = useValidators();
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
                    {field: "product", value: "id", toInput: true, enable: true}
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
                    {field: "unitaryValue", value: "unitaryValue", toInput: false, enable: false}
                ],
                filter: {
                    required: {
                        supplier: {
                        },
                    },
                    values: [
                    ]                    
                },
            },
            {
                field: "unitaryValue",
                value: "",
                description: "Valor unitario",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [requiered, maxLenght(200), minLenght(3)],
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
                validators: [requiered, maxLenght(7), minLenght(1)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
        ]
    );


    const [saleToRegister, form, setSaleToRegister, validateFormControls] = handleForm(controls);

    const { sale, setSale } = useContext(saleContext);

    const [submited, setSubmited] = useState<boolean>(false);

    useEffect(() => {
        if (sale !== undefined && !submited) {
            setSaleToRegister(sale)
        }
    }, [submited])


    const columns: ColumnMeta[] = [
        { field: 'nameInventory', header: 'Inventario' },
        { field: 'nameProduct', header: 'Producto' },
        { field: 'amount', header: 'Cantidad' },
        { field: 'unitaryValue', header: 'Valor unitario' },

    ];

    const addSale = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);
        if (valid) {
            const newSale = {
                unitaryValue: saleToRegister.unitaryValue,
                amount: saleToRegister.amount,
                inventory: saleToRegister.inventory,
                product: saleToRegister.product,
                nameInventory: saleToRegister.nameinventory,
                nameProduct: saleToRegister.nameproduct,
            };


            setSales(prevSales => [...prevSales, newSale]);

            setSaleToRegister({
                unitaryValue: "",
                amount: "",
                inventory: "",
                product: "",
            });

            setNewSaleVisible(false);
        }

    }

    const loadSales = () => {
        const modifiedSales = sales.map((sale) => {

            delete sale.inventory;
            delete sale.nameInventory;
            delete sale.nameProduct;


            sale.product = {
                id: sale.product.id
            }

            sale.user = {
                id: getCredentials().user
            }
            return sale;
        })

        createAll(true, modifiedSales).then(res => {
            if (!isValidRes(res)) {
                return;
            }
            showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS)
            setVisible(false)
            setSubmited(false)
            setSale(undefined)
        })


    }

    return (
        <>
            <PopUp title="Tabla de ventas" visible={visible} setVisible={setVisible}>
                <div className="col-12 flex justify-content-start">
                    <Button label="Agregar" icon="pi pi-plus" onClick={() => setNewSaleVisible(true)} ></Button>
                </div>
                <TableGeneral useFilter={false} showRepotGenerator={false} columns={columns} staticValues={sales} ></TableGeneral>

                <div className="col-12 flex justify-content-start">
                    <Button label="Cargar ventas" icon="pi pi-check" onClick={loadSales}   ></Button>
                </div>
            </PopUp>
            <PopUp title="Nueva Venta" visible={newSaleVisible} setVisible={setNewSaleVisible}>
                <FormGenerator form={form} setValue={setSaleToRegister} submit={addSale} value={saleToRegister} buttonLabel="Agregar"></FormGenerator>
            </PopUp>
        </>
    )

}
