import TableGeneral from "../tableGeneral";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/navigation";
import { Endpoints } from "@/app/constants/endpointsConstants";
import ColumnMeta from "@/app/interfaces/columnMeta";

export default function InventoryTable({columns, handleSelection, showReport = true}: {columns: ColumnMeta[], handleSelection: (inventory: any) => void, showReport?: boolean}){
    const router = useRouter();

    const inventoryFilter = {
        category: "",
        company: {
            id: AuthUtil.getCredentials().company
        },
        description: "",
        name: "",
    }



    return(
        <TableGeneral baseFilter={inventoryFilter} columns={columns} onRowSelect={handleSelection} endpoint={Endpoints.INVENTORY} showRepotGenerator={showReport}></TableGeneral>
    )
}