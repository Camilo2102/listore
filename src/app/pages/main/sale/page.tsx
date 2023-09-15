'use client';
import { useContext, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { saleContext } from "./saleContext";
import RegisterSale from "@/app/components/saleComponents/registerSale";
import { useProductContext } from "../../../context/productContext";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useFormats } from "@/app/constants/formatConstants";

import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import AuthUtil from "@/app/hooks/utils/authUtils";
import StorageService from "@/app/hooks/services/storageService";

export default function SalePage() {
    const { product } = useProductContext();

    const [visible, setVisible] = useState<boolean>(false);

    const { setReloadData } = useTableContext();
    const { getCredentials } = AuthUtil();
    const { getValue } = StorageService();

    const { formatDate, formatCurrency, formatDetail } = useFormats();


    const role = getValue("role");

    const saleFilter: FilterMeta = {
        values: [
            { field: "unitaryValue", label: "Valor Unitario", value: 0 },
            { field: "amount", label: "Cantidad", value: 0 },
            { field: "initialDate", label: "Fecha Inicial", value: null },
            { field: "finalDate", label: "Fecha Final", value: null },
        ],
        required: {
            user: {
                id: role === 'M' || role === 'C' ? undefined : getCredentials().user,
                company: {
                    id: getCredentials().company
                },
            },

        },
    }

    const { setSale } = useContext(saleContext);

    const columns: ColumnMeta[] = [
        { field: 'saleDate', header: 'Fecha de venta', format: formatDate },
        { field: 'product', header: 'Producto' },
        { field: "details", header: 'Detalle', format: formatDetail },
        { field: 'unitaryValue', header: 'Valor unitario', format: formatCurrency },
        { field: 'amount', header: 'Cantidad' },
        { field: 'totalValue', header: 'Valor total', format: formatCurrency },
        ...(role === 'M' || role === 'C'
            ? [{ field: 'nameUser', header: 'Usuario' }] : []
        ),
    ];


    const handleNewSale = () => {
        setVisible(true);
        setSale(undefined)
    }

    useDidMountEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    }, [visible])



    const customMap = (sales: any) => {

        const nameUser = sales.user.name;
        const nameProduct = sales.product.name;
        const details: any = {};
        sales.kindOfProduct.characteristics.forEach((res: any) => {
            details[res.name] = res.value;
        })
        const totalValue = sales.unitaryValue * sales.amount;
        return { ...sales, product: nameProduct, totalValue: totalValue, nameUser: nameUser, details: details }
    }



    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
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
