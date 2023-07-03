'use client';

import { Card } from 'primereact/card';
import { FormEvent, useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/services/authService';
import { handleForm } from '@/app/hooks/handleForm';
import Validators from '@/models/formModels/validators';
import FormControl from '@/models/formModels/formControl';
import InputForm from '@/app/components/formComponents/inputForm';
import PasswordForm from '@/app/components/formComponents/passwordForm';
import { AuthUtil } from '@/app/utils/authUtil';

export default function Login() {
    const router = useRouter();

    const authService: AuthService = new AuthService();

    /**
     * Instancia inicial de los formcontrols
     */
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "mail",
                value: "",
                description: "Correo",
                validators: [Validators.requiered, Validators.maxLenght, Validators.minLenght],
                invalid: false,
                message: true,
                maxLenght: 10,
                minLenght: 3
            },
            {
                field: "password",
                value: "",
                description: "Contraseña",
                validators: [Validators.requiered],
                invalid: false,
                message: true,
                maxLenght: 10,
                minLenght: 3
            }
        ]
    );

    /**
     * hook para la creacion y validacion de form, los parametros indican lo siguiente 1. valor accesible, 2. funcion para asignar valor, 3. un objeto a desestructurar, que tiene los fromcontrolls actualizados y el estado, ver ejemplo
     */
    const [credential, setCredential,  validateFormControls] = handleForm(controls);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);    
    
        if(valid){
            authService.login(credential).then(res => {
                AuthUtil.setCredentials(res.token);
                router.push("/pages/main")
            })
        }

    }


    useEffect(() => {
        
    }, [])


    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card title="Iniciar Sesión">
                <form onSubmit={(e) => handleLogin(e)}>
                    <div className='py-5'>
                        <InputForm formControl={controls[0]} value={credential} onValueChange={(mail) => {setCredential(mail)}}></InputForm>
                    </div>
                    <div className='py-5'>
                        <PasswordForm formControl={controls[1]} value={credential} onValueChange={(password) => {setCredential(password)}}></PasswordForm>
                    </div>
                    <div className='text-center'>
                        <Button type='submit' label="Primary" />
                    </div>
                </form>
            </Card>
        </div>
    )
}