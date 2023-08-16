'use client';

import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { StatusMap } from "@/app/constants/statusMap";
import { useHandleInput } from "@/app/hooks/handleInput";
import ColumnMeta from "@/app/interfaces/columnMeta";
import User from "@/app/models/user";
import { useContext, useEffect, useState } from "react"
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { userContext } from "./userContext";
import { RolesMap } from "@/app/constants/roleValues";
import { AuthUtil } from "@/app/utils/authUtil";
import DeleteWorker from "@/app/components/userComponents/DeleteWorker";
import { Endpoints } from "@/app/constants/endpointsConstants";
import TitleTables from "@/app/components/titleTables";
import { useTableContext } from "@/app/context/tableContext";
import RegisterUser from "@/app/components/authComponents/registerUser";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useNavigationContext } from "@/app/context/navigationContext";

export default function UserList({ props }: { props: any }) {
    const {goToRoute}= useNavigationContext();

    const [users, setUsers] = useState<any[]>([]);
    
    const userFilter: FilterMeta = {
        required: {
            company: { id: AuthUtil.getCredentials().company },
        },
        values: [
            { field: 'active', label: 'Estado', value: '' },
            { field: 'name', label: 'Nombre', value: '' },
            { field: 'role', label: 'Rol', value: '' }
        ]

    }
    const { user, setUser } = useContext(userContext);
    const { reloadData, setReloadData } = useTableContext();
    const [deleteUser, setDeleteUser] = useState<User | undefined>();
    const [visible, setVisible] = useState<boolean>(false);
    

    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre', },
        { field: 'role', header: 'Rol', values: RolesMap },
        { field: 'active', header: 'Estado', values: StatusMap },
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                goToRoute("/pages/main/user/mainteance")
                setUser(t)
            }
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                setDeleteUser(t);
            }
        }
    ];

    const handleNewSale = () => {
        setVisible(true);
        setUser(undefined)
    }

    useEffect(() => {
        if(!visible){
            setReloadData(true);
        }
    }, 
    [visible])


    return (
        <>

            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Usuarios"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Link href={"/pages/main/user/mainteance"} >
                            <Button onClick={() => setUser(undefined)} label="Nuevo" icon="pi pi-user-plus"></Button>
                        </Link>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral baseFilter={userFilter} columns={columns} endpoint={Endpoints.USER}></TableGeneral>
                    </div>
                </div>
                {}
            </div>
            <DeleteWorker user={deleteUser} visible={deleteUser !== undefined} setVisible={setDeleteUser}></DeleteWorker>
           
        </>
    )
}
