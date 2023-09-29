import FormControl from "../models/formModels/formControl";

export type FilterValue = {
    field: string;
    label: string;
    value: any;
    formControl?: FormControl;
}


export default interface FilterMeta{
    values: FilterValue[];
    required: any;
}