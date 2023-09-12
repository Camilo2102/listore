import { ReactNode } from "react";

export default interface ColumnMeta {
    field: string;
    header: string;
    values?: any;
    sortable?: boolean;
    format?: (t: any) => string | ReactNode;
    action?: (t: any) => void;
}