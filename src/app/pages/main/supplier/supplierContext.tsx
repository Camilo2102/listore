import { createContext } from "react";

type supplierContext = {
    supplier: any | undefined;
    setSupplier: (supplier: any | undefined) => void
}

export const supplierContext = createContext<supplierContext>({} as supplierContext);