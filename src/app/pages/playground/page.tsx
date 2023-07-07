"use client"

import FormExample from "@/app/components/formExample"
import TableExample from "@/app/components/tableExample"
import ColumnMeta from "@/app/interfaces/columnMeta";

export default function PlayGround() {
    return(
        <div className="grid">
            <div className="col-6">
                <FormExample></FormExample>
            </div>
            <div className="col-6">
                <TableExample></TableExample>
            </div>
        </div>
    )
}