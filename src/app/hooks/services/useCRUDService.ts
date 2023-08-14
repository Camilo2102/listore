import useCRUDFactory from "../useCRUDFactory";

export default function useCRUDService(endpoint: string){
    const basePetitions = useCRUDFactory<any>("api/" + endpoint);

    return{
        ...basePetitions
    }
}