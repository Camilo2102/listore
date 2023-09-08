import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigationContext } from "../context/navigationContext";

import useAuthService from "./services/useAuthService";
import ResErrorHandler from "./utils/resErrorHandler";
import StorageService from "./services/storageService";

export default function useTokenValidator() {
    const {goToRoute} = useNavigationContext();
    const {validateToken} = useAuthService();
    const {authorized, setAuthorized} = useAuthContext();
    const {isValidRes} = ResErrorHandler();
    const {deleteStorage} = StorageService();
    const redirectToLogin = () => {
        deleteStorage();
        goToRoute('/pages/auth/login');
    }

    const validateTokenStatus = () => {
        if(authorized !== false) {
            return;
        }
        validateToken().then(res => {
            if (!isValidRes(res)) {
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