'use client';

import TableGeneral from "@/app/components/tableGeneral";
import { StatusMap } from "@/app/constants/statusMap";
import UserFilterDTO from "@/app/dto/userFilterDTO";
import { useHandleInput } from "@/app/hooks/handleInput";
import ColumnMeta from "@/app/interfaces/columnMeta";
import User from "@/app/models/user";
import { useContext, useEffect, useState } from "react"
import { Dialog } from 'primereact/dialog';
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { userContext } from "./userContext";
import { RolesMap } from "@/app/constants/roleValues";
import { AuthUtil } from "@/app/utils/authUtil";
import DeleteWorker from "@/app/components/userComponents/DeleteWorker";
import Paginator from "@/app/interfaces/paginator";

import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import TitleTables from "@/app/components/titleTables";



export default function UserList({ props }: { props: any }) {
    const router = useRouter();

    const [users, setUsers] = useState<any[]>([]);
    const [userFilter, setUserFilter] = useHandleInput<User>({ active: "", company: { id: AuthUtil.getCredentials().company }, name: "", role: "" });
    const { user, setUser } = useContext(userContext);

    const [deleteUser, setDeleteUser] = useState<User | undefined>();

    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre', },
        { field: 'role', header: 'Rol', values: RolesMap },
        { field: 'active', header: 'Estado', values: StatusMap },
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                router.push("/pages/main/user/mainteance")
                setUser(t)
            }
        },
        {
            field: 'CRUDdelete', header: "Eliminar", action: (t: any) => {
                setDeleteUser(t);
            }
        }
    ];


    return (
        <>

            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Usuarios"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Link href={"/pages/main/user/mainteance"} >
                            <Button onClick={() => setUser(undefined)} label="Nuevo" icon="pi-user-plus"></Button>
                        </Link>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral baseFilter={userFilter} columns={columns} endpoint={Endpoints.USER}></TableGeneral>
                    </div>
                </div>
            </div>
            <DeleteWorker user={deleteUser} visible={deleteUser !== undefined} setVisible={setDeleteUser}></DeleteWorker>
        </>
    )
}
