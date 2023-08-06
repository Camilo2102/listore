"use client"

import  ProductModel  from "@/app/models/product";
import { useState } from "react";
import { productContext } from "./productContext";
import { handleContext } from "@/app/hooks/handleContextHook";


export default function ProductLayout({ children }: { children: React.ReactNode }){
    const [product, setProduct] = handleContext('product');
    return(
        <productContext.Provider value={{product, setProduct}}>
            {children}
        </productContext.Provider>
    )
}