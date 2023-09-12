'use client';

import LoginComponent from '@/app/components/authComponents/loginComponent';
import Image from "next/image";

export default function Login() {

    return (
        <div className="flex justify-content-center align-items-center lg:p-8 md:p-6 p-1" style={{ height: '100vh', width: '100vw', overflow: "hidden" }}>
            <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                <img src='/login.svg' alt='Login'  style={{ maxWidth: '620px', width: '70%' }} />
            </div>
            <div className='lg:col-6 md:col-6 col-12 lg:p-8 md:p-10 p-4'>
                <LoginComponent></LoginComponent>
            </div>
        </div>
    )
}