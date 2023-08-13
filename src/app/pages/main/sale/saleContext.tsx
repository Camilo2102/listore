"use client"
import { createContext } from "react";

type saleContext = {
    sale: any | undefined;
    setSale: (atribute: any | undefined) => void
}
export const saleContext = createContext<saleContext>({} as saleContext);