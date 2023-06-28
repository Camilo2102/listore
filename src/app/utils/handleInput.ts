import { Dispatch, SetStateAction } from "react";

/**
 * 
 * @param actualValue la copia del objeto, en este caso el state del use state con spread operator (...)
 * @param setFunction el setState para asignar el valor
 */
export const handleInput = (actualValue: any, setFunction: Dispatch<SetStateAction<any | undefined>>) => {
    setFunction(actualValue);
}