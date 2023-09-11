"use client"

import { useContext, useEffect, useState } from "react";
import { userContext } from "../userContext";
import RegisterWorker from "@/app/components/userComponents/RegisterWorker";
import Image from "next/image";

export default function UserMainteance() {
    const { user, setUser } = useContext(userContext);


    return (
        <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflow: 'hidden'  }}>
            <div className='lg:col-6 md:col-6 col-12 lg:p-8'>
                <RegisterWorker  userSelected={user}></RegisterWorker>
            </div>
            <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                <Image src='/registerEmployee.svg' alt='Login' width={1800} height={1800} style={{ maxWidth: '750px', width: '80%' }}></Image>
            </div>
        </div>
    )
}