import { AuthProvider } from "../context/authContext";
import { LoadingProvider } from "../context/loadingContext";
import { NavigationProvider } from "../context/navigationContext";

export default function GlobalProviders ({children}: {children: React.ReactNode}) {
    return(
        <LoadingProvider>
          <NavigationProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </NavigationProvider>
        </LoadingProvider>
    ) 
}