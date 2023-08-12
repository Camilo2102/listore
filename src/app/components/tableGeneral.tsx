import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent, DataTableSelectEvent } from "primereact/datatable";
import ColumnMeta from "../interfaces/columnMeta";
import { Button } from "primereact/button";
import Paginator from "../interfaces/paginator";
import { useMemo, useRef } from "react";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import saveAs from "file-saver";


export default function TableGeneral({ values, paginator, setPaginator, columns, gridLines, stripedRows, onRowSelect }: { values: any, paginator: Paginator, setPaginator: (partialT: Partial<Paginator>) => void, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean, onRowSelect?: (e: DataTableSelectEvent ) => void }) {

  // console.log(columns, values);
  

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

    if(field === "sale") {
      return(
        <>
          <Button icon="pi pi-dollar" rounded outlined onClick={() => {action && action(e)}} />
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


  const usefulColumns = useMemo(() =>
    columns.filter(column => !(column.field === "supplier" || column.field === "CRUDupdate" || column.field === "CRUDdelete" || column.field === "buy" || column.field === "sale")),
    [columns]
  );

  const exportColumns = useMemo(() =>
    usefulColumns.map(column => column.header),
    [usefulColumns]
  );

  const exportValues = useMemo(() =>
    values.map((obj: { [x: string]: any }) => usefulColumns.map(item => obj[item.field])),
    [values, usefulColumns]
  );
  

  const exportPdf = () => {

    const doc = new jsPDF('p','mm','a4');
            
    autoTable(doc, {
      head: [exportColumns],
      body: exportValues,
    });
    
    doc.save('nombreDepende.pdf');
  }
  

  const exportToExcel = () => {

    const exportData = exportValues.map((subArray: any[]) => {
      const rowData: { [key: string]: any } = {};
      exportColumns.forEach((column, index) => {
        if (column.toLowerCase().includes('fecha')) { // El título de la columna debe tener la palabra fecha
          const dateArray = subArray[index] as number[];
          const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
          rowData[column] = dateObject;
        } else {
          rowData[column] = subArray[index] as any;
        }
      });
      return rowData;
    });
    
    const worksheet = XLSX.utils.json_to_sheet(exportData, {header: exportColumns});
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Depende');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'depende.xlsx');
  };


  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button type="button" icon="pi pi-file-excel" severity="info" rounded onClick={exportToExcel} data-pr-tooltip="XLS" style={{
          backgroundColor: '#4caf50', 
          borderColor: '#4caf50', 
        }}/>
      <Button type="button" icon="pi pi-file-pdf" severity="danger" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
    </div>
  );


  return (
    <div style={{width: '100%'}}>
      <DataTable lazy header={header} first={paginator.first} selectionMode="single" onRowSelect={onRowSelect} metaKeySelection={false} onPage={setPage} paginator rows={paginator.rows} totalRecords={paginator.totalRecords} style={{borderRadius: '5px'}} showGridlines={gridLines} stripedRows={stripedRows} value={values} removableSort={columns.some(column => column.sortable)}>
        {generateColumns()}
      </DataTable>
    </div>
  );
}