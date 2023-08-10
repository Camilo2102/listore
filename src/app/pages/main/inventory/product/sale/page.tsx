'use client';
import { useContext, useEffect, useState } from "react";
import { productContext } from "../productContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { userContext } from "../../../user/userContext";
import BuyAtribute from "@/app/components/buyComponents/registerBuy";
import { SaleService } from "@/app/services/saleService";
import SaleModel from "@/app/models/sale";
import { saleContext } from "./saleContext";
import RegisterSale from "@/app/components/saleComponents/registerSale";

export default function SalePage(){
    const {product, setProduct} = useContext(productContext);
    const {user, setUser} = useContext(userContext);
    const [sales, setSales] = useState<any[]>([]);
    const saleService = new SaleService();
    const [visible, setVisible] = useState<boolean>(false);
    const [saleFilter, setSaleFilter] = useState<SaleModel>({
        saleDate: new Date(),
        unitaryValue: 0,
        amount: 0,
        product:{
            id: product?.id,
        },
        user: {
            id: user?.id,
        } 
    });
    const {sale, setSale} = useContext(saleContext);
    
    const columns: ColumnMeta[]=[
        {field: 'saleDate', header: 'Fecha de venta'},
        {field: 'unitaryValue', header: 'Valor unitario'},
        {field: 'amount', header: 'Cantidad'},
    ];

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });

    useEffect(() =>{
        if(!visible && !paginator.loaded){
            saleService.getAllByFilter(true, paginator, saleFilter).then(res =>{
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                 setSales(res);
            })
            saleService.countAllByFilter(true, saleFilter).then(res=>{
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                setPaginator({totalRecords: res, loaded: true})
            })
        }
    }, [visible, paginator])

    const handleNewSale = () =>{
        setVisible(true);
        setSale(undefined)
    }

    return(
        <>
            <NavBar/>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="grid" style={{ width: '90%' }}>
            <div className="col-12 flex justify-content-start">
            
            <Button onClick={handleNewSale} label="Nuevo" icon="pi pi-user-plus"></Button>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={sales} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterSale visible={visible} setVisible={setVisible}/>}
            </div>
       
        </>
    )
    
}