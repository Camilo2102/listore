export default function StorageService() {
    const saveValue = (key: string, value: string) => {
        localStorage.setItem(key, value);
    }

    const getValue = (value: string) => {
        return localStorage.getItem(value);
    }

    const deleteValue = (value: string) => {
        localStorage.removeItem(value);
    }

    const deleteStorage = () => {
        localStorage.clear();
    }

    return{
        saveValue,
        getValue,
        deleteValue,
        deleteStorage
    }
}
