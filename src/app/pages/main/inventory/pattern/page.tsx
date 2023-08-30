'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import { useMainContext } from "@/app/context/mainContext";
import { patternContext } from "./patternContext";
import RegisterPattern from "@/app/components/patternComponents/registerPattern";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useNavigationContext } from "@/app/context/navigationContext";
import { DataTableSelectEvent } from "primereact/datatable";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";

export default function PatternPage(){

    const {goToRoute}= useNavigationContext();

    const { mainInventory, setMainInventory } = useMainContext();

    const {deleteData} = useCRUDService(Endpoints.PATTERN);

    const { reloadData, setReloadData } = useTableContext();

    const [visible, setVisible] = useState<boolean>(false);

    const patternFilter: FilterMeta = {
        required: {
            inventory:{
                id: mainInventory?.id,
            }
        },
        values: [
            { field: 'name', label: 'Nombre', value: '' },
        ]
    }

    const {pattern, setPattern} = useContext(patternContext);
    
    const columns: ColumnMeta[]=[
        {field: 'name', header: 'Nombre'},
    ];


    const handleNewPattern = () =>{
        setVisible(true);
        setPattern(undefined)
    }

    useDidMountEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])

    const handleSelection = (pattern: DataTableSelectEvent) => {
        setPattern(pattern.data);
        goToRoute("/pages/main/inventory/pattern/attribute")
    };

    return(
        <>
            <NavBar/>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="grid" style={{ width: '90%' }}>
                <TitleTables title="Modelos"></TitleTables>
                <div className="col-12 flex justify-content-start">
                    <Button onClick={handleNewPattern} label="Nuevo" icon="pi pi-user-plus"></Button>
                </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} baseFilter={patternFilter} endpoint={Endpoints.PATTERN} onRowSelect={handleSelection} showRepotGenerator={false} ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterPattern visible={visible} setVisible={setVisible}/>}
            </div>
       
        </>
    )
    
}