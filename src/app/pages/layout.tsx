"use client"

import MainUtilElements from "./mainUtilElements";
import MainProviders from "./mainProviders";

export default function PageLayout({ children }: { children: React.ReactNode }) {
    


    return (
        <>
            <MainUtilElements></MainUtilElements>
            <MainProviders>
                {children}
            </MainProviders>
        </>
    )
}