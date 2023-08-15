"use client"
import { handleContext } from "@/app/hooks/handleContextHook";
import { patternContext } from "./patternContext";

export default function PatternLayout({children}: {children: React.ReactNode}){
    const [pattern, setPattern] = handleContext('pattern');
    return(
        <patternContext.Provider value={{pattern, setPattern}}>
            { children }
        </patternContext.Provider>
    )
}