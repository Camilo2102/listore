"use client"
import { createContext } from "react";

type patternContext = {
    pattern: any | undefined;
    setPattern: (pattern: any | undefined) => void
}
export const patternContext = createContext<patternContext>({} as patternContext);