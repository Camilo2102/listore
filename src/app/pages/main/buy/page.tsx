'use client';
import { useContext, useEffect, useState } from "react";
import { productContext } from "../inventory/product/productContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { userContext } from "../user/userContext";
import BuyModel from "@/app/models/buy";
import { buyContext } from "./buyContext";
import BuyAtribute from "@/app/components/buyComponents/registerBuy";
import RegisterBuy from "@/app/components/buyComponents/registerBuy";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";

export default function BuyPage() {
    const { product, setProduct } = useContext(productContext);
    const { user, setUser } = useContext(userContext);

    const { reloadData, setReloadData } = useTableContext();

    const [visible, setVisible] = useState<boolean>(false);
    const buyFilter: FilterMeta = {
        values: [
            { field: "amount", label: "Cantidad", value: 0 },
            { field: "price", label: "Precio", value: 0 },
            { field: "buyDate", label: "Fecha compra", value: null}
        ],
        required: {
            product: {
                id: product?.id,
            },
            user: {
                id: user?.id,
            }
        }
    };
    const { buy, setBuy } = useContext(buyContext);

    const columns: ColumnMeta[] = [
        { field: 'buyDate', header: 'Fecha de compra' },
        { field: 'price', header: 'Precio' },
        { field: 'amount', header: 'Cantidad' },
    ];



    const handleNewBuy = () => {
        setVisible(true);
        setBuy(undefined)
    }

    useEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    },
        [visible])

    return (
        <>
            <NavBar />
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Compras"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewBuy} label="Nuevo" icon='pi pi-plus'></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={buyFilter} endpoint={Endpoints.BUY} ></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterBuy visible={visible} setVisible={setVisible} />}
            </div>
        </>
    )

}