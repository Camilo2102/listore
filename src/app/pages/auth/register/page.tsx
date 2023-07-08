"use client"

import RegisterCompany from "@/app/components/authComponents/registerCompany";
import RegisterUser from "@/app/components/authComponents/registerUser";
import RegisterUserDTO from "@/app/dto/registerUserDTO";
import { useHandleInput } from "@/app/hooks/handleInput";
import { AuthService } from "@/app/services/authService";
import { ToastService } from "@/app/services/toastService";
import Company from "@/models/company";
import CredentialModel from "@/models/credential";
import User from "@/models/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
    const router = useRouter();
    const authService: AuthService = new AuthService();
    const [part, setPart] = useState<number>(0);

    const [user, setUser] = useHandleInput<User>({name: "", role: "M"});
    const [credential, setCredential] = useHandleInput<CredentialModel>({mail: "", password: "", userName: ""});
    const [company, setCompany] = useHandleInput<Company>({name: "", description: "", phone: ""});


    const handlePartialSumbit = (part: number, value: any) => {
        setPart(part);
        const {name, userName, mail, password} = value;
        setUser({name});
        setCredential({userName, mail, password});
    }

    const handleRegister = (value:any) => {
        setCompany(value);

        authService.register({user: user, credential: credential, company: value}).then(
            res => {
                ToastService.showSuccess("S", "Creado con exito");
                router.push("/pages/auth/login")
            }
        )
    }

    const selectRegisterPart = () => {
        if (part === 0) {
            return (
                <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
                    <div className='lg:col-6 md:col-6 col-12 p-8'>
                        <RegisterUser onValidSubmit={(part, value) => handlePartialSumbit(part, value)}></RegisterUser>
                    </div>
                    <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                        <img src='/registerUser.svg' alt='Login' width={'80%'} style={{ maxWidth: '750px' }}></img>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
                    <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                        <img src='/registerCompany.svg' alt='Login' width={'80%'} style={{ maxWidth: '750px' }}></img>
                    </div>
                    <div className='lg:col-6 md:col-6 col-12 p-8'>
                        <RegisterCompany onValidSubmit={(value: any) => handleRegister(value)}></RegisterCompany>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {}, [part])


    return (
       selectRegisterPart()
    )
}