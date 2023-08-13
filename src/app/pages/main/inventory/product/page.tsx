'use client';

import ProductModel from "@/app/models/product";
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Messages } from "@/app/constants/messageConstant";
import { ToastUtil } from "@/app/utils/toastUtil";
import { ConfirmationService } from "@/app/services/confirmationService";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { inventoryContext } from "../inventoryContext";
import RegisterProduct from "@/app/components/productComponents/RegisterProduct";
import { productContext } from "./productContext";
import { DataTableSelectEvent } from "primereact/datatable";
import { useRouter } from "next/navigation";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { useMainContext } from "../../../../context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";


export default function ProductPage() {
    const router = useRouter();
    const { mainInventory, setMainInventory } = useMainContext();
    
    const {deleteData} = useCRUDService(Endpoints.PRODUCT);

    const { reloadData, setReloadData } = useTableContext();
    
    const [productFilter, setProductFilter] = useState<ProductModel>({
        name: "",
        unitaryValue: 0,
        wholeSalePrice: 0,
        supplier: {},
        category: "",
        inventory: {
            id: mainInventory?.id
        },
        amount: 0

    });

    const { product, setProduct } = useContext(productContext);


    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre' },
        { field: 'unitaryValue', header: 'Valor Unitario' },
        { field: 'wholeSalePrice', header: 'Precio por Mayor' },
        { field: 'supplierName', header: 'Proveedor' },
        { field: 'category', header: 'Categoria' },
        { field: 'amount', header: 'Cantidad' },
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                setProduct(t);
                setVisible(true);
            }

        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));

            }
        }
    ];

    const handleDelete = (t: any) => {

        const deleteFn = () => {
            deleteData(true, t.id).then((res) => {
                if (!ResErrorHandler.isValidRes(res)) {
                    return;
                }
                ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setProduct(undefined);
                setReloadData(true);
            });
        }
        return deleteFn;
    }


    const [visible, setVisible] = useState<boolean>(false);

    const handleNewProduct = () => {
        setVisible(true)
        setProduct(undefined)
    }

    const handleSelection = (product: DataTableSelectEvent) => {
        setProduct(product.data);
        router.push("/pages/main/inventory/product/atribute")
    }

    useEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])


    const customMap = (product: any) => {
        product.supplierName = product.supplier?.name;
        return product;
    } 

    return (
        <>

            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <div className="col-12 flex justify-content-start">
                        <Button label="Nuevo" icon="pi pi-inbox" onClick={handleNewProduct} ></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={productFilter} endpoint={Endpoints.PRODUCT} customMap={customMap} onRowSelect={handleSelection}></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterProduct visible={visible} setVisible={setVisible} />}

            </div>
        </>
    )
}