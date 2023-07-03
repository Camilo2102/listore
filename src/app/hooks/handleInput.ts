import { Dispatch, SetStateAction, useState } from "react";

/**
 * hook encargado de asignar los valores e ingresarlos sin importar la clase
 * @param initialValue importante pasar los datos inicializados en cero
 * @returns el valor y la funcion para asignarlos
 */
export function useHandleInput<T>(initialValue: T): [T, (partialT: Partial<T>) => void] {
  const [value, setValue] = useState<T>(initialValue);

  const setValuePartial = (partialT: Partial<T>) => {
    setValue((prevValue) => ({
      ...prevValue,
      ...partialT
    }));
  };

  return [value, setValuePartial];
}

