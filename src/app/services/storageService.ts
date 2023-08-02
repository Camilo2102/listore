import { Key } from "react";

export class StorageService{
    
    public static saveValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static getValue(value: string){
        return localStorage.getItem(value)
    }

    public static deleteValue(value: string){
        localStorage.removeItem(value)
    }
}