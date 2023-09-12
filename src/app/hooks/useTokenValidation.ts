import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigationContext } from "../context/navigationContext";

import useAuthService from "./services/useAuthService";
import ResErrorHandler from "./utils/resErrorHandler";
import StorageService from "./services/storageService";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import {usePathname} from "next/navigation";

export default function useTokenValidator() {
    const {goToRoute} = useNavigationContext();
    const {validateToken} = useAuthService();
    const pathname = usePathname()
    const {authorized, setAuthorized} = useAuthContext();
    const {isValidRes} = ResErrorHandler();
    const {deleteStorage} = StorageService();
    const redirectToLogin = () => {
        deleteStorage();
        goToRoute('/pages/auth/login');
    }

    const itsInMainRoute = () => {
        return pathname.includes('main')
    }

    const validateTokenStatus = () => {
        if(!itsInMainRoute) {
            return;
        }
        if(authorized) {
            return;
        }
        validateToken().then(res => {
            if (!isValidRes(res)) {
                redirectToLogin();
            }
        })
    }

    const validateStatus = () => {
        if(!itsInMainRoute) {
            return true
        }
        if (!authorized) {
            redirectToLogin();
            return false;
        }
        return true;
    }

    useDidMountEffect(() => {
        if(!validateStatus())return;
        const intervalId = setInterval(validateTokenStatus, 30000);
        return () => clearInterval(intervalId);
    }, [authorized])

}