"use client"

import { useState } from "react";
import { inventoryContext } from './inventoryContext';
import InventoryModel from "@/app/models/inventory";

export default function InventoryLayout({ children }: { children: React.ReactNode }){
    const [inventory, setInventory] = useState<InventoryModel | undefined>(undefined);
    return(
        <inventoryContext.Provider value={{inventory, setInventory}}>
            {children}
        </inventoryContext.Provider>
    )

}