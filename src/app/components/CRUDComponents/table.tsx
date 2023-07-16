'use client';

export default function Table ({nombre, apellido}: {nombre: string, apellido: string}){
    return(
        <>
            <h1>Table</h1>
            {apellido + nombre}
        </>
    )
}