'use client';
import { useState } from "react";
import { useSupplier } from "../../../../context/supplierContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Messages } from "@/app/constants/messageConstant";

import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import RegisterSupplier from "@/app/components/supplierComponents/RegisterSupplier";

import { useMainContext } from "../../../../context/mainContext";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useNavigationContext } from "@/app/context/navigationContext";
import { DataTableSelectEvent } from "primereact/datatable";
import useConfirmationService from "@/app/hooks/services/useConfirmationService";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";
import { useToastContext } from "@/app/context/newToastContext";


export default function SupplierPage(){
    const { mainInventory, setMainInventory } = useMainContext();

    const {deleteData} = useCRUDService(Endpoints.SUPPLIER);

    const {goToRoute} = useNavigationContext();
    
    const { reloadData, setReloadData } = useTableContext();

    const {showConfirmDelete} = useConfirmationService();

    const {isValidRes} = ResErrorHandler();
    const {showSuccess} = useToastContext();


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

    const {supplier, setSupplier} = useSupplier();
   
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
               showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
            }
        },
    ];

    const handleDelete = (t:any) =>{
        const deletFn = () =>{
            deleteData(true, t.id).then((res) => {
                if(!isValidRes(res)){
                    return;
                 }
                showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setSupplier(undefined);
                setReloadData(true);
            });
        }
        return deletFn;
    }

    const handleSupplierSelect = (supplier: DataTableSelectEvent) => {
        setSupplier(supplier.data);
        goToRoute("/pages/main/inventory/product");
    }

    
    const [visible, setVisible] = useState<boolean>(false);
    
    const handleNewSupplier = () =>{
        setVisible(true)
        setSupplier(undefined)
    }

    useDidMountEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])
   
    return(
        <>
     
        <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
           <div className="grid" style={{ width: '90%' }}>
            <TitleTables title="Proveedores"></TitleTables>
            <div className="col-12 flex justify-content-start">
                <Button onClick={handleNewSupplier} label="Nuevo" icon="pi pi-user-plus"></Button>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral baseFilter={supplierFilter} endpoint={Endpoints.SUPPLIER} columns={columns} onRowSelect={handleSupplierSelect} ></TableGeneral>
                </div>
           </div>
        </div>
        {visible && <RegisterSupplier visible={visible} setVisible={setVisible}/>}
        </>
    )

}