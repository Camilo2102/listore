"use client"
import { createContext } from "react";

type buyContext = {
    buy: any | undefined;
    setBuy: (atribute: any | undefined) => void
}
export const buyContext = createContext<buyContext>({} as buyContext);