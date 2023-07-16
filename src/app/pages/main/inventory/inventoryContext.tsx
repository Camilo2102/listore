"use client"
import { createContext } from "react";

type inventoryContext = {
    inventory: any | undefined;
    setInventory: (inventory: any | undefined) => void
}

export const inventoryContext = createContext<inventoryContext>({} as inventoryContext);