"use client"
import PasswordChangeComponent from "@/app/components/authComponents/passwordChangeComponent";

export default function PasswordChange() {
    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                <img src='/passwordChange.svg' alt='Login' width={'70%'} style={{maxWidth: '620px'}}></img>
            </div>
            <div className='lg:col-6 md:col-6 col-12 p-8'>
                <PasswordChangeComponent></PasswordChangeComponent>
            </div>
        </div>
    )
}