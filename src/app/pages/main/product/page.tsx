'use client';

import { ProductModel } from "@/app/models/product";
import { ProductService } from "@/app/services/productService";
import { useContext, useEffect, useState } from "react";
import { productContext } from "./productContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Messages } from "@/app/constants/messageConstant";
import { ToastService } from "@/app/services/toastService";
import { ConfirmationService } from "@/app/services/confirmationService";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import Link from "next/link";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { mainContext } from "../mainContext";

export default function ProductPage({ props }: { props: any }) {
    const {inventoryMain, setInventoryMain} = useContext(mainContext);
    const productService = new ProductService();
    const [products, setProducts] = useState<any[]>([]);

    const [productFilter, setProductFilter] = useState<ProductModel>({
        name: "",
        unitaryValue: 0,
        wholeSalePrice: 0,
        supplier: {},
        category: "",
        inventory: {
            id: inventoryMain?.id
        },
        amount: 0

    });

    const {product, setProduct} = useContext(productContext);
    

    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre' },
        { field: 'unitaryValue', header: 'Valor Unitario' },
        { field: 'wholeSalePrice', header: 'Precio por Mayor' },
        { field: 'supplier', header: 'Proveedor' },
        { field: 'category', header: 'Categoria' },
        { field: 'amount', header: 'Cantidad' },
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                console.log(t);
            }
                
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
            
            }
        }
    ];

    const handleDelete = (t: any) =>{

        const deleteFn = () => {
         productService.delete(true, t.id).then((res)=> {
            ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
            setProduct(undefined);
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
    });

    useEffect(() => {
        productService.getAllByFilter(true, paginator, productFilter).then((res) => {
            setProducts(res);
        });
    },[product])
    
    function setInventory(undefined: undefined) {
        throw new Error("Function not implemented.");
    }

    return(
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <div className="grid" style={{ width: '90%' }}>
            <div className="col-12 flex justify-content-start">
            <Link href={"/pages/main/inventory/mainteance"} >
                <Button onClick={() => setInventory(undefined)} ></Button>
            </Link>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={products} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                </div>
           </div>
        </div>
    )
}