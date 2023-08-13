"use client"

import RegisterCompany from "@/app/components/authComponents/registerCompany";
import RegisterUser from "@/app/components/authComponents/registerUser";
import RegisterUserDTO from "@/app/dto/registerUserDTO";
import { useHandleInput } from "@/app/hooks/handleInput";
import { ToastUtil } from "@/app/utils/toastUtil";
import Company from "@/app/models/company";
import CredentialModel from "@/app/models/credential";
import User from "@/app/models/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Messages } from "@/app/constants/messageConstant";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import useAuthService from "@/app/hooks/services/useAuthService";

export default function Register() {
    const router = useRouter();
    const {register} = useAuthService();
    const [part, setPart] = useState<number>(0);

    const [user, setUser] = useHandleInput<User>({active: "N", name: "", role: "M"});
    const [credential, setCredential] = useHandleInput<CredentialModel>({mail: "", password: "", userName: ""});
    const [company, setCompany] = useHandleInput<Company>({name: "", description: "", phone: ""});
    const [submited, setSubmited] = useState<boolean>();


    const handlePartialSumbit = (part: number, value: any) => {
        setPart(part);
        const {name, userName, mail} = value;
        setUser({name});
        setCredential({userName, mail, password: null});
    }

    const handleRegister = (value:any) => {
        setCompany(value);
        setSubmited(true);
    }

    const selectRegisterPart = () => {
        if (part === 0) {
            return (
                <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
                    <div className='lg:col-6 md:col-6 col-12 p-8'>
                        <RegisterUser onValidSubmit={(part, value) => handlePartialSumbit(part, value)}></RegisterUser>
                    </div>
                    <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                        <img src='/registerUser.svg' alt='register' width={'80%'} style={{ maxWidth: '750px' }}></img>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
                    <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                        <img src='/registerCompany.svg' alt='register' width={'80%'} style={{ maxWidth: '750px' }}></img>
                    </div>
                    <div className='lg:col-6 md:col-6 col-12 p-8'>
                        <RegisterCompany onValidSubmit={(value: any) => handleRegister(value)}></RegisterCompany>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        if(submited){
            register({user: user, credential: credential, company: company}).then(
                res => {
                    if(!ResErrorHandler.isValidRes(res)){
                        return;
                     }
                    ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, "Creado con exito");
                    router.push("/pages/auth/passwordChange?token="+res.temporalToken);
                }
            )
        } 
    }, [part, submited])


    return (
       selectRegisterPart()
    )
}