/**
 * Estructura basica de un formControl
 */

import KeyValueInterface from "@/app/interfaces/keyValueInterface";

export default interface FormControl{
    field: string,
    value: any,
    description: string,
    validators?: ((formControl: FormControl) => boolean)[];
    invalid?: boolean;
    message?: boolean;
    minLenght?: number;
    maxLenght?: number;
    minDate?: Date;
    maxDate?: Date;
    options?:  KeyValueInterface[];
    numberOption?: number;
}