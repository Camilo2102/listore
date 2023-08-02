import { useState } from "react";
import { StorageService } from "../services/storageService";

export const handleContext = (key: string) => {
    const [value, setValue] = useState<any | undefined>(undefined);


    const setValueAndStore = (t: any) => {
        setValue(t);
        if(t === undefined) {
            return StorageService.deleteValue(key);
        }
        
        StorageService.saveValue(key, JSON.stringify(t));
    }

    return [value, setValueAndStore];
}