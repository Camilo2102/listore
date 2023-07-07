'use client';

import { AuthService } from "@/app/services/authService"
import { UserService } from "@/app/services/userService";
import { useEffect } from "react"


export default function Main() {
    const authService = new AuthService();
    const userServices = new UserService();

    useEffect(()=> {
        userServices.getAll().then(
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
