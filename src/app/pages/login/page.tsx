'use client';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import {  useEffect, useState } from 'react';
import CredentialModel from '@/models/credential';

import { AuthService } from '@/app/services/authService';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { handleInput } from '@/app/utils/handleInput';
import { ToastService } from '@/app/services/toastService';

export default function Login() {
    const router = useRouter();

    const [credential, setCredential] = useState<CredentialModel>({
        mail: '',
        password: ''
    });
    
    const handleLogin = () => {
        AuthService.login(credential).then(res => {
            if(res) {
                localStorage.setItem('token', res.token);
                router.push('/pages/main');
            }
        })
    }

    useEffect(() => {
        localStorage.removeItem('token');
    }, [])
    

    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card title="Iniciar Sesión">
                <div className='py-5'>
                    <span className="p-float-label">
                        <InputText id="mail" value={credential?.mail} onChange={(e) => handleInput({...credential, mail: e.target.value }, setCredential)} />
                        <label htmlFor="mail">Correo o usuario</label>
                    </span>
                </div>
                <div className='py-5'>
                    <span className="p-float-label">
                        <Password inputId="password" value={credential?.password} onChange={(e) =>  handleInput({...credential, password: e.target.value }, setCredential)} />
                        <label htmlFor="password">Password</label>
                    </span>
                </div>
                <div className='text-center'>
                    <Button onClick={handleLogin} label="Primary" />
                </div>
            </Card>
        </div>
    )
}