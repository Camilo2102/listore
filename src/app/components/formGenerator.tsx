import Form from "@/models/formModels/form";
import inputTypeSelector from "../utils/inputTypeSelector";
import { Button } from "primereact/button";
import { FormEvent } from "react";
import { Dropdown } from "primereact/dropdown";

export default function FormGenerator({ form, value, setValue, submit }: { form: Form, value: any, setValue: (partialT: Partial<any>) => void, submit: (e: FormEvent<HTMLFormElement>) => void }) {


    const generateFields = () => {
        const controls = form.getFormControls();

        return controls.map(control => (
            <div className={`col-${control.colSize || '6'} py-5`} key={control.field}>
                {inputTypeSelector(control, value, setValue)}
            </div>
        ))
    }


    return (
        <form onSubmit={(e) => submit(e)} className="grid">
            {generateFields()}
            <div className="col-12 text-center" >
                <Button  label="Submit"></Button>
            </div>
        </form>
    )
}