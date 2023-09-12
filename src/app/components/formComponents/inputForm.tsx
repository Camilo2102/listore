import FormControl from "@/app/models/formModels/formControl";
import { InputText } from "primereact/inputtext";
import { ChangeEvent } from "react";

export default function InputForm({ formControl, value, onValueChange, icon, numbers = false}: { formControl: FormControl, value: any, onValueChange: (value: any) => void, icon?: string, numbers?: boolean }) {

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        onValueChange({ [formControl.field]: value });
    }


    return (
        <span className="p-float-label p-input-icon-right" style={{width: '100%'}} >
            <i className={'pi ' + icon} style={{ color: '#9E6A90' }}></i>
            <InputText keyfilter={numbers ? "int" : undefined} style={{ width: '100%' }} id={formControl.field} disabled={formControl.disabled} className={formControl.invalid ? 'p-invalid' : ''} value={value[formControl.field]} onChange={handleInput} />
            <label htmlFor={formControl.field} >{formControl.description}</label>
        </span>

    )
}