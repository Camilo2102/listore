'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import SaleModel from "@/app/models/sale";
import { saleContext } from "./saleContext";
import RegisterSale from "@/app/components/saleComponents/registerSale";
import { DateUtil } from "@/app/utils/dateUtil";
import { AuthUtil } from "@/app/utils/authUtil";
import { ProductContext, useProductContext } from "../../../context/productContext";
import { userContext } from "../user/userContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";
import { Formats } from "@/app/constants/formatConstants";
import { StorageService } from "@/app/services/storageService";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";

export default function SalePage() {
    const { product } = useProductContext();

    const [visible, setVisible] = useState<boolean>(false);
    
    const { setReloadData } = useTableContext();

    const role = StorageService.getValue("role");

    const saleFilter: FilterMeta = {
        values: [
            {field: "unitaryValue", label: "Valor Unitario", value: 0},
            {field: "amount", label: "Cantidad", value: 0},
            {field: "initialDate", label: "Fecha Inicial", value: null},
            {field: "finalDate", label: "Fecha Final", value: null},
        ],
        required: {
            product: {
                id: product?.id,
            },
            user: {
                id: role === 'M' || role === 'C' ? undefined : AuthUtil.getCredentials().user,
            }
        },
    }

    const { setSale } = useContext(saleContext);

    const columns: ColumnMeta[] = [
        { field: 'saleDate', header: 'Fecha de venta', format: Formats.formatDate },
        { field: 'product', header: 'Producto' },
        { field: 'unitaryValue', header: 'Valor unitario', format: Formats.formatCurrency },
        { field: 'amount', header: 'Cantidad' },
        { field: 'totalValue', header: 'Valor total', format: Formats.formatCurrency },
        ...(role === 'M' || role === 'C'
        ? [{ field: 'nameUser', header: 'Usuario'}]:[] 
    ),
    ];


    const handleNewSale = () => {
        setVisible(true);
        setSale(undefined)
    }

    useDidMountEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, [visible])

    const customMap = (sales: any) => {
        const nameUser = sales.user.name;
        const nameProduct = sales.product.name;
        const totalValue = sales.unitaryValue * sales.amount;
        return { ...sales, product: nameProduct, totalValue: totalValue, nameUser: nameUser  }
    }

   
    
    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Ventas"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewSale} label="Nuevo" icon='pi pi-plus'></Button>
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
