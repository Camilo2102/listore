"use client"
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { saleContext } from "./saleContext";

export default function SaleLayout({children}: {children: React.ReactNode}){
    const [sale, setSale] = useHandleContext('sale');
    return(
        <saleContext.Provider value={{sale, setSale}}>
            {children}
        </saleContext.Provider>
    )
}