export default function useDeepCopy(object: any){
    return JSON.parse(JSON.stringify(object));
}