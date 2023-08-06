"use client"

import SupplierModel from "@/app/models/supplier";
import React, { useState } from "react";
import { supplierContext } from "./supplierContext";
import { handleContext } from "@/app/hooks/handleContextHook";

export default function SupplierLayout({children}: {children: React.ReactNode}){
    const [supplier, setSupplier] = handleContext('supplier');
    return(
        <supplierContext.Provider value={{supplier, setSupplier}}>
            {children}
        </supplierContext.Provider>
        
    )
}