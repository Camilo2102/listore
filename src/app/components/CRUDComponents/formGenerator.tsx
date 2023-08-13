import Form from "@/app/models/formModels/form";
import inputTypeSelector from "../../utils/inputTypeSelector";
import { Button } from "primereact/button";
import React, { FormEvent } from "react";
import { Dropdown } from "primereact/dropdown";

export default function FormGenerator({ form, value, setValue, submit, buttonLabel = "submit", update = false, messages, register}: { form: Form, value: any, setValue: (partialT: Partial<any>) => void, submit: (e: FormEvent<HTMLFormElement>) => void, buttonLabel?: string, update?: boolean, messages?: React.ReactNode[], register?:  React.ReactNode[]}) {


    const generateFields = () => {
        const controls = form.getFormControls();

        return controls.map(control => (
            <div className={`col-${control.colSize || '6'} py-4`} key={control.field}>
                {inputTypeSelector(control, value, setValue)}
            </div>
        ))
    }

    const getMessages = () => {
        return messages?.map((msg, i) => (
            <div key={i} className="col-12 flex justify-content-end">
                {msg}
            </div>
        ));
    }

    const getMessagesRegister = () => {
        return register?.map((msg, i) => (
            <div key={i} className="col-12 flex justify-content-center">
                {msg}
            </div>
        ));
    }


    return (
        <form onSubmit={(e) => submit(e)} className="grid">
            {generateFields()}
            {getMessages()}
            <div className="col-12 text-center" >
                <Button severity={update ? undefined: "success" } label={buttonLabel} ></Button>
            </div>
            {getMessagesRegister()}
        </form>
    )
}