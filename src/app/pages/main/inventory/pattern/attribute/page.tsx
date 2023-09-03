'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useNavigationContext } from "@/app/context/navigationContext";
import { DataTableSelectEvent } from "primereact/datatable";
import { attributeContext } from "./attributeContext";
import { patternContext } from "../patternContext";
import RegisterAttribute from "@/app/components/atributesComponentes/RegisterAtribute";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";

export default function AttributePage(){

    const {goToRoute}= useNavigationContext();

    const { pattern, setPattern } = useContext(patternContext);

    const { reloadData, setReloadData } = useTableContext();

    const [visible, setVisible] = useState<boolean>(false);

    const attributeFilter: FilterMeta = {
        required: {
            pattern:{
                id: pattern?.id,
            }
        },
        values: [
            { field: 'name', label: 'Nombre', value: '' },
        ]
    }

    const {attribute, setAttribute} = useContext(attributeContext);
    
    const columns: ColumnMeta[]=[
        {field: 'name', header: 'Nombre'},
    ];


    const handleNewAttribute = () =>{
        setVisible(true);
        setAttribute(undefined)
    }

    useDidMountEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])

    return(
        <>
            <NavBar/>
            <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
            <div className="grid" style={{ width: '90%' }}>
                <TitleTables title="Atributos"></TitleTables>
                <div className="col-12 flex justify-content-start">
                    <Button onClick={handleNewAttribute} label="Nuevo" icon="pi pi-user-plus"></Button>
                </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} baseFilter={attributeFilter} endpoint={Endpoints.ATTRIBUTES} showRepotGenerator={false} ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterAttribute visible={visible} setVisible={setVisible}/>}
            </div>
       
        </>
    )
    
}