'use client';

import { AuthService } from "@/app/services/authService"
import { useEffect } from "react"

export default function Main() {
    useEffect(()=> {
        AuthService.getCredentials().then(
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
