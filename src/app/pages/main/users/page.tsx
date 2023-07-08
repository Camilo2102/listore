'use client';

import TableGeneral from "@/app/components/tableGeneral";
import { RolesMap } from "@/app/constants/roleMap";
import { StatusMap } from "@/app/constants/statusMap";
import UserFilterDTO from "@/app/dto/userFilterDTO";
import { useHandleInput } from "@/app/hooks/handleInput";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { UserService } from "@/app/services/userService";
import User from "@/models/user";
import { useEffect, useState } from "react"


export default function Users() {
    const userServices = new UserService();

    const [users, setUsers] = useState<User[]>([]);
    const [userFilter, setUserFilter] = useHandleInput<UserFilterDTO>({active: "", companyId: "", name: "", role: ""});

    const columns: ColumnMeta[] = [
        {field: 'name', header: 'Nombre',},
        {field: 'role', header: 'Rol', values: RolesMap},
        {field: 'active', header: 'Estado', values: StatusMap},
    ];

    useEffect(() => {
        userServices.getAllByFilter(true, 0, 10, userFilter).then(res => setUsers(res));
    }, [userFilter])

    return(
        <div>
            <TableGeneral columns={columns} values={users}></TableGeneral>
        </div>
    )
}
