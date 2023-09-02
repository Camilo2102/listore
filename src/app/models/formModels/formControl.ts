/**
 * Estructura basica de un formControl
 */

import KeyValueInterface from "@/app/interfaces/keyValueInterface";
import ColumnMeta from "@/app/interfaces/columnMeta";
import FilterMeta from "@/app/interfaces/filterMeta";
import dependence from "@/app/interfaces/dependence";


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
    fieldDependency?: dependence[];
    filter?: FilterMeta;
    numberOption?: number;
}