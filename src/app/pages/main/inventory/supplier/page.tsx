'use client';
import SupplierModel from "@/app/models/supplier";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { supplierContext } from "./supplierContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { ConfirmationService } from "@/app/services/confirmationService";
import { ToastUtil } from "@/app/utils/toastUtil";
import { Messages } from "@/app/constants/messageConstant";
import Paginator from "@/app/interfaces/paginator";
import { useHandleInput } from "@/app/hooks/handleInput";
import { inventoryContext } from "../inventoryContext";
import Link from "next/link";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import popUp from '../../../../components/popUp';
import PopUp from "../../../../components/popUp";
import RegisterSupplier from "@/app/components/supplierComponents/RegisterSupplier";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { useMainContext } from "../../../../context/mainContext";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";

export default function Supplier(){
    const { mainInventory, setMainInventory } = useMainContext();

    const {deleteData} = useCRUDService(Endpoints.SUPPLIER);
    
    const { reloadData, setReloadData } = useTableContext();

    const supplierFilter: FilterMeta = {
        required: {
            inventory:{
                id: mainInventory?.id,
            }
        },
        values: [
            { field: 'name', label: 'Nombre', value: '' },
            {field: "description",label: "Descripcion", value: ""},
            {field: "address",label: "Dirección", value: ""},
            {field: "mail",label: "Correo", value: ""},
            {field: "phone",label: "Télefono", value: 0}
        ]
    }

    const {supplier, setSupplier} = useContext(supplierContext);
   
    const columns: ColumnMeta[]=[
        {field: 'name', header: 'Nombre'},
        {field: 'phone', header: 'Número telefónico'},
        {field: 'mail', header: 'Email'},
        {field: 'address', header: 'Dirección'},
        {field: 'description', header: 'Desripción'},
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t:any) =>{
               setSupplier(t)
               setVisible(true)
            }
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
               ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
            }
        },
    ];

    const handleDelete = (t:any) =>{
        const deletFn = () =>{
            deleteData(true, t.id).then((res) => {
                if(!ResErrorHandler.isValidRes(res)){
                    return;
                 }
                ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setSupplier(undefined);
                setReloadData(true);
            });
        }
        return deletFn;
    }

    
    const [visible, setVisible] = useState<boolean>(false);
    
    const handleNewSupplier = () =>{
        setVisible(true)
        setSupplier(undefined)
    }

    useEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])
   
    return(
        <>
     
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <div className="grid" style={{ width: '90%' }}>
            <TitleTables title="Proveedores"></TitleTables>
            <div className="col-12 flex justify-content-start">
                <Button onClick={handleNewSupplier} label="Nuevo" icon="pi pi-user-plus"></Button>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral baseFilter={supplierFilter} endpoint={Endpoints.SUPPLIER} columns={columns}  ></TableGeneral>
                </div>
           </div>
        </div>
        {visible && <RegisterSupplier visible={visible} setVisible={setVisible}/>}
        </>
    )

}