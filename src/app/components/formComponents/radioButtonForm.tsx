import FormControl from "@/app/models/formModels/formControl";
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';

export default function RadioButtonForm({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void }){
    
    const handleChange = (e: RadioButtonChangeEvent) => {
        const value = e.value;

        onValueChange({[formControl.field]: value}); 
    }

    const generateOptions = () => {
        return formControl.options?.map(option => (
            <div key={"div" + option.code} className="flex align-items-center">
                <RadioButton inputId={"radio" + option.code} key={"box" + option.code}  disabled={formControl.disabled}className={formControl.invalid ? 'p-invalid' : ''} name={option.code} value={option.value} onChange={handleChange} checked={value[formControl.field] === option.value} ></RadioButton>
                <label key={"label" + option.code}htmlFor={"radio" + option.code}>{option.description} </label>
            </div>
        ))
    }

    return(
        <>
            {generateOptions()}
        </>
    )
}