"use client"
import { createContext } from "react";

type spentContext = {
    spent: any | undefined;
    setSpent: (atribute: any | undefined) => void
}
export const spentContext = createContext<spentContext>({} as spentContext);