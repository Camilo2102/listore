"use client"

import { useState } from "react";
import { inventoryContext } from './inventoryContext';
import InventoryModel from "@/app/models/inventory";
import { handleContext } from "@/app/hooks/handleContextHook";

export default function InventoryLayout({ children }: { children: React.ReactNode }){
    const [inventory, setInventory] = handleContext('inventory');
    return(
        <inventoryContext.Provider value={{inventory, setInventory}}>
            {children}
        </inventoryContext.Provider>
    )
}