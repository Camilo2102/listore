'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import SaleModel from "@/app/models/sale";
import { saleContext } from "./saleContext";
import RegisterSale from "@/app/components/saleComponents/registerSale";
import { DateUtil } from "@/app/utils/dateUtil";
import { AuthUtil } from "@/app/utils/authUtil";
import { productContext } from "../inventory/product/productContext";
import { userContext } from "../user/userContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";

export default function SalePage() {
    const { product, setProduct } = useContext(productContext);

    const [visible, setVisible] = useState<boolean>(false);
    
    const { reloadData, setReloadData } = useTableContext();

    const [saleFilter, setSaleFilter] = useState<SaleModel>({
        saleDate: DateUtil.removeDaysFromNow(1),
        unitaryValue: 0,
        amount: 0,
        product: {
            id: product?.id,
        },
        user: {
            id:  AuthUtil.getCredentials().user,
        }
    });
    const { sale, setSale } = useContext(saleContext);

    const columns: ColumnMeta[] = [
        { field: 'saleDate', header: 'Fecha de venta' },
        { field: 'product', header: 'Producto' },
        { field: 'unitaryValue', header: 'Valor unitario' },
        { field: 'amount', header: 'Cantidad' },
        { field: 'totalValue', header: 'Valor total' },
    ];


    const handleNewSale = () => {
        setVisible(true);
        setSale(undefined)
    }

    useEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])

    const customMap = (sales: any) => {
                    
        const nameProduct = sales.product.name;
        const totalValue = sales.unitaryValue * sales.amount;

        return { ...sales, saleDate: DateUtil.formatDate(sales.saleDate), product: nameProduct, totalValue: totalValue  }
    }

    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewSale} label="Nuevo" icon="pi pi-user-plus"></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={saleFilter} endpoint={Endpoints.SALE} customMap={customMap} ></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterSale visible={visible} setVisible={setVisible} />}
            </div>

        </>
    )

}