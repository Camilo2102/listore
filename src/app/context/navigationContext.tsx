import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useLoading } from "./loadingContext";

type NavigationContextType = {
    goToRoute: (route: string) => void;
}

export const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);
  

export function useNavigationContext() {
    return useContext(NavigationContext);
}

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    
    const {startLoading, stopLoading} = useLoading();
  
    const goToRoute = (path: string) => {
      startLoading();
      router.push(path);
    }
  
    useEffect(() => {
      const url = `${pathname}`
      stopLoading();
    }, [pathname])
  
    return (<NavigationContext.Provider value={{goToRoute}}>
      {children}
        </NavigationContext.Provider>
    );
  }