"use client"
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { patternContext } from "./patternContext";

export default function PatternLayout({children}: {children: React.ReactNode}){
    const [pattern, setPattern] = useHandleContext('pattern');
    return(
        <patternContext.Provider value={{pattern, setPattern}}>
            { children }
        </patternContext.Provider>
    )
}