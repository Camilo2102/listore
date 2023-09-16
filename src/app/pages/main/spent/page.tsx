'use client';
import { useContext, useState } from "react";
import ColumnMeta from "@/app/interfaces/columnMeta";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { userContext } from "../user/userContext";
import { spentContext } from "./spentContext";
import RegisterSpent from "@/app/components/spentComponets/registerSpent";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useFormats } from "@/app/constants/formatConstants";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import AuthUtil from "@/app/hooks/utils/authUtils";
import StorageService from "@/app/hooks/services/storageService";
import { FormTypes } from "@/app/constants/formTypeConstant";

export default function SpentPage() {
    const [visible, setVisible] = useState<boolean>(false);
    const { getCredentials } = AuthUtil();
    const { formatDate } = useFormats();

    const { setReloadData } = useTableContext();

    const { getValue } = StorageService();
    const role = getValue("role");
    const spentFilter: FilterMeta = {
        required: {
            user: {
                id: role === 'M' || role === 'C' ? undefined : getCredentials().user,
                company: {
                    id: getCredentials().company
                },
            },
            spentDate: new Date(),
        },
        values: [
            { field: "price", label: "Precio", value: 0 },
            { field: "description", label: "Descripcion", value: "" },
            ...(role === 'M' || role === 'C'
                ? [{
                    field: "user", label: "Usuario", value: null, formControl: {
                        field: "user",
                        value: "",
                        description: "Usuario",
                        colSize: 12,
                        type: FormTypes.INPUTHELPER,
                        validators: [],
                        invalid: false,
                        message: true,
                        columns: [
                            { field: 'name', header: 'Nombre' },
                        ],
                        icon: "pi-user",
                        service: Endpoints.USER,
                        filter: {
                            values: [],
                            required: {
                                company: {
                                    id: getCredentials().company
                                },
                            }
                        },
                    },
                }

                ] : []
            ),
        ],
    }

    const { setSpent } = useContext(spentContext);

    const columns: ColumnMeta[] = [
        { field: 'spentDate', header: 'Fecha de gasto' },
        { field: 'price', header: 'Precio' },
        { field: 'description', header: 'Descripción' },
        ...(role === 'M' || role === 'C'
            ? [{ field: 'nameUser', header: 'Usuario' }] : []
        ),
    ];


    const handleNewSpent = () => {
        setVisible(true);
        setSpent(undefined)
    }

    useDidMountEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    },
        [visible])

    const customMap = (spents: any) => {
        const nameUser = spents.user.name;
        return { ...spents, spentDate: formatDate(spents.spentDate), nameUser: nameUser }
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Gastos"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewSpent} label="Nuevo" icon="pi pi-plus"></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={spentFilter} endpoint={Endpoints.SPENT} customMap={customMap}></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterSpent visible={visible} setVisible={setVisible} />}
            </div>

        </>
    )

}