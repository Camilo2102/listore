"use client"

import User from "@/app/models/user";
import { createContext } from "react"

type userContext = {
    user: any | undefined;
    setUser: (user: any | undefined) => void
}

export const userContext = createContext<userContext>({} as userContext);