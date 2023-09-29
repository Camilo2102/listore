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
import { useHandleInput } from "../../hooks/useHandleInput";
import useCRUDService from "../../hooks/services/useCRUDService";
import { useTableContext } from "../../context/tableContext";
import TableFilter from "./tableFilter";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useCleanFilterInput } from "@/app/hooks/useFilterSelect";
import useDeepCopy from "@/app/hooks/useDeepCopy";

import { useLoading } from "@/app/context/loadingContext";
import ResErrorHandler from "@/app/hooks/utils/resErrorHandler";
import { parseToFilter } from "@/app/hooks/utils/selectionUtil";
import useExport from "@/app/hooks/useExport";


export default function TableGeneral({ useFilter = true, columns, gridLines, stripedRows, onRowSelect, showRepotGenerator = true, endpoint, baseFilter, customMap, staticValues, name = "exportacion" }: { useFilter?: boolean, columns: ColumnMeta[], gridLines?: boolean, stripedRows?: boolean, onRowSelect?: (e: DataTableSelectEvent) => void, showRepotGenerator?: boolean, endpoint?: string, baseFilter?: FilterMeta, customMap?: (value: any) => any, staticValues?: any[], name?: string }) {
  const [values, setValues] = useState<any[]>([]);
  const { reloadData, setReloadData, loadingData, setLoadingData } = useTableContext();
  const {isValidRes} = ResErrorHandler();
  const { getAllByFilter, countAllByFilter } = useCRUDService(endpoint as string);

  const [paginator, setPaginator] = useHandleInput<Paginator>({
    rows: 10,
    first: 0,
    page: 0,
    totalRecords: 0,
    pagesVisited: 0,
    loaded: false,
  });

  //eslint-disable-next-line
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


    if (format) {
      value = format(value);
    }

    return (
      <div>
        {value}
      </div>
    )
  }

  const setPage = (e: DataTablePageEvent) => {
    setPaginator({ rows: e.rows, page: e.page, first: e.first, pagesVisited: ++paginator.pagesVisited, loaded: false });

  }

  const generateColumns = () => {
    return columns.map(column => (
      <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable} body={(e) => valuesSetter(e, column.field, column.values, column.action, column.format)} />
    ));
  };

  const {exportToExcel, exportPdf} = useExport(columns, values, name);
  const handleFilterChange = (partialT: Partial<any>) => {
    setFilter(partialT);
    setPaginator({ loaded: false })
  }


  const header = (
    <div className="flex align-items-center justify-content-between gap-2">
      {baseFilter && useFilter && <TableFilter filter={filter as FilterMeta} setFilter={handleFilterChange}></TableFilter>}
      {showRepotGenerator && <div className="flex justify-content-between gap-2">
        <Button type="button" icon="pi pi-file-excel" severity="info" rounded outlined onClick={exportToExcel} data-pr-tooltip="XLS" />
        <Button type="button" icon="pi pi-file-pdf" severity="danger" rounded outlined onClick={exportPdf} data-pr-tooltip="PDF" />
      </div>}
    </div>
  );

  const getData = (filter: any) => {

    const adjustedFilter = { ...filter };

    // se itera sobre las claves del filtro
    for (const key in adjustedFilter) {
        if (adjustedFilter.hasOwnProperty(key) && adjustedFilter[key] === 0) {
            // Si el valor es 0, lo reemplazamos con null
            adjustedFilter[key] = null;
        }
    }

    setFilter(adjustedFilter)
    
  

    getAllByFilter(true, paginator, adjustedFilter).then(res => {
      if (!isValidRes(res)) {
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
      if (!isValidRes(res)) {
        return;
      }
      setPaginator({ totalRecords: res, loaded: true })
      setReloadData(false);
      setLoadingData(false);
    })
  }

  useEffect(() => {
    if (endpoint && (baseFilter) && !paginator.loaded || reloadData) {
      setLoadingData(true);
      const parsedFilter = parseToFilter(filter);

      getData(parsedFilter);

      

    }
    //eslint-disable-next-line
  }, [paginator, reloadData])


  return (
    <div style={{ width: '100%' }}>
      <DataTable scrollable scrollHeight="55vh" loading={loadingData} lazy header={header} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate={paginator.totalRecords > 10 ? "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" : ''} currentPageReportTemplate="{first} a {last} de {totalRecords}" first={paginator.first} selectionMode="single" onRowSelect={onRowSelect} metaKeySelection={false} onPage={setPage} paginator rows={paginator.rows} totalRecords={paginator.totalRecords} style={{ borderRadius: '5px' }} showGridlines={gridLines} stripedRows={true} value={staticValues ?? values} removableSort={columns.some(column => column.sortable)}>
        {generateColumns()}
      </DataTable>
    </div>
  );
}