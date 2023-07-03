import FormControl from "@/models/formModels/formControl";
import { Password } from "primereact/password";
import { ChangeEvent } from "react";

export default function PasswordForm({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void }) {

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        onValueChange({[formControl.field]: value}); 
    }


    return (
        <span className="p-float-label">
            <Password inputId={formControl.field} className={formControl.invalid ? 'p-invalid' : ''} value={value[formControl.field]} onChange={handlePassword} />
            <label htmlFor={formControl.field}>{formControl.description}</label>
        </span>
    )
}