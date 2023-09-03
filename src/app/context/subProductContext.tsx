"use client"
import { handleContext } from "@/app/hooks/handleContextHook";
import { createContext, useContext } from "react";

type subProductContext = {
    subProduct: any | undefined;
    setSubProduct: (product: any | undefined) => void
}

export const SubProductContext = createContext<subProductContext>(
    {} as subProductContext);

export function useSubProductContext() {
    return useContext(SubProductContext);
}

export function SubProductProvider({ children }: {children: React.ReactNode}){
    const [subProduct, setSubProduct] = handleContext('subProduct');
    return(
        <SubProductContext.Provider value={{subProduct: subProduct, setSubProduct: setSubProduct}}>
            {children}
        </SubProductContext.Provider>
    )
}