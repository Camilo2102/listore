"use client"
import { createContext } from "react";

type attributeContext = {
    attribute: any | undefined;
    setAttribute: (pattern: any | undefined) => void
}
export const attributeContext = createContext<attributeContext>({} as attributeContext);