import {Button} from "primereact/button";
import React, {FormEvent, useState} from "react";
import {Dialog} from "primereact/dialog";
import FormGenerator from "@/app/components/CRUDComponents/formGenerator";
import FormControl from "@/app/models/formModels/formControl";
import {FormTypes} from "@/app/constants/formTypeConstant";
import {Endpoints} from "@/app/constants/endpointsConstants";
import {useHandleForm} from "@/app/hooks/useHandleForm";
import useValidators from "@/app/models/formModels/validators";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import AuthUtil from "@/app/hooks/utils/authUtils";
import {exportInform} from "@/app/hooks/useExport";
import ColumnMeta from "@/app/interfaces/columnMeta";
import {useFormats} from "@/app/constants/formatConstants";
import {File} from "@/app/constants/fileConstants";

export default function InformGeneratorPopUp({screenWidth}: { screenWidth: number }) {
    const [visible, setVisible] = useState<boolean>(false);

    const {requiered} = useValidators();
    const {getCredentials} = AuthUtil();

    const { formatDate, formatCurrency, formatDetail } = useFormats();

    const FileKind = [
        { code: File.EXCEL, value: File.EXCEL_VAL, description: File.EXCEL},
        { code: File.PDF_LABEL, value: File.PDF_VAL, description: File.PDF_LABEL },
    ];

    const [controls, setControls] = useState<FormControl[]>([{
            field: "initialDate",
            value: null,
            description: "Fecha Inicial",
            colSize: 4,
            type: FormTypes.DATE,
            validators: [requiered],
            invalid: false,
            message: true,
        },
            {
                field: "finalDate",
                value: null,
                description: "Fecha final",
                colSize: 4,
                type: FormTypes.DATE,
                validators: [requiered],
                invalid: false,
                message: true,
            },
        {
            field: "kind",
            value: "",
            type: FormTypes.DROPDOWN,
            colSize: 4,
            description: "Tipo de archivo",
            validators: [requiered],
            invalid: false,
            message: true,
            options: FileKind
        }
        ]
    );

    const columnsSale: ColumnMeta[] = [
        { field: 'saleDate', header: 'Fecha de venta', format: formatDate },
        { field: 'product', header: 'Producto' },
        { field: 'unitaryValue', header: 'Valor unitario', format: formatCurrency },
        { field: 'amount', header: 'Cantidad' },
        { field: 'totalValue', header: 'Valor total', format: formatCurrency },
        { field: 'nameUser', header: 'Usuario' }
    ];

    const columnsSpent: ColumnMeta[] = [
        { field: 'spentDate', header: 'Fecha de gasto' },
        { field: 'price', header: 'Precio' },
        { field: 'description', header: 'Descripción' },
        { field: 'nameUser', header: 'Usuario' }
    ];

    const columnsBuy: ColumnMeta[] = [
        { field: 'buyDate', header: 'Fecha de compra', format: formatDate },
        { field: 'nameProduct', header: 'Producto' },
        { field: "details", header: 'Detalle', format: formatDetail },
        { field: 'price', header: 'Precio', format: formatCurrency },
        { field: 'amount', header: 'Cantidad' },
        { field: 'totalValue', header: 'Valor total', format: formatCurrency },
        { field: 'nameUser', header: 'Usuario' }
    ];

    const [filter, form, setFilter, validateFormControls] = useHandleForm(controls);

    const saleService = useCRUDService(Endpoints.SALE);
    const buyService = useCRUDService(Endpoints.BUY);
    const spentService = useCRUDService(Endpoints.SPENT);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if (valid) {
            const filterGenerated = {
                initialDate: filter.initialDate,
                finalDate: filter.finalDate,
                user: {
                    company: {
                        id: getCredentials().company
                    },
                },
            }

            const sales = await saleService.getAll(true, filterGenerated);

            const buys = await buyService.getAll(true, filterGenerated);

            const spents = await spentService.getAll(true, filterGenerated);

            const {exportPdf, exportToExcel} = exportInform([columnsSale, columnsSpent, columnsBuy], [sales, spents, buys], "Reporte", ["Ventas", "Gastos", "Compras"]);

            filter.kind === "EX" ? exportToExcel() : exportPdf();

        }
    }

    return (
        <>
            <Button
                icon="pi pi-file-export"
                className="navbar-icon2"
                title='Cerrar sesión'
                label={screenWidth <= 767 ? 'Generar informe' : ''}
                onClick={() => setVisible(true)}
            />
            <Dialog header="Generar informe?" visible={visible} onHide={() => setVisible(false)}
                    style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                <p>
                    Deberas seleccionar el periodo del cual deseas generar el informe:
                </p>
                <FormGenerator form={form} value={filter} setValue={setFilter} submit={handleSubmit} buttonLabel="Generar" ></FormGenerator>
            </Dialog>
        </>
    )

}