import ColumnMeta from "@/app/interfaces/columnMeta";
import { CRUDFactory } from "@/app/models/CRUDFactory";
import FormControl from "@/app/models/formModels/formControl";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useState } from "react";
import PopUp from "../popUp";
import TableGeneral from "../tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { DataTableSelectEvent } from "primereact/datatable";
import useCRUDService from "@/app/hooks/services/useCRUDService";

export default function InputHelper({ formControl, value, onValueChange, icon }: { formControl: FormControl, value: any, onValueChange: (value: any, dependecy?: string) => void, icon?: string }) {
    
    const [values, setValues] = useState<any[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const {getAllByFilter} = useCRUDService(formControl.service ? formControl.service : '');

    const [paginator, setPaginator] = useHandleInput<Paginator>({
        rows: 5,
        first: 0,
        page: 0,
        totalRecords: 0,
        pagesVisited: 0,
        loaded: false
    });

    const [showText, setShowText] = useState<string>('');


    const loadData = () => {
        getAllByFilter(true, paginator, formControl.filter).then(res => {
            setVisible(true);
            setValues(res);
        });
    };
    

    const selectValue = (value: DataTableSelectEvent) => {
        const {id, name} = value.data;

        setShowText(name);
        onValueChange({ [formControl.field]: id, ["name"+formControl.field]: name }, formControl.fieldDependency);
        setVisible(false);
    }

    return (
        <>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    <InputText readOnly id={formControl.field} disabled={formControl.disabled} className={formControl.invalid ? 'p-invalid' : ''} value={showText} ></InputText>
                    <label htmlFor={formControl.field} >{formControl.description}</label>
                </span>
                <Button type="button" disabled={formControl.disabled} onClick={loadData}></Button>
            </div>
            {visible && formControl.columns && <PopUp title={formControl.description} visible={visible} setVisible={setVisible}>
                <TableGeneral showRepotGenerator={false} columns={formControl.columns} values={values} paginator={paginator} setPaginator={setPaginator} onRowSelect={selectValue} ></TableGeneral>
            </PopUp>}
        </>
    )
} 