"use client";

import { createContext } from "react";

type mainContext = {
    mainInventory: any | undefined;
    setMainInventory: (inventory: any | undefined) => void
}

export const mainContext = createContext<mainContext>({} as mainContext);