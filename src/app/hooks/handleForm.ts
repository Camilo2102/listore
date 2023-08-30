import Form from "@/app/models/formModels/form";
import { useHandleInput } from "./handleInput";
import FormControl from "@/app/models/formModels/formControl";
import dependence from "../interfaces/dependence";


export const handleForm = (formControls: FormControl[]) : [any, Form, (partialT: Partial<any>, dependency?: dependence[]) => void,() => [FormControl[], boolean]
] => {
    const form = new Form(formControls);
    const [value, setValue] = useHandleInput<any>(form.getFormControlValues());

    /**
     * Se encarga de validar cuando se ejecute un cambio en el input y resetea el status del formcontrol
     * @param partialT el objeto parcial a ingresar
     */
    const inputChange = (partialT: Partial<any>, dependency?: dependence[]) =>{
        if(dependency !== undefined){
            dependency.forEach(dependence => {
                dependence.enable && form.enableField(dependence.field);
                const value = partialT[Object.keys(partialT)[0]][dependence.value];
                if(dependence.toInput){
                    const field = Object.keys(partialT)[0];
                    const obj = {
                        [field]: {
                            id: value
                        }
                    }            
                    form.updateFilter(dependence.field, obj);
                } else {
                    partialT = {
                        ...partialT,
                        [dependence.field]: value
                    }
                }
            })

        }        

        Object.keys(partialT).forEach( key => {
            form.resetStatus(key);
        }) 
    debugger

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