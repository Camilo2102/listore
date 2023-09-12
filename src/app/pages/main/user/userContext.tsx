"use client"

import { createContext } from "react"

type userContext = {
    user: any | undefined;
    setUser: (user: any | undefined) => void
}

export const userContext = createContext<userContext>({} as userContext);