"use client"
import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { createContext, useContext } from "react";

type productContext = {
    product: any | undefined;
    setProduct: (product: any | undefined) => void
}

export const ProductContext = createContext<productContext>(
    {} as productContext);

export function useProductContext() {
    return useContext(ProductContext);
}

export function ProductProvider({ children }: {children: React.ReactNode}){
    const [product, setProduct] = useHandleContext('product');
    return(
        <ProductContext.Provider value={{product, setProduct}}>
            {children}
        </ProductContext.Provider>
    )
}