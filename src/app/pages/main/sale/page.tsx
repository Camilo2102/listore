'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { SaleService } from "@/app/services/saleService";
import SaleModel from "@/app/models/sale";
import { saleContext } from "./saleContext";
import RegisterSale from "@/app/components/saleComponents/registerSale";
import { DateUtil } from "@/app/utils/dateUtil";
import { AuthUtil } from "@/app/utils/authUtil";
import { productContext } from "../inventory/product/productContext";
import { userContext } from "../user/userContext";

export default function SalePage() {
    const { product, setProduct } = useContext(productContext);
    const { user, setUser } = useContext(userContext);
    const [sales, setSales] = useState<any[]>([]);
    const saleService = new SaleService();
    const [visible, setVisible] = useState<boolean>(false);
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

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });

    useEffect(() => {
        if (!visible && !paginator.loaded) {
            saleService.getAllByFilter(true, paginator, saleFilter).then(res => {
                if (!ResErrorHandler.isValidRes(res)) {
                    return;
                }

                const copyRes = res.map((r: any) => {
                    
                    const nameProduct = r.product.name;
                    const totalValue = r.unitaryValue * r.amount;

                    return { ...r, saleDate: DateUtil.formatDate(r.saleDate), product: nameProduct, totalValue: totalValue  }
                })
           
                
                setSales(copyRes);
            })
            saleService.countAllByFilter(true, saleFilter).then(res => {
                if (!ResErrorHandler.isValidRes(res)) {
                    return;
                }
                setPaginator({ totalRecords: res, loaded: true })
            })
        }
    }, [visible, paginator])

    const handleNewSale = () => {
        setVisible(true);
        setSale(undefined)
    }

    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewSale} label="Nuevo" icon="pi pi-user-plus"></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} values={sales} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterSale visible={visible} setVisible={setVisible} />}
            </div>

        </>
    )

}