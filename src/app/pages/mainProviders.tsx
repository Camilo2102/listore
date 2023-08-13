import { AuthProvider } from "../context/authContext";
import { LoadingProvider } from "../context/loadingContext";
import { TableProvider } from "../context/tableContext";

export default function MainProviders({ children }: { children: React.ReactNode }) {
    return (<AuthProvider>
        <LoadingProvider>
            <TableProvider>
                {children}
            </TableProvider>
        </LoadingProvider>
    </AuthProvider>)
}