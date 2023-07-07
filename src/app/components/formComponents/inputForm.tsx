import FormControl from "@/models/formModels/formControl";
import { InputText } from "primereact/inputtext";
import { ChangeEvent } from "react";

export default function ({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void }) {

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        onValueChange({[formControl.field]: value}); 
    }

    return (
        <span className="p-float-label">
            <InputText style={{width: '100%'}} id={formControl.field} className={formControl.invalid ? 'p-invalid' : ''} value={value[formControl.field]} onChange={handleInput} />
            <label htmlFor={formControl.field}>{formControl.description}</label>
        </span>
    )
}