'use client';

import { useContext, useEffect, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import Link from "next/link";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { inventoryContext } from "./inventoryContext";
import { useRouter } from "next/navigation";
import { InventoryService } from "@/app/services/inventoryService";
import InventoryModel from "@/app/models/inventory";
import { AuthUtil } from "@/app/utils/authUtil";
import { ConfirmationService } from "@/app/services/confirmationService";
import { Messages } from "@/app/constants/generalConstant";
import { ToastService } from "@/app/services/toastService";



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
    const {inventory, setInventory} = useContext(inventoryContext);
    const columns: ColumnMeta[]=[
       {field: 'name', header: 'Nombre'},
       {field: 'description', header: 'Descripción'},
       {field: 'category', header: 'Categoria'},
       {
        field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
            router.push("/pages/main/inventory/mainteance")
            setInventory(t)
        }
    },
    {
        field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
           ConfirmationService.showConfirmDelete(Messages.MESSAGE_BODY_DELETE + t, handleDelete(t));
        }
    }
    ];

    const handleDelete = (t: any) =>{
        const deleteFn = () => {
            inventoryService.delete(true, t.id).then((res)=> {
                ToastService.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_DELETE_SUCCESS);
                setInventory(undefined);
            });
        } 
        return deleteFn;
    }

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
    });
    useEffect(()=>{
        inventoryService.getAllByFilter(true, paginator, inventoryFilter).then(res =>{
            setInventorys(res);
        })
    }, [inventory])
    return(
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <div className="grid" style={{ width: '90%' }}>
            <div className="col-12 flex justify-content-start">
            <Link href={"/pages/main/inventory/mainteance"} >
                <Button onClick={() => setInventory(undefined)} ></Button>
            </Link>
            </div>
            <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={inventorys} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>
                </div>
           </div>
        </div>
    )
}


