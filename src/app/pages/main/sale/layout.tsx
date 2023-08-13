"use client"
import { handleContext } from "@/app/hooks/handleContextHook";
import { saleContext } from "./saleContext";

export default function SaleLayout({children}: {children: React.ReactNode}){
    const [sale, setSale] = handleContext('sale');
    return(
        <saleContext.Provider value={{sale, setSale}}>
            {children}
        </saleContext.Provider>
    )
}