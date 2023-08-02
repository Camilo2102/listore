"use client"

import { useEffect, useState } from "react";
import { inventoryContext } from './inventoryContext';

import { handleContext } from "@/app/hooks/handleContextHooks";
import { StorageService } from "@/app/services/storageService";

export default function InventoryLayout({ children }: { children: React.ReactNode }){
    const [inventory, setInventory] = handleContext("inventory");

    return(
        <inventoryContext.Provider value={{inventory, setInventory}}>
            {children}
        </inventoryContext.Provider>
    )

}