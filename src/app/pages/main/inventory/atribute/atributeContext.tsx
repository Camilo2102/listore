"use client"
import { createContext } from "react";

type atributeContext = {
    atribute: any | undefined;
    setAtribute: (atribute: any | undefined) => void
}
export const atributeContext = createContext<atributeContext>({} as atributeContext);