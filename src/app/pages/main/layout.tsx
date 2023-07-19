"use client"

import { useState } from "react";
import { mainContext } from "./mainContext"
import InventoryModel from "@/app/models/inventory";

export default function MainLayout({children} : {children: React.ReactNode}) {
    const [inventoryMain, setInventoryMain] = useState<InventoryModel | undefined>(undefined);
    return(
        <mainContext.Provider value={{inventoryMain, setInventoryMain}}>
            {children}
        </mainContext.Provider>
    )
}