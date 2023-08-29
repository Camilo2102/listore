"use client"

import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent, DataTableSelectEvent } from "primereact/datatable";
import ColumnMeta from "../../interfaces/columnMeta";
import { Button } from "primereact/button";
import Paginator from "../../interfaces/paginator";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import saveAs from "file-saver";
import { useHandleInput } from "../../hooks/handleInput";
import useCRUDService from "../../hooks/services/useCRUDService";
import { ResErrorHandler } from "../../utils/resErrorHandler";
import { useTableContext } from "../../context/tableContext";
import TableFilter from "./tableFilter";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useCleanFilterInput } from "@/app/hooks/useFilterSelect";
import useDeepCopy from "@/app/hooks/useDeepCopy";
import { parseToFilter } from "@/app/utils/selectionUtil";
import { useLoading } from "@/app/context/loadingContext";


export default function TableGeneral({useFilter = true, columns, gridLines, stripedRows, onRowSelect, showRepotGenerator = true, endpoint, baseFilter, customMap, staticValues }: { useFilter?: boolean, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean, onRowSelect?: (e: DataTableSelectEvent) => void, showRepotGenerator?: boolean, endpoint?: string, baseFilter?: FilterMeta, customMap?: (value: any) => any, staticValues?: any[] }) {
  const [values, setValues] = useState<any[]>([]);
  const { reloadData, setReloadData, loadingData, setLoadingData } = useTableContext();

  const { getAllByFilter, countAllByFilter } = useCRUDService(endpoint as string);

  const [paginator, setPaginator] = useHandleInput<Paginator>({
    rows: 10,
    first: 0,
    page: 0,
    totalRecords: 0,
    pagesVisited: 0,
    loaded: false,
  });

  const [filter, setFilter] = useFilter ? useCleanFilterInput(useDeepCopy(baseFilter)) : useHandleInput({});

  const valuesSetter = (e: any, field: string, values?: any, action?: (t: any) => void, format?: (t: any) => void) => {
    if (values) {
      return (
        <>
          {values[e[field]]}
        </>
      )
    }


    if (field === "supplier") {
      return (
        <Button icon="pi pi-users" severity="secondary" rounded outlined onClick={() => { action && action(e) }} />
      )
    }

    if (field === "CRUDupdate") {
      return (
        <Button icon="pi pi-pencil" rounded outlined onClick={() => { action && action(e) }} />
      )
    }

    if (field === "CRUDdelete") {
      return (
        <>
          <Button icon="pi pi-trash" severity="danger" rounded outlined onClick={() => { action && action(e) }} />
        </>
      )
    }

    if (field === "buy") {
      return (
        <>
          <Button icon="pi pi-shopping-bag" rounded outlined onClick={() => { action && action(e) }} />
        </>
      )
    }

    if (field === "sale") {
      return (
        <>
          <Button icon="pi pi-dollar" rounded outlined onClick={() => { action && action(e) }} />
        </>
      )
    }

    if (field === "pattern") {
      return (
        <>
          <Button icon="pi pi-box" rounded outlined onClick={() => { action && action(e) }} />
        </>
      )
    }

    let value = e[field]

    if(format){
      value = format(value);
    }

    return (
      <div>
        {value}
      </div>
    )
  }

  const setPage = (e: DataTablePageEvent) => {
    setPaginator({ page: e.page, first: e.first, pagesVisited: ++paginator.pagesVisited, loaded: false });

  }

  const generateColumns = () => {
    return columns.map(column => (
      <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable} body={(e) => valuesSetter(e, column.field, column.values, column.action, column.format)} />
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

    const doc = new jsPDF('p', 'mm', 'a4');

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

    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: exportColumns });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Depende');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'depende.xlsx');
  };

  const handleFilterChange = (partialT: Partial<any>) => {
    setFilter(partialT);
    setPaginator({loaded: false})
  }


  const header = (
    <div className="flex align-items-center justify-content-between gap-2">
      {baseFilter && useFilter && <TableFilter filter={filter as FilterMeta} setFilter={handleFilterChange}></TableFilter>}
      {showRepotGenerator && <div className="flex justify-content-between gap-2">
        <Button type="button" icon="pi pi-file-excel" severity="info" rounded outlined onClick={exportToExcel} data-pr-tooltip="XLS"  />
        <Button type="button" icon="pi pi-file-pdf" severity="danger" rounded outlined onClick={exportPdf} data-pr-tooltip="PDF" />
      </div>}
    </div>
  );

  const getData = (filter: any) => {
    getAllByFilter(true, paginator, filter).then(res => {
      if (!ResErrorHandler.isValidRes(res)) {
        return;
      }

      countData(filter);

      let values: any[] = res;

      if (customMap) {
        values = res.map(customMap);
      }

      setValues(values);
    })
  }

  const countData = (filter: any) => {
    countAllByFilter(true, filter).then(res => {
      if (!ResErrorHandler.isValidRes(res)) {
        return;
      }
      setPaginator({ totalRecords: res, loaded: true })
      setReloadData(false);
      setLoadingData(false);
    })
  }

  useEffect(() => {
    if (endpoint && baseFilter && !paginator.loaded || reloadData) {
      setLoadingData(true);
      const parsedFilter = parseToFilter(filter);
      
      getData(parsedFilter);
    }
  }, [paginator, reloadData])


  return (
    <div style={{ width: '100%' }}>
      <DataTable  loading={loadingData} lazy header={header} first={paginator.first} selectionMode="single" onRowSelect={onRowSelect} metaKeySelection={false} onPage={setPage} paginator rows={paginator.rows} totalRecords={paginator.totalRecords} style={{ borderRadius: '5px' }} showGridlines={gridLines} stripedRows={true} value={staticValues ?? values} removableSort={columns.some(column => column.sortable)}>
        {generateColumns()}
      </DataTable>
    </div>
  );
}