'use client';
import { useContext, useEffect, useState } from "react";
import { productContext } from "../inventory/product/productContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { userContext } from "../user/userContext";
import BuyModel from "@/app/models/buy";
import { buyContext } from "./buyContext";
import BuyAtribute from "@/app/components/buyComponents/registerBuy";
import RegisterBuy from "@/app/components/buyComponents/registerBuy";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";

export default function BuyPage(){
    const {product, setProduct} = useContext(productContext);
    const {user, setUser} = useContext(userContext);
    const [buys, setBuys] = useState<any[]>([]);

    const {getAllByFilter, countAllByFilter} = useCRUDService(Endpoints.BUY);

    const [visible, setVisible] = useState<boolean>(false);
    const [buyFilter, setBuyFilter] = useState<BuyModel>({
        buyDate: new Date(),
        price: 0,
        amount: 0,
        product:{
            id: product?.id,
        },
        user: {
            id: user?.id,
        } 
    });
    const {buy, setBuy} = useContext(buyContext);
    
    const columns: ColumnMeta[]=[
        {field: 'buyDate', header: 'Fecha de compra'},
        {field: 'price', header: 'Precio'},
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
            getAllByFilter(true, paginator, buyFilter).then(res =>{
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                 setBuys(res);
            })
            countAllByFilter(true, buyFilter).then(res=>{
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                setPaginator({totalRecords: res, loaded: true})
            })
        }
    }, [visible, paginator])

    const handleNewBuy = () =>{
        setVisible(true);
        setBuy(undefined)
    }

    return(
        <>
            <NavBar/>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="grid" style={{ width: '90%' }}>
            <div className="col-12 flex justify-content-start">
            
            <Button onClick={handleNewBuy} label="Nuevo" icon="pi pi-user-plus"></Button>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={buys} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterBuy visible={visible} setVisible={setVisible}/>}
            </div>
       
        </>
    )
    
}