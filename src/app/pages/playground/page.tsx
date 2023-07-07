"use client"

import FormExample from "@/app/components/formExample"
import FormGenerator from "@/app/components/formGenerator";
import FormGeneratorExample from "@/app/components/formGeneratorExample";
import TableExample from "@/app/components/tableExample"
import ColumnMeta from "@/app/interfaces/columnMeta";

export default function PlayGround() {
    return(
        <div className="grid">
            <div className="col-12">
                <FormGeneratorExample></FormGeneratorExample>
            </div>
        </div>
    )
}