"use client"

import { useState } from "react";
import InventoryModel from "@/app/models/inventory";

export default function MainLayout({children} : {children: React.ReactNode}) {
    return(
        <>
            {children}
        </>
    )
}