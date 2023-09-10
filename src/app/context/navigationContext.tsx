import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useLoading } from "./loadingContext";

type NavigationContextType = {
    goToRoute: (route: string) => void;
    version?: string;
}

export const NavigationContext = createContext<NavigationContextType>({} as NavigationContextType);
  

export function useNavigationContext() {
    return useContext(NavigationContext);
}

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams();
    
    const {startLoading, stopLoading} = useLoading();
    const [version, setVersion] = useState<string>("");

    const pathWithVersion = (path: string) => {
      if(version !== "") {
        path += `?version=${version}`
      }

      return path;
    }
  
    const goToRoute = (path: string) => {
      startLoading();
      const modifiedPath = pathWithVersion(path);
      if(pathname === modifiedPath){
        return stopLoading();
      }
      
      router.push(modifiedPath);
    }

    const getVersion = () => {
      const paramVersion = params.get("version");
      setVersion("");
      if(paramVersion) {
        setVersion(paramVersion)
      }
    }
  
    useEffect(() => {
      getVersion();
      stopLoading();
    }, [pathname, params])
  
    return (<NavigationContext.Provider value={{goToRoute, version}}>
      {children}
        </NavigationContext.Provider>
    );
  }