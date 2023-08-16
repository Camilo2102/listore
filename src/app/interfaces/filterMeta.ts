type FilterValue = {
    field: string;
    label: string;
    value: any;
}


export default interface FilterMeta{
    values: FilterValue[];
    required: any;
}