import FormControl from "@/app/models/formModels/formControl";
import { FormTypes } from "../../constants/formTypeConstant";
import InputForm from "../../components/formComponents/inputForm";
import CheckBoxForm from "../../components/formComponents/checkBoxForm";
import CalendarForm from "../../components/formComponents/calendarForm";
import DropDownForm from "../../components/formComponents/dropDownForm";
import PasswordForm from "../../components/formComponents/passwordForm";
import RadioButtonForm from "../../components/formComponents/radioButtonForm";
import InputHelper from "../../components/formComponents/inputHelper";
import dependence from "../../interfaces/dependence";

/**
 * Se encarga de convertir el formControl en un field ya listo para ser usado
 * @param formControl El formcontrol con la informacion para el campo
 * @param value El valor actual del objeto
 * @param setValue Asigna el valor
 * @returns devuelve el elemento listo para ser usado
 */
export default function inputTypeSelector(formControl: FormControl, value: any, setValue: (partialT: Partial<any>, dependecy?: dependence[]) => void) {
    const type = formControl.type ? formControl.type : '';

    const types = {
        [FormTypes.INPUT]: <InputForm icon={formControl.icon} formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></InputForm>,
        [FormTypes.CHECKBOX]: <CheckBoxForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></CheckBoxForm>,
        [FormTypes.DATE]: <CalendarForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></CalendarForm>,
        [FormTypes.DROPDOWN]: <DropDownForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></DropDownForm>,
        [FormTypes.PASSWORD]: <PasswordForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></PasswordForm>,
        [FormTypes.RADIO]: <RadioButtonForm formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></RadioButtonForm>,
        [FormTypes.NUMBER]:<InputForm numbers icon={formControl.icon} formControl={formControl} value={value} onValueChange={(data) => { setValue(data) }}></InputForm>,
        [FormTypes.INPUTHELPER]: <InputHelper formControl={formControl} value={value} onValueChange={(data, dependency) => { setValue(data, dependency) }}></InputHelper>,
        '': <h3>Sin implementar</h3> 
    }

    return types[type]
}
