"use client"
import { useContext } from "react";
import { inventoryContext } from "../inventoryContext";
import RegisterInventory from "@/app/components/inventoryComponents/RegisterInventory";

export default function InventoryMainteance(){
    const {inventory, setInventory} = useContext(inventoryContext);
    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className='lg:col-6 md:col-6 col-12 p-8'>
                <RegisterInventory  inventorySelected={inventory}></RegisterInventory>
            </div>
            <div className="lg:col-6 md:col-6 hidden md:flex justify-content-center align-items-center">
                <img src='/registerInventory.svg' alt='Login' width={'80%'} style={{ maxWidth: '750px' }}></img>
            </div>
        </div>
    )
}