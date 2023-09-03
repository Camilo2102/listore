'use client';

import ProductModel from "@/app/models/product";
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Messages } from "@/app/constants/messageConstant";
import { ToastUtil } from "@/app/utils/toastUtil";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { inventoryContext } from "../inventoryContext";
import RegisterProduct from "@/app/components/productComponents/RegisterProduct";
import { ProductContext, useProductContext } from "../../../../context/productContext";
import { DataTableSelectEvent } from "primereact/datatable";
import { useRouter } from "next/navigation";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { useMainContext } from "../../../../context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useNavigationContext } from "@/app/context/navigationContext";
import { useSupplier } from "../../../../context/supplierContext";
import useConfirmationService from "@/app/hooks/services/useConfirmationService";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";


export default function ProductPage() {
    const {goToRoute}= useNavigationContext();
    const { mainInventory, setMainInventory } = useMainContext();

    const { deleteData } = useCRUDService(Endpoints.PRODUCT);

    const { reloadData, setReloadData } = useTableContext();

    const { supplier, setSupplier } = useSupplier();

    const {showConfirmDelete} = useConfirmationService();



    const productFilter: FilterMeta = {
        required: {
            inventory: {
                id: supplier ? supplier.inventory.id : mainInventory?.id
            },
            supplier: {
                id: supplier ? supplier?.id : undefined
            },
        },
        values: [
            { field: 'name', label: 'Nombre', value: '' },
            { field: 'category', label: 'Categoria', value: '' },
            { field: 'unitaryValue', label: 'Precio unitario', value: 0 },
            { field: 'wholeSalePrice', label: 'Precio al por mayor', value: 0 },
            { field: "amount", label: "cantidad", value: 0}
        ]
    }

    const { product, setProduct } = useProductContext();


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
                showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
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

    useDidMountEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    },
        [visible])


    const customMap = (product: any) => {
        product.supplierName = product.supplier?.name;
        return product;
    }

    const handleSelection = (product: DataTableSelectEvent) => {
        setProduct(product.data);
        goToRoute("/pages/main/inventory/product/subProduct");
    }

    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Productos"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button label="Nuevo" icon="pi pi-inbox" onClick={handleNewProduct} ></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={productFilter} onRowSelect={handleSelection} endpoint={Endpoints.PRODUCT} customMap={customMap}></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterProduct visible={visible} setVisible={setVisible} />}

            </div>
        </>
    )
}