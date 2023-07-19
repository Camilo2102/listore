import SupplierModel from "@/app/models/supplier";
import { SupplierService } from "@/app/services/supplierService";
import { AuthUtil } from "@/app/utils/authUtil";
import { useRouter } from "next/router";
import { useState } from "react";
import Company from '../../../models/company';

export default function Supplier({props}: {props: any}){
    const router = useRouter();
    const supplierService = new SupplierService();
    const [suppliers, setSuppliers] = useState<any[]>([]);

    const [supplierFilter, setSupplierFilter] = useState<SupplierModel>({
        name: "",
        description: "",
        address: "",
        phone: 0,
        mail: "",
        inventory:{
            id: AuthUtil.getCredentials().Company,
            name: "",
            description: "",
            category: "",
            company:{
                id: AuthUtil.getCredentials().company
            }
        }
    })
}