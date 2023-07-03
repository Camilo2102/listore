import FormControl from "@/models/formModels/formControl";
import { Dropdown } from 'primereact/dropdown';

export default function DropDownForm({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void }) {

    const handleDropdown = (value: any) => {
        
        onValueChange({[formControl.field]: value});
    }


    return (
        <span className="p-float-label">
            <Dropdown inputId={formControl.field} className={`w-full md:w-14rem ${formControl.invalid ? 'p-invalid' : ''}`} value={value[formControl.field]} onChange={(e) => handleDropdown(e.value)} options={formControl.options} optionLabel="code" optionValue="value" />
            <label htmlFor={formControl.field}>{formControl.description}</label>
        </span>
    )
}