"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUtil } from "@/app/utils/authUtil";

export default function MainLayout({children} : {children: React.ReactNode}) {
    const router = useRouter();

    useEffect(() => {
        if(!AuthUtil.isAuthorized()) {
            router.push('/pages/auth/login');
        }

    }, [AuthUtil.AUTHORIZED])
    return(
        <>
            {children}
        </>
    )
}