import {Messages} from "@/app/constants/messageConstant";
import FormControl from "./formControl";

import { useToastContext } from "@/app/context/toastContext";

export type validateFunction = (formControl: FormControl) => boolean;

export default function useValidators () {
    const {showError} = useToastContext();

    /**
     * Validacion de multiples objetos para validar si tienen contenido
     * @param value un objeto de cualquier tipo
     * @returns el estado para saber si esta vacio
     */
    const isEmpty = (value: string | number | object | null | undefined): boolean => {
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
    
    /**
     * Validador para indicar que el elemento debe tener valor
     * @param formControl el formcontrol con la informacion del elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */
    const requiered = (formControl: FormControl): boolean => {
        const empty = isEmpty(formControl.value);
        if (empty && formControl.message) {
            showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_REQUIERED + formControl.description);
        }

        return empty;
    }

    /**
     * Validador para establecer una longitud maxima
     * @param maxLenght cantidad maxima que puede contener un elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */
    const maxLenght = (maxLenght: number): validateFunction => {
        return (formControl: FormControl) => {
            if (maxLenght) {
                const isInvalid = formControl.value.length > maxLenght;

                if (isInvalid && formControl.message) {
                    showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_MAX_LENGTH + maxLenght + " para " + formControl.description);
                }

                return isInvalid;
            } else {
                showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_NO_MAX_LENGTH_STABLISHED + formControl.description);

                return false;
            }
        };

    }

    /**
     * Validador para establecer la longitud minima
     * @param minLength cantidad minima que puede tener un elemento
     * @returns booleano que permite establecer el estado del formcontrol
     */
    const minLenght = (minLength: number): validateFunction => {
        return (formControl: FormControl) => {
            if (minLength) {
                const isInvalid = formControl.value.length < minLength;

                if (isInvalid && formControl.message) {
                    showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_MIN_LENGTH + minLength + " para " + formControl.description);
                }

                return isInvalid;
            } else {
                showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_NO_MIN_LENGTH_STABLISHED + formControl.description);

                return false;
            }
        };
    }

    return{
        minLenght,
        maxLenght,
        requiered
    }

}