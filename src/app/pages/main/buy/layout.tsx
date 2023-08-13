"use client"
import { handleContext } from "@/app/hooks/handleContextHook";
import { buyContext } from "./buyContext";

export default function BuyLayout({children}: {children: React.ReactNode}){
    const [buy, setBuy] = handleContext('buy');
    return(
        <buyContext.Provider value={{buy, setBuy}}>
            {children}
        </buyContext.Provider>
    )
}