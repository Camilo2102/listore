import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ColumnMeta from "../interfaces/columnMeta";

export default function TableGeneral({values, columns, gridLines, stripedRows}: {values: any, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean}){

    const generateColumns = () => {
        return columns.map(column => (
          <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable}/>
        ));
      };
      
      return (
        <DataTable showGridlines={gridLines} stripedRows={stripedRows} value={values} removableSort={columns.some(column => column.sortable)}>
          {generateColumns()}
        </DataTable>
      );
}