import ColumnMeta from "@/app/interfaces/columnMeta";
import { inventoryContext } from "@/app/pages/main/inventory/inventoryContext";
import { InventoryService } from "@/app/services/inventoryService";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import TableGeneral from "../tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import PopUp from "../popUp";
import InventoryModel from "@/app/models/inventory";
import { DataTableSelectEvent } from "primereact/datatable";
import { AuthUtil } from "@/app/utils/authUtil";
import Paginator from "@/app/interfaces/paginator";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";


export default function SelectInventory({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {

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

    const { inventory, setInventory } = useContext(inventoryContext);

    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre' },
        { field: 'description', header: 'Descripción' },
        { field: 'category', header: 'Categoria' },


    ];


    const handleSelection = (inventory: DataTableSelectEvent) => {
        setInventory(inventory.data);
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

    useEffect(() => {
        inventoryService.getAllByFilter(true, paginator, inventoryFilter).then(res => {
            if(!ResErrorHandler.isValidRes(res)){
                return;
             }
            setInventorys(res);

        })
    }, [visible, paginator])

    return (
        <>

            <PopUp title="Selecione un inventario" visible={visible} setVisible={setVisible}>


                <TableGeneral columns={columns} onRowSelect={handleSelection} values={inventorys} paginator={paginator} setPaginator={setPaginator} ></TableGeneral>



            </PopUp>
        </>
    )
}


