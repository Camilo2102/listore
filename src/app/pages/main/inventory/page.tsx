'use client';

import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { useRouter } from "next/navigation";
import { InventoryService } from "@/app/services/inventoryService";
import InventoryModel from "@/app/models/inventory";
import { AuthUtil } from "@/app/utils/authUtil";
import { ConfirmationService } from "@/app/services/confirmationService";
import { Messages } from "@/app/constants/messageConstant";
import { ToastService } from "@/app/services/toastService";
import { DataTableSelectEvent } from "primereact/datatable";
import RegisterInventory from "@/app/components/inventoryComponents/RegisterInventory";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import { mainContext } from "../mainContext";



export default function Inventory({ props }: { props: any }) {
    const router = useRouter();
    const inventoryService = new InventoryService();
    const [inventorys, setInventorys] = useState<any[]>([]);

    const [inventoryFilter, setInventoryFitler] = useState<InventoryModel>({
        category: "",
        company: {
            id: AuthUtil.getCredentials().company
        },
        description: "",
        name: "",
    });

    const { mainInventory, setMainInventory } = useContext(mainContext);

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
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                setMainInventory(t)
                setVisible(true)
            }
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
            }
        },

    ];


    const handleDelete = (t: any) => {
        const deleteFn = () => {
           
            inventoryService.delete(true, t.id).then((res) => {
                if (!ResErrorHandler.isValidRes(res)) {
                    return;
                }
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setMainInventory(undefined);
            });
        }
        return deleteFn;
    }

    // select product
    const handleSelection = (inventory: DataTableSelectEvent) => {
        setMainInventory(inventory.data);
        router.push("/pages/main/inventory/product")
    };

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });

    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {


        inventoryService.getAllByFilter(true, paginator, inventoryFilter).then(res => {
            if (!ResErrorHandler.isValidRes(res)) {
                return;
            }
            setInventorys(res);

        })
    }, [visible, paginator])

    const handleNewInventory = () => {
        setVisible(true);
        setMainInventory(undefined);
    }

    return (
        <>

            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>

                <div className="grid" style={{ width: '90%' }}>
                    <div className="col-12 flex justify-content-start">

                        <Button label="Nuevo" icon="pi pi-inbox" onClick={handleNewInventory} ></Button>

                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} onRowSelect={handleSelection} values={inventorys} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterInventory visible={visible} setVisible={setVisible} />}

            </div>
        </>
    )
}


