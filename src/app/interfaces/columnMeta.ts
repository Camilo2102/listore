export default interface ColumnMeta {
    field: string;
    header: string;
    values?: any;
    sortable?: boolean;
    format?: (t: any) => string;
    action?: (t: any) => void;
}