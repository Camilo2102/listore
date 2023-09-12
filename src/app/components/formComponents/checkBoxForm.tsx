import FormControl from "@/app/models/formModels/formControl";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

export default function CheckBoxForm({ formControl, value, onValueChange }: { formControl: FormControl, value: any, onValueChange: (value: any) => void }) {

    const handleChange = (e: CheckboxChangeEvent) => {
        let _values = [...value[formControl.field]];

        if (e.checked)
            _values.push(e.value);
        else
            _values.splice(_values.indexOf(e.value), 1);

        onValueChange({[formControl.field]:_values});
    }

    const generateOptions = () => {
        return formControl.options?.map(option => (
            <div key={"div" + option.code} className="flex align-items-center">
                <Checkbox  inputId={"check" + option.code} disabled={formControl.disabled} key={"box" + option.code} className={formControl.invalid ? 'p-invalid' : ''} name={option.code} value={option.value} onChange={handleChange} checked={value[formControl.field].includes(option.value)} ></Checkbox>
                <label key={"label" + option.code} htmlFor={"check" + option.code}>{option.description} </label>
            </div>
        ))
    }

    return(
        <>
            {generateOptions()}
        </>
    )
}