"use client";

import { createContext, useContext, useState } from "react";

type context = {
    reloadData: any | undefined;
    setReloadData: (reloadData: any | undefined) => void
    loadingData: any | undefined;
    setLoadingData: (reloadData: any | undefined) => void
}

const TableContext = createContext<context>({} as context);


export function useTableContext() {
    return useContext(TableContext);
}

export function TableProvider({ children }: {children: React.ReactNode}) {
    const [reloadData, setReloadData] = useState<boolean>(false);
    const [loadingData, setLoadingData] = useState<boolean>(false);

    return(
        <TableContext.Provider value={{reloadData, setReloadData, loadingData, setLoadingData}}>
            {children}
        </TableContext.Provider>
    )
}