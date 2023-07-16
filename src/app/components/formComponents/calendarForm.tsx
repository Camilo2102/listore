import FormControl from "@/app/models/formModels/formControl";
import { Calendar } from "primereact/calendar";

export default function CalendarForm({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void }) {

    const handleDate = (data: any) => {
        onValueChange({ [formControl.field]: data });
    }

    return (
        <span className="p-float-label">
            <Calendar style={{width: '100%'}} inputId={formControl.field} disabled={formControl.disabled} maxDate={formControl.maxDate} minDate={formControl.minDate} className={formControl.invalid ? 'p-invalid' : ''} value={value[formControl.field]} onChange={(e) => handleDate(e.value)} />
            <label htmlFor={formControl.field}>{formControl.description}</label>
        </span>
    )
}