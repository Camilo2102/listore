'use client';

import { AuthService } from "@/app/services/authService"
import { UserService } from "@/app/services/userService";
import { useEffect } from "react"


export default function Main() {
    const userServices = new UserService();

    useEffect(()=> {
        
    }, [])

    return(
        <div>
            holi
        </div>
    )
}
