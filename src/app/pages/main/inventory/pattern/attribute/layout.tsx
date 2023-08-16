"use client"
import { handleContext } from "@/app/hooks/handleContextHook";
import { attributeContext } from "./attributeContext";

export default function AttributeLayout({children}: {children: React.ReactNode}){
    const [attribute, setAttribute] = handleContext('attribute');
    return(
        <attributeContext.Provider value={{ attribute, setAttribute }}>
            { children }
        </attributeContext.Provider>
    )
}