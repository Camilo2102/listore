"use client"
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import TitleTables from "@/app/components/titleTables";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { Messages } from "@/app/constants/messageConstant";
import { useMainContext } from "@/app/context/mainContext"
import { useHandleInput } from "@/app/hooks/handleInput";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import ColumnMeta from "@/app/interfaces/columnMeta";
import Paginator from "@/app/interfaces/paginator";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useProductContext } from "../../../../../context/productContext";
import FilterMeta from "@/app/interfaces/filterMeta";
import useConfirmationService from "@/app/hooks/services/useConfirmationService";
import { useTableContext } from "@/app/context/tableContext";
import RegisterSubProduct from "@/app/components/subProductComponents/registerSubProduct";
import { FormTypes } from "@/app/constants/formTypeConstant";
import useValidators from "@/app/models/formModels/validators";
import FormControl from "@/app/models/formModels/formControl";
import { useSubProductContext } from "@/app/context/subProductContext";




export default function subProductPage() {

    const { product, setProduct } = useProductContext();

    const { mainInventory, setMainInventory } = useMainContext();

    const kindOfProduct = useCRUDService(Endpoints.KINDOFPRODUCT);
    const characteristic = useCRUDService(Endpoints.CHARACTERISTIC);

    const {requiered, maxLenght, minLenght} = useValidators();

    const { reloadData, setReloadData } = useTableContext();

    const [controls, setControls] = useState<FormControl[]>([]);

    const {showConfirmDelete} = useConfirmationService();

    const [columns, setColumns] = useState<ColumnMeta[]>();

    const [values, setValues] = useState<any>();

    const handleDelete = (t: any) => {

        const deleteFn = () => {
            console.log(t);
                


            /*deleteData(true, t.id).then((res) => {
                if (!ResErrorHandler.isValidRes(res)) {
                    return;
                }
                ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setProduct(undefined);
                setReloadData(true);
            });*/
        }
        return deleteFn;
    }


    const [visible, setVisible] = useState<boolean>(false);

    const handleNewSubProduct = () => {
        generateNewControls(values);
        setSubProduct(undefined);
        setVisible(true)
    }

    const generateNewControls = (values: any) => {
        const generatedControls: any[] = [];
        values.forEach((value: any) => {
            generatedControls.push(generateControls(value.name))
        })
        generatedControls.push({
            field: "amount",
            value: "",
            description: "Cantidad",
            colSize: 12,
            type: FormTypes.NUMBER,
            validators: [requiered, maxLenght(60)],
            invalid: false,
            message: true,
            icon: "pi-user"
        })        
        setControls(generatedControls);
    }

    useDidMountEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    },[visible])


    const customMap = (subProduct: any) => {
        subProduct.characteristics.map((res: any) => {
            subProduct[res.name] = res.value;
        })

        return subProduct;

    }

    const subProductFilter: FilterMeta = {
        required: {
            product: {
                id: product?.id
            },
        },
        values: []
    }

    const pattern = useCRUDService(Endpoints.PATTERN);
    const attributes = useCRUDService(Endpoints.ATTRIBUTES);

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 10,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false,
    });

    const generateControls = (name: string): FormControl => {
        return {
            field: name,
            value: "",
            description: name,
            colSize: 12,
            type: FormTypes.INPUT,
            validators: [requiered, maxLenght(60),],
            invalid: false,
            message: true,
            icon: "pi-user"
        };
    }

    const {subProduct, setSubProduct} = useSubProductContext()

    useEffect(() => {
        pattern.getAllByFilter(true, paginator, {
            inventory: {
                id: mainInventory.id
            },
        }).then(res => {
            attributes.getAllByFilter(true, paginator, {
                pattern: {
                    id: res[0].id
                }
            }).then(res => {
                const generatedColumns: ColumnMeta[] = res.map(value => ({
                    field: value.name,
                    header: value.name,
                }));

                generatedColumns.push(
                    { field: "amount", header: "Cantidad" },
                    {
                        field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                            setSubProduct(t)
                            setVisible(true);
                        }

                    },
                    {
                        field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                            showConfirmDelete(Messages.MESSAGE_BODY_DELETE, handleDelete(t));
                        }
                    });

                generateNewControls(res);
                setValues(res);
                setColumns(generatedColumns);

            })
        })
    }, [])

    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Sub-Productos"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button label="Nuevo" icon="pi pi-inbox" onClick={handleNewSubProduct} ></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        {columns && <TableGeneral columns={columns} baseFilter={subProductFilter} endpoint={Endpoints.KINDOFPRODUCT} customMap={customMap}></TableGeneral>}
                    </div>
                </div>
                {visible && <RegisterSubProduct controls={controls} setControls={setControls} visible={visible} setVisible={setVisible} />}

            </div>
        </>
    )
}
