"use client"

import AtributesModel from "@/app/models/atribute";
import React, { useState } from "react";
import { atributeContext } from './atributeContext';
import { handleContext } from "@/app/hooks/handleContextHook";

export default function AtributeLayout({children}: {children: React.ReactNode}){
    const [atribute, setAtribute] = handleContext('atribute');
    return(
        <atributeContext.Provider value={{atribute, setAtribute}}>
            {children}
        </atributeContext.Provider>
    )
}