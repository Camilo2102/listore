'use client';

import TableGeneral from "@/app/components/tableGeneral";
import { StatusMap } from "@/app/constants/statusMap";
import UserFilterDTO from "@/app/dto/userFilterDTO";
import { useHandleInput } from "@/app/hooks/handleInput";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { UserService } from "@/app/services/userService";
import User from "@/models/user";
import { useContext, useEffect, useState } from "react"
import { Dialog } from 'primereact/dialog';
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { userContext } from "./userContext";
import { RolesMap } from "@/app/constants/roleValues";
import { AuthUtil } from "@/app/utils/authUtil";



export default function UserList({ props }: { props: any }) {
    const userServices = new UserService();
    const router = useRouter();

    const [users, setUsers] = useState<any[]>([]);
    const [userFilter, setUserFilter] = useHandleInput<UserFilterDTO>({ active: "", companyId: AuthUtil.getCredentials().company, name: "", role: "" });

    const { user, setUser } = useContext(userContext);



    const columns: ColumnMeta[] = [
        { field: 'name', header: 'Nombre', },
        { field: 'role', header: 'Rol', values: RolesMap },
        { field: 'active', header: 'Estado', values: StatusMap },
        {
            field: 'CRUDupdate', header: 'Actualizar', action: (t: any) => {
                {
                    router.push("/pages/main/user/mainteance")
                    setUser(t)
                }
            }
        },
    ];

    useEffect(() => {
        userServices.getAllByFilter(true, 0, 10, userFilter).then(res => {
            const temporal = res.map(r => ({ ...r.credential, ...r }))
            setUsers(temporal);
        }

        );
    }, [userFilter])

    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="grid" style={{ width: '90%' }}>
                <div className="col-12 flex justify-content-start">
                    <Link href={"/pages/main/user/mainteance"} >
                        <Button onClick={() => setUser(undefined)} label="Nuevo"></Button>
                    </Link>
                </div>
                <div className="col-12 flex justify-content-center">
                    <TableGeneral columns={columns} values={users}></TableGeneral>
                </div>
            </div>
        </div>
    )
}
