'use client';

import { AuthService } from "@/app/services/authService"
import { useEffect } from "react"

export default function Main() {
    const authService = new AuthService();

    useEffect(()=> {
        authService.getAll().then(
            res => {
                if(res){
                    console.log(res);
                }
            }
        )
    }, [])

    return(
        <div>
            holi
        </div>
    )
}
