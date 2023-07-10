import Form from "@/app/models/formModels/form";
import { useHandleInput } from "./handleInput";
import FormControl from "@/app/models/formModels/formControl";


export const handleForm = (formControls: FormControl[]) : [any, Form, (partialT: Partial<any>) => void,() => [FormControl[], boolean]
] => {
    const form = new Form(formControls);
    const [value, setValue] = useHandleInput<any>(form.getFormControlValues());

    /**
     * Se encarga de validar cuando se ejecute un cambio en el input y resetea el status del formcontrol
     * @param partialT el objeto parcial a ingresar
     */
    const inputChange = (partialT: Partial<any>) =>{
        Object.keys(partialT).forEach( key => {
            form.resetStatus(key);
        }) 
        setValue(partialT);
    } 

    /**
     * Parcha el valor actual en el formulario
     * @returns la validacion del formulario
     */
    const validateForm = () : [FormControl[], boolean] => {
        form.pathValue(value);
        return [form.validateForm(), form.isValid()]
    }


    return [value, form, inputChange, () => validateForm()];
}