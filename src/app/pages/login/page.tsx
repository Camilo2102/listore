'use client';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import {  useEffect, useState } from 'react';
import CredentialModel from '@/models/credential';

import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { useHandleInput } from '@/app/utils/handleInput';
import { ToastService } from '@/app/services/toastService';
import { AuthService } from '@/app/services/authService';

export default function Login() {
    const router = useRouter();

    const [credential, setCredential] = useHandleInput<CredentialModel>({mail: '', password: ''});

    const authService: AuthService = new AuthService();
    
    const handleLogin = () => {
        authService.login(credential).then(res => {
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
                        <InputText id="mail" value={credential?.mail} onChange={(e) => setCredential({mail: e.target.value})} />
                        <label htmlFor="mail">Correo o usuario</label>
                    </span>
                </div>
                <div className='py-5'>
                    <span className="p-float-label">
                        <Password inputId="password" value={credential?.password} onChange={(e) =>  setCredential({password: e.target.value}) } />
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