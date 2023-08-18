import ColumnMeta from "@/app/interfaces/columnMeta";
import FormControl from "@/app/models/formModels/formControl";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ChangeEvent, useEffect, useState } from "react";
import PopUp from "../popUp";
import TableGeneral from "../tableComponents/tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import { DataTableSelectEvent } from "primereact/datatable";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";

export default function InputHelper({ formControl, value, onValueChange, icon }: { formControl: FormControl, value: any, onValueChange: (value: any, dependecy?: string) => void, icon?: string }) {
    const [visible, setVisible] = useState<boolean>(false);

    const [showText, setShowText] = useState<string>('');

    const { getById } = useCRUDService(formControl.service as string);

    const loadData = () => {
        setVisible(true);
    };


    const selectValue = (value: DataTableSelectEvent) => {
        const { id, name } = value.data;

        setShowText(name);
        onValueChange({ [formControl.field]: id, ["name" + formControl.field]: name }, formControl.fieldDependency);
        setVisible(false);
    }

    useEffect(() => {
        const id = value[formControl.field].id;
        if(id === undefined) {
            return;
        }
        getById(true, value[formControl.field].id).then(res => {
            if (!ResErrorHandler.isValidRes(res)) {
                return;
            }
            const { id, name } = res;
            setShowText(res.name)
            onValueChange({ [formControl.field]: id, ["name" + formControl.field]: name }, formControl.fieldDependency);
        })
    }, [])

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
                <TableGeneral showRepotGenerator={false} columns={formControl.columns} baseFilter={formControl.filter} endpoint={formControl.service as string} onRowSelect={selectValue} ></TableGeneral>
            </PopUp>}
        </>
    )
} 