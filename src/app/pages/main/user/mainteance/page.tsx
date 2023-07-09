"use client"

import { useContext, useEffect, useState } from "react";
import { userContext } from "../userContext";
import RegisterWorker from "@/app/components/userComponents/RegisterWorker";

export default function UserMainteance() {
    const { user, setUser } = useContext(userContext);

    useEffect(() => {
        if(!user){
            setUser(undefined);
        }
    }, [])

    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className='lg:col-6 md:col-6 col-12 p-8'>
                <RegisterWorker  userSelected={user}></RegisterWorker>
            </div>
            <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                <img src='/registerEmployee.svg' alt='Login' width={'80%'} style={{ maxWidth: '750px' }}></img>
            </div>
        </div>
    )
}