"use client"
import React, { useContext, useState } from "react";
import { userContext } from "./userContext";
import User from "@/app/models/user";
import { useHandleInput } from "@/app/hooks/useHandleInput";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <>
            <userContext.Provider value={{user, setUser}}>
                {children}
            </userContext.Provider>
        </>
    );
}