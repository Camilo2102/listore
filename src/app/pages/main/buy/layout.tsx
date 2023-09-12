"use client"
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { buyContext } from "./buyContext";

export default function BuyLayout({children}: {children: React.ReactNode}){
    const [buy, setBuy] = useHandleContext('buy');
    return(
        <buyContext.Provider value={{buy, setBuy}}>
            {children}
        </buyContext.Provider>
    )
}