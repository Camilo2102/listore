export class StorageService<T>{

    public static saveValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static getValue(value: string){
        return localStorage.getItem(value)
    }

    public static deleteValue(value: string){
        localStorage.removeItem(value)
    }

    public static deleteStorage(){
        localStorage.clear();
    }
}
