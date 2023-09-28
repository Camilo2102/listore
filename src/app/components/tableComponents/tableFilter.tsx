import { FormEvent, useEffect, useRef, useState } from "react";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from "primereact/button";
import useGeneratedForm from "@/app/hooks/useFilterSelect";
import FilterMeta from "@/app/interfaces/filterMeta";
import FormGenerator from "../CRUDComponents/formGenerator";
import { useHandleInput } from "@/app/hooks/useHandleInput";
import { useHandleForm } from "@/app/hooks/useHandleForm";
import useDeepCopy from "@/app/hooks/useDeepCopy";
import { Chip } from 'primereact/chip';
import DateUtil from "@/app/hooks/utils/dateUtils";
import { validateInput } from "@/app/hooks/utils/selectionUtil";



const chipGenerator = (filter: FilterMeta, setFilter: (partialT: Partial<any>) => void, setTempFilter: (partialT: Partial<any>) => void, pathValue: (value: any) => void) => {
    const { validateDate, formatFullDate } = DateUtil();
    const handleChipRemove = (key: string) => {
        filter.values.forEach(value => {

            if (value.formControl) {
                delete filter.required[value.field].id
                value.formControl.value = undefined
                value.value = null;
                return

            }

            if (value.field === key) {
                const asignValue = validateDate(value.value) ? null : "";
                value.value = asignValue;
                setTempFilter({ [key]: asignValue });
            }
        });
        
        console.log(filter.values);
        

        setFilter({ values: filter.values, required: filter.required });

    }

    return filter.values.map(value => {
        if (validateInput(value.value)) {
            const asignValue = formatFullDate(value.value);
            return (
                <Chip key={value.field} label={value.label + " : " + asignValue} removable onRemove={(e) => handleChipRemove(value.field)} />
            )
        }
    })

}


export default function TableFilter({ filter, setFilter }: { filter: FilterMeta, setFilter: (partialT: Partial<any>) => void }) {
    const overlayRef = useRef(null);

    const generatedControls = useGeneratedForm(filter as FilterMeta);

    const [control, setControl] = useState(generatedControls);


    const [applyFilters, setApplyFilters] = useState<boolean>(false);

    const handleApplyFilters = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApplyFilters(true);
    }

    const [tempFilter, form, setTempFilter, validateFormControls] = useHandleForm(control);

    useEffect(() => {
        if (applyFilters) {            
            filter.values.forEach(value => {
                Object.keys(tempFilter).forEach((key) => {
                    if (key === value.field) {
                        value.value = tempFilter[key]?.name ?? tempFilter[key]
                    }
                });
            })

            setFilter({ values: [...filter.values] });
            (overlayRef.current as any).toggle("");
            setApplyFilters(false);
            const [validateForms, isValid] = validateFormControls()
            setControl([...validateForms])
        }
        //eslint-disable-next-line
    }, [applyFilters])


    const pathValue = (valueToPatch: any) => {
        form.pathValue(valueToPatch);
    }

    return (
        <>
            <OverlayPanel ref={overlayRef}>
                <h2 style={{ textAlign: 'center' }}>Filtros</h2>
                <FormGenerator buttonLabel="Filtrar" setValue={setTempFilter} value={tempFilter} form={form} submit={handleApplyFilters}></FormGenerator>
            </OverlayPanel>
            <div className="flex justify-content-center align-items-center gap-2">
                <Button icon="pi pi-filter-fill" rounded outlined aria-label="Filter" onClick={e => (overlayRef.current as any).toggle(e)} />
                {chipGenerator(filter as FilterMeta, setFilter, setTempFilter, pathValue)}
            </div>
        </>
    )
}