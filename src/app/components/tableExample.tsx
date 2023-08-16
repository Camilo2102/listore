import { Card } from "primereact/card";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ColumnMeta from "../interfaces/columnMeta";
import TableGeneral from "./tableComponents/tableGeneral";
import { useState } from "react";
import { Button } from "primereact/button";

export default function TableExample () {
    const [values, setValues] = useState<any[]>(
        [
            {title: "Hola1", description: "Como estas"},
            {title: "Hola2", description: "Como estas"},
            {title: "Hola3", description: "Como estas"},
            {title: "Hola4", description: "Como estas"},
            {title: "Hola5", description: "Como estas"},
        ]
    );

    const [gridLines, setGridLines] = useState<boolean>(false);
    const [stripedRows, setStripedRows] = useState<boolean>(false);


    const columns: ColumnMeta[] = [
        {field: 'title', header: 'Titulo', sortable: true},
        {field: 'description', header: 'Descripcion'},
    ];


    return(
        <Card title="Tabla">
            <Button label="Lineas" onClick={() => {setGridLines(!gridLines)}}></Button>
            <Button label="Intercalado" onClick={() => {setStripedRows(!stripedRows)}}></Button>
            <TableGeneral gridLines={gridLines} stripedRows={stripedRows} values={values} columns={columns}></TableGeneral>
        </Card>
    )
}