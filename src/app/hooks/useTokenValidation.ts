import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigationContext } from "../context/navigationContext";
import { StorageService } from "../services/storageService";
import { ResErrorHandler } from "../utils/resErrorHandler";
import useAuthService from "./services/useAuthService";

export default function useTokenValidator() {
    const {goToRoute} = useNavigationContext();
    const {validateToken} = useAuthService();
    const {authorized, setAuthorized} = useAuthContext();

    const redirectToLogin = () => {
        StorageService.deleteStorage();
        goToRoute('/pages/auth/login');
    }

    const validateTokenStatus = () => {
        if(authorized !== false) {
            return;
        }
        validateToken().then(res => {
            if (!ResErrorHandler.isValidRes(res)) {
                redirectToLogin();
            }
        })
    }

    const validateStatus = () => {
        if (!authorized) {
            redirectToLogin();
            return false;
        }
        return true;
    }

    useEffect(() => {
        if(!validateStatus())return;
        validateTokenStatus();
        const intervalId = setInterval(validateToken, 30000);
        return () => clearInterval(intervalId);
    }, [authorized])

}