'use client';

import  ProductModel  from "@/app/models/product";
import { ProductService } from "@/app/services/productService";
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Messages } from "@/app/constants/messageConstant";
import { ToastService } from "@/app/services/toastService";
import { ConfirmationService } from "@/app/services/confirmationService";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import Link from "next/link";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { inventoryContext } from "../inventoryContext";
import RegisterProduct from "@/app/components/productComponents/RegisterProduct";
import { productContext } from "./productContext";
import { DataTableSelectEvent } from "primereact/datatable";
import { useRouter } from "next/navigation";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";


export default function ProductPage() {
    const router = useRouter();
    const { inventory, setInventory } = useContext(inventoryContext);
    const productService = new ProductService();
    const [products, setProducts] = useState<any[]>([]);

    const [productFilter, setProductFilter] = useState<ProductModel>({
        name: "",
        unitaryValue: 0,
        wholeSalePrice: 0,
        supplier: {},
        category: "",
        inventory: {
            id: inventory?.id
        },
        amount: 0

    });

    const { product, setProduct } = useContext(productContext);


    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre' },
        { field: 'unitaryValue', header: 'Valor Unitario' },
        { field: 'wholeSalePrice', header: 'Precio por Mayor' },
        { field: 'supplier', header: 'Proveedor' },
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
        },
        {
            field: 'buy', header: "Comprar", action: (t: any) => {
                
                setProduct(t);
                router.push("/pages/main/inventory/product/buy")

            }
        }
    ];

    const handleDelete = (t: any) => {

        const deleteFn = () => {
            productService.delete(true, t.id).then((res) => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setProduct(undefined);
                setVisible(false)
                setPaginator({ loaded: false })
            });
        }
        return deleteFn;
    }

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });

    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {

        if (!visible && !paginator.loaded) {
            productService.getAllByFilter(true, paginator, productFilter).then(res => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                setProducts(res);
            })
            productService.countAllByFilter(true, productFilter).then(res => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                setPaginator({ totalRecords: res, loaded: true })
            })
        }


    }, [visible, paginator])

    const handleNewProduct = () => {
        setVisible(true)
        setProduct(undefined)
    }

    const handleSelection = (product: DataTableSelectEvent) =>{
        setProduct(product.data);
        router.push("/pages/main/inventory/product/atribute")
    }


    return (
        <>
        
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <div className="col-12 flex justify-content-start">
                        <Button label="Nuevo" icon="pi pi-inbox" onClick={handleNewProduct} ></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} values={products} paginator={paginator} setPaginator={setPaginator} onRowSelect={handleSelection}></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterProduct visible={visible} setVisible={setVisible} />}

            </div>
        </>
    )
}