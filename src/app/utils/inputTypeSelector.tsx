import FormControl from "@/models/formModels/formControl";
import { FormTypes } from "../constants/formTypeConstant";
import InputForm from "../components/formComponents/inputForm";
import CheckBoxForm from "../components/formComponents/checkBoxForm";
import CalendarForm from "../components/formComponents/calendarForm";
import DropDownForm from "../components/formComponents/dropDownForm";
import PasswordForm from "../components/formComponents/passwordForm";
import RadioButtonForm from "../components/formComponents/radioButtonForm";

/**
 * Se encarga de convertir el formControl en un field ya listo para ser usado
 * @param formControl El formcontrol con la informacion para el campo
 * @param value El valor actual del objeto
 * @param setValue Asigna el valor
 * @returns devuelve el elemento listo para ser usado
 */
export default function inputTypeSelector(formControl: FormControl, value: any, setValue: (partialT: Partial<any>) => void) {
    const type = formControl.type;

    const types = {
        [FormTypes.INPUT]: <InputForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></InputForm>,
        [FormTypes.CHECKBOX]: <CheckBoxForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></CheckBoxForm>,
        [FormTypes.DATE]: <CalendarForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></CalendarForm>,
        [FormTypes.DROPDOWN]: <DropDownForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></DropDownForm>,
        [FormTypes.PASSWORD]: <PasswordForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></PasswordForm>,
        [FormTypes.RADIO]: <RadioButtonForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></RadioButtonForm>
    }

    return types[type]
}
