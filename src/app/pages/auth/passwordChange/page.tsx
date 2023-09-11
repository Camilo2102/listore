"use client"
import PasswordChangeComponent from "@/app/components/authComponents/passwordChangeComponent";
import Image from "next/image";

export default function PasswordChange() {
    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                <Image src='/passwordChange.svg' alt='Login' width={1800} height={1800} style={{ maxWidth: '620px', width: '70%' }}></Image>
            </div>
            <div className='lg:col-6 md:col-6 col-12'>
                <PasswordChangeComponent></PasswordChangeComponent>
            </div>
        </div>
    )
}