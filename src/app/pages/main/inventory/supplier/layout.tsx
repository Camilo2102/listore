"use client"

import SupplierModel from "@/app/models/supplier";
import React, { useState } from "react";
import { supplierContext } from "./supplierContext";

export default function SupplierLayout({children}: {children: React.ReactNode}){
    const [supplier, setSupplier] = useState<SupplierModel | undefined>(undefined);
    return(
        <supplierContext.Provider value={{supplier, setSupplier}}>
            {children}
        </supplierContext.Provider>
        
    )
}