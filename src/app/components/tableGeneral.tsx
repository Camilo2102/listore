import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent, DataTableSelectEvent } from "primereact/datatable";
import ColumnMeta from "../interfaces/columnMeta";
import { Button } from "primereact/button";
import Paginator from "../interfaces/paginator";

export default function TableGeneral({ values, paginator, setPaginator, columns, gridLines, stripedRows, onRowSelect }: { values: any, paginator: Paginator, setPaginator: (partialT: Partial<Paginator>) => void, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean, onRowSelect?: (e: DataTableSelectEvent ) => void }) {

  const valuesSetter = (e: any, field: string, values?: any, action?: (t: any) => void) => {
    if (values) {
      return (
        <>
          {values[e[field]]}
        </>
      )
    }

    if(field === "supplier"){
      return(
        <Button icon="pi pi-users" severity="secondary" rounded outlined onClick={() => {action && action(e)}} />
      )
    }

    if(field === "CRUDupdate") {
      return(
        <Button icon="pi pi-pencil" rounded outlined onClick={() => {action && action(e)}} />
      )
    }

    if(field === "CRUDdelete") {
      return(
        <>
          <Button icon="pi pi-trash" severity="danger" rounded outlined onClick={() => {action && action(e)}} />
        </>
      )
    }

    if(field === "buy") {
      return(
        <>
          <Button icon="pi pi-shopping-bag" rounded outlined onClick={() => {action && action(e)}} />
        </>
      )
    }

    return (
      <div>
        {e[field]}
      </div>
    )
  }

  const setPage = (e:DataTablePageEvent) => {    
    setPaginator({page: e.page, first: e.first, pagesVisited: ++paginator.pagesVisited, loaded: false });
    
  }

  const generateColumns = () => {
    return columns.map(column => (
      <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable} body={(e) => valuesSetter(e, column.field, column.values, column.action)} />
    ));
  };

  return (
    <div style={{width: '100%'}}>
      <DataTable lazy first={paginator.first} selectionMode="single" onRowSelect={onRowSelect} metaKeySelection={false} onPage={setPage} paginator rows={paginator.rows} totalRecords={paginator.totalRecords} style={{borderRadius: '5px'}} showGridlines={gridLines} stripedRows={stripedRows} value={values} removableSort={columns.some(column => column.sortable)}>
        {generateColumns()}
      </DataTable>
    </div>
  );
}