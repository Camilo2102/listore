import FormControl from "@/app/models/formModels/formControl";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { ChangeEvent } from "react";

export default function NumberForm({ formControl, value, onValueChange, icon }: { formControl: FormControl, value: any, onValueChange: (value: any) => void, icon?: string }) {

    const handleInput = (e: InputNumberChangeEvent) => {
        const value = e.value;

        onValueChange({ [formControl.field]: value });
    }


    return (
        <span className="p-float-label p-input-icon-right" style={{width: '100%'}} >
            <i className={'pi ' + icon} style={{ color: '#9E6A90' }}></i>
            <InputNumber mode="decimal" useGrouping={false} style={{ width: '100%' }} id={formControl.field} disabled={formControl.disabled} className={formControl.invalid ? 'p-invalid' : ''} value={value[formControl.field]} onChange={handleInput} />
            <label htmlFor={formControl.field} >{formControl.description}</label>
        </span>

    )
}