'use client';
import { useContext, useEffect, useState } from "react";
import { atributeContext } from "./atributeContext";
import { AtributeService } from "@/app/services/atributeService";
import AtributesModel from "@/app/models/atribute";
import { productContext } from "../productContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { ConfirmationService } from "@/app/services/confirmationService";
import { Messages } from "@/app/constants/messageConstant";
import { ToastService } from "@/app/services/toastService";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import RegisterAtribute from "@/app/components/atributesComponentes/RegisterAtribute";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";

export default function AtributePage(){
    const {product, setProduct} = useContext(productContext);
    const [atributes, setAtributes] = useState<any[]>([]);
    const atributesService = new AtributeService();
    const [visible, setVisible] = useState<boolean>(false);
    const [atributesFilter, setAtributesFilter] = useState<AtributesModel>({
        name: "",
        value: "",
        product:{
            id: product?.id,
        }
    });
    const {atribute, setAtribute} = useContext(atributeContext);
    
    const columns: ColumnMeta[]=[
        {field: 'name', header: 'Nombre'},
        {field: 'value', header: 'Valor'},
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t:any) =>{
               setAtribute(t)
               setVisible(true)
            }
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) =>{
                ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
            }
        }
    ];

    const handleDelete = (t: any) =>{
        const deletFn = () =>{
            atributesService.delete(true, t.id).then((res) => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setAtribute(undefined);
                setVisible(false)
                setPaginator({loaded: false})
            });
        }
        return deletFn;
    };

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
            atributesService.getAllByFilter(true, paginator, atributesFilter).then(res =>{
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                setAtributes(res);
            })
            atributesService.countAllByFilter(true, atributesFilter).then(res=>{
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                setPaginator({totalRecords: res, loaded: true})
            })
        }
    }, [visible, paginator])

    const handleNewAtribute = () =>{
        setVisible(true);
        setAtribute(undefined)
    }

    return(
        <>
            <NavBar/>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <div className="grid" style={{ width: '90%' }}>
            <div className="col-12 flex justify-content-start">
            
            <Button onClick={handleNewAtribute} label="Nuevo" icon="pi pi-user-plus"></Button>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={atributes} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                </div>
           </div>
           {visible && <RegisterAtribute visible={visible} setVisible={setVisible}/>}
        </div>
       
        </>
    )
    
}