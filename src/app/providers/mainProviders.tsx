import { AuthProvider } from "../context/authContext";
import { LoadingProvider } from "../context/loadingContext";
import ToastProvider from "../context/toastContext";
import { TableProvider } from "../context/tableContext";
import useTokenValidator from "../hooks/useTokenValidation";

export default function MainProviders({ children }: { children: React.ReactNode }) {
    useTokenValidator();

    return (
        <TableProvider>
            {children}
        </TableProvider>
    )
}