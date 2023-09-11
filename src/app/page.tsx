"use client"

import { useEffect } from "react";
import { useNavigationContext } from "./context/navigationContext";

export default function MainPage () {
    const {goToRoute} = useNavigationContext();
    useEffect(() => {
        goToRoute("/pages/auth/login")
        //eslint-disable-next-line
    }, [])

    return(
        <></>
    );
}