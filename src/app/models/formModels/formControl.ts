/**
 * Estructura basica de un formControl
 */

import KeyValueInterface from "@/app/interfaces/keyValueInterface";
import { CRUDFactory } from "../CRUDFactory";
import ColumnMeta from "@/app/interfaces/columnMeta";

export default interface FormControl{
    field: string;
    value: any;
    description: string;
    disabled?: boolean;
    feedback?: boolean;
    icon? : string;
    type?: string;
    colSize?: number;
    validators?: ((formControl: FormControl) => boolean)[];
    invalid?: boolean;
    message?: boolean;
    minDate?: Date;
    maxDate?: Date;
    options?:  KeyValueInterface[];
    service?: string;
    columns?: ColumnMeta[];
    fieldDependency?: string;
    filter?: any;
    numberOption?: number;
}