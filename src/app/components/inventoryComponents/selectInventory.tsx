import ColumnMeta from "@/app/interfaces/columnMeta";
import { useState } from "react";
import PopUp from "../popUp";
import InventoryModel from "@/app/models/inventory";
import { DataTableSelectEvent } from "primereact/datatable";
import { useMainContext } from "@/app/context/mainContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import InventoryTable from "./intentoryTable";
import { useNavigationContext } from "@/app/context/navigationContext";
import AuthUtil from "@/app/hooks/utils/authUtils";


export default function SelectInventory({ inventorySelected, visible, setVisible }: { inventorySelected?: InventoryModel, visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {

    const {goToRoute}= useNavigationContext();
    const {getAllByFilter} = useCRUDService(Endpoints.INVENTORY);
    const [inventorys, setInventorys] = useState<any[]>([]);
    const {getCredentials} = AuthUtil();
    
    const [inventoryFilter, setInventoryFitler] = useState<InventoryModel>({
        category: "",
        company: {
            id: getCredentials().company
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

        goToRoute("/pages/main/inventory/product")
    };



    return (
        <>
            <PopUp title="Selecione un inventario" visible={visible} setVisible={setVisible}>
                <InventoryTable columns={columns} handleSelection={handleSelection} showReport={false}></InventoryTable>
            </PopUp>
        </>
    )
}


