'use client';

import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { StatusMap } from "@/app/constants/statusMap";
import { useHandleInput } from "@/app/hooks/useHandleInput";
import ColumnMeta from "@/app/interfaces/columnMeta";
import User from "@/app/models/user";
import { useContext, useEffect, useState } from "react"
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { userContext } from "./userContext";
import { RolesMap } from "@/app/constants/roleValues";
import DeleteWorker from "@/app/components/userComponents/DeleteWorker";
import { Endpoints } from "@/app/constants/endpointsConstants";
import TitleTables from "@/app/components/titleTables";
import { useTableContext } from "@/app/context/tableContext";
import RegisterUser from "@/app/components/authComponents/registerUser";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useNavigationContext } from "@/app/context/navigationContext";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import AuthUtil from "@/app/hooks/utils/authUtils";
import RegisterWorker from "@/app/components/userComponents/RegisterWorker";

export default function UserList() {
    const { goToRoute } = useNavigationContext();

    const [users, setUsers] = useState<any[]>([]);
    const { getCredentials } = AuthUtil();
    const userFilter: FilterMeta = {
        required: {
            company: { id: getCredentials().company },
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
                
                setUser(t);
                setVisible(true);
            }
        },
        {
            field: 'CRUDdelete', header: "Desactivar", action: (t: any) => {
                setDeleteUser(t);
                setReloadData(true);
            }
        }
    ];


    useDidMountEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    },
        [visible])


    const handleNewWorker = () => {
        setVisible(true);
        setUser(undefined);

    }

    return (
        <>

            <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Usuarios"></TitleTables>
                    <div className="col-12 flex justify-content-start">

                        <Button onClick={handleNewWorker} label="Nuevo" icon="pi pi-user-plus"></Button>

                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral baseFilter={userFilter} columns={columns} endpoint={Endpoints.USER}></TableGeneral>
                    </div>
                </div>
            </div>
            <DeleteWorker user={deleteUser} visible={deleteUser !== undefined} setVisible={setDeleteUser}></DeleteWorker>
            {visible && <RegisterWorker  userSelected={user} visible={visible} setVisible={setVisible} />}
        </>
    )
}
