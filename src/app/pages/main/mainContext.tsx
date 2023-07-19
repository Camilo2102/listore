"use client"

import { createContext } from "react";

type mainContext = {
    inventoryMain: any | undefined;
    setInventoryMain: (inventory: any | undefined) => void
}

export const mainContext = createContext<mainContext>({} as mainContext);