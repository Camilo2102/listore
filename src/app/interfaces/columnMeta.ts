export default interface ColumnMeta {
    field: string;
    header: string;
    values?: any;
    sortable?: boolean;
    action?: (t: any) => void;
}