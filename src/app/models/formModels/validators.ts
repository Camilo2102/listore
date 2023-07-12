import {Messages} from "@/app/constants/messageConstant";
import {ToastService} from "@/app/services/toastService";
import FormControl from "./formControl";
import {AuthService} from "@/app/services/authService";

export type validateFunction = (formControl: FormControl) => boolean;

export default class Validators {
    /**
     * Validador para indicar que el elemento debe tener valor
     * @param formControl el formcontrol con la informacion del elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */
    public static requiered(formControl: FormControl): boolean {

        const isEmpty = Validators.isEmpty(formControl.value);
        if (isEmpty && formControl.message) {
            ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_REQUIERED + formControl.description);
        }

        return isEmpty;
    }

    /**
     * Validador para establecer una longitud maxima
     * @param maxLenght cantidad maxima que puede contener un elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */
    public static maxLenght(maxLenght: number): validateFunction {

        return (formControl: FormControl) => {
            if (maxLenght) {
                const isInvalid = formControl.value.length > maxLenght;

                if (isInvalid && formControl.message) {
                    ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_MAX_LENGTH + maxLenght + " para " + formControl.description);
                }

                return isInvalid;
            } else {
                ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_NO_MAX_LENGTH_STABLISHED + formControl.description);

                return false;
            }
        };

    }

    /**
     * Validador para establecer la longitud minima
     * @param minLength cantidad minima que puede tener un elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */
    public static minLenght(minLength: number): validateFunction {

        return (formControl: FormControl) => {
            if (minLength) {
                const isInvalid = formControl.value.length < minLength;

                if (isInvalid && formControl.message) {
                    ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_MIN_LENGTH + minLength + " para " + formControl.description);
                }

                return isInvalid;
            } else {
                ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_NO_MIN_LENGTH_STABLISHED + formControl.description);

                return false;
            }
        };
    }


    /**
     * Validacion de multiples objetos para validar si tienen contenido
     * @param value un objeto de cualquier tipo
     * @returns el estado para saber si esta vacio
     */
    public static isEmpty(value: string | number | object | null | undefined): boolean {
        if (value === null || value === undefined) {
            return true;
        } else if (typeof value !== 'number' && value === '') {
            return true;
        } else if (typeof value === 'object' && Object.keys(value).length === 0 && !(value instanceof Date)) {
            return true;
        } else if (value instanceof Date && isNaN(value.getTime())) {
            return true;
        } else {
            return false;
        }
    }
}