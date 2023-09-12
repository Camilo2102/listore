"use client"

import { useState } from "react";
import { inventoryContext } from './inventoryContext';
import InventoryModel from "@/app/models/inventory";
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { SupplierProvider } from "../../../context/supplierContext";

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
    const [inventory, setInventory] = useHandleContext('inventory');
    return (
        <inventoryContext.Provider value={{ inventory, setInventory }}>
            {children}
        </inventoryContext.Provider>
    )
}