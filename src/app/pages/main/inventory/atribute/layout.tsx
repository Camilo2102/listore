"use client"

import AtributesModel from "@/app/models/atribute";
import React, { useState } from "react";
import { atributeContext } from './atributeContext';

export default function AtributeLayout({children}: {children: React.ReactNode}){
    const [atribute, setAtribute] = useState<AtributesModel | undefined>(undefined);
    return(
        <atributeContext.Provider value={{atribute, setAtribute}}>
            {children}
        </atributeContext.Provider>
    )
}