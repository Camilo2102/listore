"use client"
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { attributeContext } from "./attributeContext";

export default function AttributeLayout({children}: {children: React.ReactNode}){
    const [attribute, setAttribute] = useHandleContext('attribute');
    return(
        <attributeContext.Provider value={{ attribute, setAttribute }}>
            { children }
        </attributeContext.Provider>
    )
}