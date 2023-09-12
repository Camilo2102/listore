import { AuthProvider } from "../context/authContext";
import { LoadingProvider } from "../context/loadingContext";
import { NavigationProvider } from "../context/navigationContext";
import ToastProvider from "../context/toastContext";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <NavigationProvider>
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </NavigationProvider>
    </LoadingProvider>
  )
}