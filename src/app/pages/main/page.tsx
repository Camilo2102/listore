'use client';

import { UserService } from "@/app/services/userService";
import { useEffect } from "react"


export default function Main() {
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
