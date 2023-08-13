import ColumnMeta from "@/app/interfaces/columnMeta";
import { inventoryContext } from "@/app/pages/main/inventory/inventoryContext";
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
import { useMainContext } from "@/app/context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import InventoryTable from "./intentoryTable";


export default function SelectInventory({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {

    const router = useRouter();
    const {getAllByFilter} = useCRUDService(Endpoints.INVENTORY);
    const [inventorys, setInventorys] = useState<any[]>([]);

    const [inventoryFilter, setInventoryFitler] = useState<InventoryModel>({
        category: "",
        company: {
            id: AuthUtil.getCredentials().company
        },
        description: "",
        name: "",
    });

    const { mainInventory, setMainInventory } = useMainContext();

    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre' },
        { field: 'description', header: 'Descripción' },
        { field: 'category', header: 'Categoria' },


    ];


    const handleSelection = (inventory: DataTableSelectEvent) => {
        setMainInventory(inventory.data);
        setVisible(false);

        router.push("/pages/main/inventory/product")
    };



    return (
        <>
            <PopUp title="Selecione un inventario" visible={visible} setVisible={setVisible}>
                <InventoryTable columns={columns} handleSelection={handleSelection} showReport={false}></InventoryTable>
            </PopUp>
        </>
    )
}


