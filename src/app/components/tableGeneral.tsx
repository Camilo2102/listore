import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ColumnMeta from "../interfaces/columnMeta";
import { Button } from "primereact/button";

export default function TableGeneral({ values, columns, gridLines, stripedRows }: { values: any, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean }) {

  const valuesSetter = (e: any, field: string, values?: any, action?: (t: any) => void) => {
    if (values) {
      return (
        <>
          {values[e[field]]}
        </>
      )
    }

    if(field === "CRUDupdate") {
      return(
        <Button icon="pi pi-pencil" rounded outlined onClick={() => {action && action(e)}} />
      )
    }

    return (
      <div>
        {e[field]}
      </div>
    )
  }

  const generateColumns = () => {
    return columns.map(column => (
      <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable} body={(e) => valuesSetter(e, column.field, column.values, column.action)} />
    ));
  };

  return (
    <div style={{width: '100%'}}>
      <DataTable style={{borderRadius: '5px'}} showGridlines={gridLines} stripedRows={stripedRows} value={values} removableSort={columns.some(column => column.sortable)}>
        {generateColumns()}
      </DataTable>
    </div>
  );
}