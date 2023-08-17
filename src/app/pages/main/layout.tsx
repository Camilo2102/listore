"use client"

import NavBar from "@/app/components/navBar";
import { MainProvider } from "../../context/mainContext";
import { AuthProvider } from "@/app/context/authContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainProvider>
            <NavBar />
            <div className="lg:ml-5 md:ml-6">
                {children}
            </div>
        </MainProvider>
    )
}