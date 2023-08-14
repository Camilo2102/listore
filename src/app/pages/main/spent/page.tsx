'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { userContext } from "../user/userContext";
import SpentModel from "@/app/models/spent";
import { spentContext } from "./spentContext";
import RegisterSpent from "@/app/components/spentComponets/registerSpent";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";

export default function SpentPage(){
    const {user, setUser} = useContext(userContext);

    const { reloadData, setReloadData } = useTableContext();


    const [visible, setVisible] = useState<boolean>(false);
    const [spentFilter, setSpentFilter] = useState<SpentModel>({
        spentDate: new Date(),
        price: 0,
        description: "",
        user: {
            id: user?.id,
        } 
    });
    const {spent, setSpent} = useContext(spentContext);
    
    const columns: ColumnMeta[]=[
        {field: 'spentDate', header: 'Fecha de gasto'},
        {field: 'price', header: 'Precio'},
        {field: 'description', header: 'Descripción'},
    ];


    const handleNewSpent = () =>{
        setVisible(true);
        setSpent(undefined)
    }

    useEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])

    return(
        <>
            <NavBar/>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="grid" style={{ width: '90%' }}>
                <TitleTables title="Gastos"></TitleTables>
                <div className="col-12 flex justify-content-start">
                    <Button onClick={handleNewSpent} label="Nuevo" icon="pi pi-user-plus"></Button>
                </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} baseFilter={spentFilter} endpoint={Endpoints.SPENT}  ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterSpent visible={visible} setVisible={setVisible}/>}
            </div>
       
        </>
    )
    
}