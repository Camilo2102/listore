import FormControl from "@/app/models/formModels/formControl";
import { Password } from "primereact/password";
import { ChangeEvent } from "react";

export default function PasswordForm({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void}) {

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        onValueChange({[formControl.field]: value}); 
    }


    return (
        <span className="p-float-label">
            <Password style={{width: '100%'}} inputStyle={{width: '100%'}} disabled={formControl.disabled} inputId={formControl.field} feedback={formControl.feedback} className={formControl.invalid ? 'p-invalid' : ''} toggleMask value={value[formControl.field]} onChange={handlePassword} />
            <label htmlFor={formControl.field}>{formControl.description}</label>
        </span>
    )
}