
import { createContext } from "react";

type productContext = {
    product: any | undefined;
    setProduct: (product: any | undefined) => void
}

export const productContext = createContext<productContext>(
    {} as productContext);