import { createContext, useContext, useState } from "react";

type context = {
    isLoading: boolean
    startLoading: () => void
    stopLoading: () => void
}

const LoadingContext = createContext<context>({} as context);

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}