'use client';
import SupplierModel from "@/app/models/supplier";
import { SupplierService } from "@/app/services/supplierService";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { supplierContext } from "./supplierContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { ConfirmationService } from "@/app/services/confirmationService";
import { ToastService } from "@/app/services/toastService";
import { Messages } from "@/app/constants/messageConstant";
import Paginator from "@/app/interfaces/paginator";
import { useHandleInput } from "@/app/hooks/handleInput";
import { inventoryContext } from "../inventoryContext";
import Link from "next/link";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import popUp from '../../../../components/popUp';
import PopUp from "../../../../components/popUp";
import RegisterSupplier from "@/app/components/supplierComponents/RegisterSupplier";

export default function Supplier(){
    const {inventory, setInventory} = useContext(inventoryContext);
    const router = useRouter();
    const supplierService = new SupplierService();
    const [suppliers, setSuppliers] = useState<any[]>([]);

    const [supplierFilter, setSupplierFilter] = useState<SupplierModel>({
        name: "",
        description: "",
        address: "",
        phone: 0,
        mail: "",
        inventory:{
            id: inventory?.id,
        }
    });

    const {supplier, setSupplier} = useContext(supplierContext);
   
    const columns: ColumnMeta[]=[
        {field: 'name', header: 'Nombre'},
        {field: 'phone', header: 'Numero'},
        {field: 'mail', header: 'Email'},
        {field: 'address', header: 'Dirección'},
        {field: 'description', header: 'Desripción'},
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t:any) =>{
               setSupplier(t)
               setVisible(true)
            }
        }
    ];

    const handleDelet = (t:any) =>{
        const deletFn = () =>{
            supplierService.delete(true, t.id).then((res) => {
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setSupplier(undefined);
            });
        }
        return deletFn;
    }

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 1,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });
    
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() =>{
        if(!visible && !paginator.loaded){
            supplierService.getAllByFilter(true, paginator, supplierFilter).then(res =>{
                setSuppliers(res);
            })
            supplierService.countAllByFilter(true, supplierFilter).then(res=>{
                setPaginator({totalRecords: res, loaded: true})
            })
        }
    }, [visible, paginator])

    const handleNewSupplier = () =>{
        setVisible(true)
        setSupplier(undefined)
    }
   
    return(
        <>
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <div className="grid" style={{ width: '90%' }}>
            <div className="col-12 flex justify-content-start">
            
            <Button onClick={handleNewSupplier} ></Button>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={suppliers} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                </div>
           </div>
        </div>
        {visible && <RegisterSupplier visible={visible} setVisible={setVisible}/>}
        </>
    )

}