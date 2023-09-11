import { useHandleContext } from "@/app/hooks/useHandleContextHook";
import { createContext, useContext } from "react";

type supplierContext = {
    supplier: any | undefined;
    setSupplier: (supplier: any | undefined) => void
}

export const SupplierContext = createContext<supplierContext>(
    {} as supplierContext);

export function useSupplier() {
    return useContext(SupplierContext);
}


export function SupplierProvider({ children }: {children: React.ReactNode}) {
    const [supplier, setSupplier] = useHandleContext('supplier');

    return(
        <SupplierContext.Provider value={{supplier, setSupplier}}>
            {children}
        </SupplierContext.Provider>
    )
}