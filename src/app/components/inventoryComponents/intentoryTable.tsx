import TableGeneral from "../tableComponents/tableGeneral";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/navigation";
import { Endpoints } from "@/app/constants/endpointsConstants";
import ColumnMeta from "@/app/interfaces/columnMeta";
import FilterMeta from "@/app/interfaces/filterMeta";

export default function InventoryTable({ columns, handleSelection, showReport = true }: { columns: ColumnMeta[], handleSelection: (inventory: any) => void, showReport?: boolean }) {
    const router = useRouter();

    const inventoryFilter: FilterMeta = {
        values: [
            { field: 'category', label: 'Categoría', value: '' },
            { field: 'description', label: 'Descripción', value: '' },
            { field: 'name', label: 'Nombre', value: '' }
          ],
        required: {
            company: {
                id: AuthUtil.getCredentials().company
            },
        }
    }



    return (
        <TableGeneral baseFilter={inventoryFilter} columns={columns} onRowSelect={handleSelection} endpoint={Endpoints.INVENTORY} showRepotGenerator={showReport}></TableGeneral>
    )
}