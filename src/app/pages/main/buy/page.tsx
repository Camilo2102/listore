'use client';
import { useContext, useEffect, useState } from "react";
import { ProductContext, useProductContext } from "../../../context/productContext";
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
import { AuthUtil } from "@/app/utils/authUtil";
import { Formats } from "@/app/constants/formatConstants";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";

export default function BuyPage() {
    const { product, setProduct } = useProductContext();
    const { user, setUser } = useContext(userContext);

    const { reloadData, setReloadData } = useTableContext();

    const [visible, setVisible] = useState<boolean>(false);


    const buyFilter: FilterMeta ={
        values:[
            {field: "price", label: "Precio", value: 0},
            {field: "amount", label: "Cantidad", value: 0},
            {field: "initialDate", label: "Fecha Inicial", value: null},
            {field: "finalDate", label: "Fecha Final", value: null},
        ],
        required:{
            product: {
                id: product?.id,
            },
            user: {
                id: AuthUtil.getCredentials().user,
            }
        }

    }
    const {setBuy} = useContext(buyContext);
    
    const columns: ColumnMeta[]=[
        {field: 'buyDate', header: 'Fecha de compra', format: Formats.formatDate},
        {field: 'product', header: 'Producto' },
        {field: 'price', header: 'Precio', format: Formats.formatCurrency},
        {field: 'amount', header: 'Cantidad'},
        {field: 'totalValue', header: 'Valor total', format: Formats.formatCurrency },
    ];

    const handleNewBuy = () => {
        setVisible(true);
        setBuy(undefined)
    }

    useDidMountEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, [visible])

    const customMap = (buys: any) =>{
        const nameProduct = buys.product?.name;
        const totalValue = buys.price * buys.amount;
        return {...buys, product: nameProduct!, totalValue: totalValue}
    }


    return (
        <>
            <NavBar />
            <div className="flex justify-content-center align-items-center" style={{  minHeight: '100vh', overflowY: 'auto'  }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Compras"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewBuy} label="Nuevo" icon='pi pi-plus'></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={buyFilter} endpoint={Endpoints.BUY} customMap={customMap}></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterBuy visible={visible} setVisible={setVisible} />}
            </div>
        </>
    )

}