"use client"

import { useEffect, useState } from "react";
import { inventoryContext } from './inventoryContext';

import { handleContext } from "@/app/hooks/handleContextHooks";
import { StorageService } from "@/app/services/storageService";

export default function InventoryLayout({ children }: { children: React.ReactNode }){
    const [inventory, setInventory] = handleContext("inventory");

    useEffect(()=> {
        const storedValue = StorageService.getValue("inventory");
    
        storedValue !== null && setInventory(JSON.parse(storedValue))
    }, [])

    return(
        <inventoryContext.Provider value={{inventory, setInventory}}>
            {children}
        </inventoryContext.Provider>
    )

}