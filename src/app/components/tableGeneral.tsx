import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ColumnMeta from "../interfaces/columnMeta";

export default function TableGeneral({values, columns, gridLines, stripedRows}: {values: any, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean}){

    const valuesSetter = (e: any, field: string, values?: any) => {
      if(values) {        
        return(
          <>
          {values[e[field]]}
          </>
        )
      }
      return(
        <div>
          {e[field]}
        </div>
      )
    }

    const generateColumns = () => {
        return columns.map(column => (
          <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable} body={(e) => valuesSetter(e, column.field, column.values)}/>
        ));
      };
      
      return (
        <DataTable showGridlines={gridLines} stripedRows={stripedRows} value={values} removableSort={columns.some(column => column.sortable)}>
          {generateColumns()}
        </DataTable>
      );
}