export default function ResErrorHandler() { 
    const isValidRes = (res:any) =>{
        return res !== undefined
    }

    return{
        isValidRes
    }
}