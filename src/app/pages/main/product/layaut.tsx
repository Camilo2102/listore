"use client"

import { ProductModel } from "@/app/models/product";
import { useState } from "react";
import { productContext } from "./productContext";


export default function ProductLayout({ children }: { children: React.ReactNode }){
    const [product, setProduct] = useState<ProductModel | undefined>(undefined);
    return(
        <productContext.Provider value={{product, setProduct}}>
            {children}
        </productContext.Provider>

    )
}