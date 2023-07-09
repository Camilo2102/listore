"use client"
import React, { useContext, useState } from "react";
import { userContext } from "./userContext";
import User from "@/models/user";
import { useHandleInput } from "@/app/hooks/handleInput";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const context = useContext(userContext);

    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <>
            <userContext.Provider value={{user, setUser}}>
                {children}
            </userContext.Provider>
        </>
    );
}