'use client';
import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import RegisterSpent from "@/app/components/spentComponets/registerSpent";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import PatternModel from "@/app/models/pattern";
import { useMainContext } from "@/app/context/mainContext";
import { patternContext } from "./patternContext";
import { ConfirmationService } from "@/app/services/confirmationService";
import { Messages } from "@/app/constants/messageConstant";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { ToastUtil } from "@/app/utils/toastUtil";
import RegisterPattern from "@/app/components/patternComponents/registerPattern";

export default function SpentPage(){
    const { mainInventory, setMainInventory } = useMainContext();

    const {deleteData} = useCRUDService(Endpoints.PATTERN);

    const { reloadData, setReloadData } = useTableContext();

    const [visible, setVisible] = useState<boolean>(false);

    const [patternFilter, setPatternFilter] = useState<PatternModel>({
        name: "",
        inventory:{
            id: mainInventory?.id,
        }
    });
    const {pattern, setPattern} = useContext(patternContext);
    
    const columns: ColumnMeta[]=[
        {field: 'name', header: 'Nombre'},
    ];


    const handleNewPattern = () =>{
        setVisible(true);
        setPattern(undefined)
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
                <TitleTables title="Modelos"></TitleTables>
                <div className="col-12 flex justify-content-start">
                    <Button onClick={handleNewPattern} label="Nuevo" icon="pi pi-user-plus"></Button>
                </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} baseFilter={patternFilter} endpoint={Endpoints.PATTERN}  ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterPattern visible={visible} setVisible={setVisible}/>}
            </div>
       
        </>
    )
    
}