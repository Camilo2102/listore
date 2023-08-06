"use client"

import { useEffect, useState } from "react";
import InventoryModel from "@/app/models/inventory";
import { HttpFactory } from "@/app/utils/httpFactory";
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