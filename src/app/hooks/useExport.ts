import {useMemo} from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import ColumnMeta from "@/app/interfaces/columnMeta";
import {useFormats} from "@/app/constants/formatConstants";

export default function useExport (columns: ColumnMeta[], values: any[], name: string) {
    const usefulColumns = useMemo(() =>
            columns.filter(column => !(column.field === "supplier" || column.field === "CRUDupdate" || column.field === "CRUDdelete" || column.field === "buy" || column.field === "sale" || column.field === "pattern")),
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

        doc.save(`${name}.pdf`);
    }


    const exportToExcel = () => {

        const exportData = exportValues.map((subArray: any[]) => {
            const rowData: { [key: string]: any } = {};
            exportColumns.forEach((column, index) => {
                if (column.toLowerCase().includes('fecha') || column.toLowerCase().includes('date')) { // El título de la columna debe tener la palabra fecha
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
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${name}.xlsx`);
    };

    return {
        exportPdf,
        exportToExcel
    }
}

export function exportInform (columns: ColumnMeta[][], values: any[][], name: string, sheetNames: string[]) {

    //eslint-disable-next-line
    const {formatDate} = useFormats();
    const usefulColumns = () => {
        return columns.map((column) =>
            column.filter(column => !(column.field === "details" || column.field === "supplier" || column.field === "CRUDupdate" || column.field === "CRUDdelete" || column.field === "buy" || column.field === "sale" || column.field === "pattern")))

    }

    const exportColumns = () => {
        return usefulColumns().map(columns => columns.map(column => column.header));
    }

    const exportValues = () => {
        const filteredValues = [];
        for (let i = 0; i < values.length; i++) {
            const convertedValues = values[i].map(value => usefulColumns()[i].map(column => {
                if (column.field === "product") {
                    return value[column.field] = value.product?.name;
                }
                if(column.field === "nameProduct"){
                    return value[column.field] = value?.kindOfProduct?.product?.name;
                }
                if (column.field === "nameUser") {
                    return value[column.field] = value.user?.name;
                }
                if(column.field === "totalValue") {
                    if(value?.unitaryValue) {
                        return value[column.field] = value?.unitaryValue * value?.amount
                    }
                    return value[column.field] = value?.price * value?.amount
                }
                return value[column.field]
            }));
            filteredValues.push(convertedValues);
        }
        return filteredValues;
    }


    const exportPdf = () => {

        const doc = new jsPDF('p', 'mm', 'a4');

        const initialY = 20
        for (let i = 0; i < values.length; i++) {

            autoTable(doc, {
                head: [exportColumns()[i]],
                body: exportValues()[i],
            });
        }

        doc.save(`${name}.pdf`);
    }


    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        for (let i = 0; i < values.length ; i++) {
            const exportData = exportValues()[i].map((subArray: any[]) => {
                const rowData: { [key: string]: any } = {};
                exportColumns()[i].forEach((column, index) => {
                    if (column.toLowerCase().includes('fecha') || column.toLowerCase().includes('date')) { // El título de la columna debe tener la palabra fecha
                        const dateObject  = formatDate(subArray[index]);
                        rowData[column] = dateObject;
                    } else {
                        rowData[column] = subArray[index] as any;
                    }
                });
                return rowData;
            });

            const worksheet = XLSX.utils.json_to_sheet(exportData, { header: exportColumns()[i] });
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetNames[i]);
        }
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${name}.xlsx`);
    }

    return {
        exportPdf,
        exportToExcel
    }
}