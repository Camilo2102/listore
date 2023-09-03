"use client"

import NavBar from "@/app/components/navBar";
import { MainProvider } from "../../context/mainContext";
import { AuthProvider } from "@/app/context/authContext";
import Supplier from "./inventory/supplier/page";
import { SupplierProvider } from "../../context/supplierContext";
import { ProductProvider } from "@/app/context/productContext";
import { SubProductProvider } from "@/app/context/subProductContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainProvider>
            <SupplierProvider>
                <ProductProvider>
                    <SubProductProvider>
                    <NavBar />
                    <div className="lg:ml-5 md:ml-6">
                        {children}
                    </div>
                    </SubProductProvider>
                </ProductProvider>
            </SupplierProvider>
        </MainProvider>
    )
}