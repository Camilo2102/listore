'use client';

import TableGeneral from "@/app/components/tableGeneral";
import { RolesMap } from "@/app/constants/roleMap";
import { StatusMap } from "@/app/constants/statusMap";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { UserService } from "@/app/services/userService";
import User from "@/models/user";
import { useEffect, useState } from "react"


export default function Users() {
    const userServices = new UserService();

    const [users, setUsers] = useState<User[]>([]);

    const columns: ColumnMeta[] = [
        {field: 'name', header: 'Nombre'},
        {field: 'role', header: 'Rol', values: RolesMap},
        {field: 'active', header: 'Estado', values: StatusMap},
    ];

    useEffect(() => {
        userServices.getAllByFilter(true, 0, 10, {companyId: "bbca48aa-af36-4d3d-b0a4-a21453890c95"}).then(res => setUsers(res));
    }, [])

    return(
        <div>
            <TableGeneral columns={columns} values={users}></TableGeneral>
        </div>
    )
}
