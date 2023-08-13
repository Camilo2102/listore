"use client"

import NavBar from "@/app/components/navBar";
import { MainProvider } from "../../context/mainContext";
import { AuthProvider } from "@/app/context/authContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainProvider>
            <NavBar />
            {children}
        </MainProvider>
    )
}