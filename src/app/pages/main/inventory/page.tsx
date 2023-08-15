'use client';

import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { useRouter } from "next/navigation";
import InventoryModel from "@/app/models/inventory";
import { AuthUtil } from "@/app/utils/authUtil";
import { ConfirmationService } from "@/app/services/confirmationService";
import { Messages } from "@/app/constants/messageConstant";
import { ToastUtil } from "@/app/utils/toastUtil";
import { DataTableSelectEvent } from "primereact/datatable";
import RegisterInventory from "@/app/components/inventoryComponents/RegisterInventory";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { useMainContext } from "@/app/context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import InventoryTable from "@/app/components/inventoryComponents/intentoryTable";
import TitleTables from "@/app/components/titleTables";



export default function Inventory({ props }: { props: any }) {
    const router = useRouter();
    
    const {deleteData } = useCRUDService(Endpoints.INVENTORY);
    const { reloadData, setReloadData } = useTableContext();


    const { mainInventory, setMainInventory } = useMainContext();

    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre' },
        { field: 'description', header: 'Descripción' },
        { field: 'category', header: 'Categoria' },
        {
            field: 'supplier', header: 'Proveedores', action: (t: any) => {
                setMainInventory(t)
                router.push("/pages/main/inventory/supplier")
            }
        },
        {
            field: 'pattern', header: 'Modelos', action: (t: any) => {
                setMainInventory(t)
                router.push("/pages/main/inventory/pattern")
            }
        },
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                setMainInventory(t)
                setVisible(true)
            }
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t.name, handleDelete(t));
            }
        },

    ];

    const handleSelection = (inventory: DataTableSelectEvent) => {
        setMainInventory(inventory.data);
        router.push("/pages/main/inventory/product")
    };

    const handleDelete = (t: any) => {
        const deleteFn = () => {
            deleteData(true, t.id).then((res) => {
                if (!ResErrorHandler.isValidRes(res)) {
                    return;
                }
                ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setMainInventory(undefined);
                setReloadData(true);
            });
        }
        return deleteFn;
    }

    

    const [visible, setVisible] = useState<boolean>(false);

    const handleNewInventory = () => {
        setVisible(true);
        setMainInventory(undefined);
    }

    useEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])

    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Inventario"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button label="Nuevo" icon="pi pi-inbox" onClick={handleNewInventory} ></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <InventoryTable columns={columns} handleSelection={handleSelection}></InventoryTable>
                    </div>
                </div>
                {visible && <RegisterInventory visible={visible} setVisible={setVisible} />}

            </div>
        </>
    )
}


