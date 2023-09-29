'use client';
import { useContext, useState } from "react";
import { useProductContext } from "../../../context/productContext";
import ColumnMeta from "@/app/interfaces/columnMeta";
import NavBar from "@/app/components/navBar";
import { Button } from "primereact/button";
import TableGeneral from "@/app/components/tableComponents/tableGeneral";
import { userContext } from "../user/userContext";
import { buyContext } from "./buyContext";
import RegisterBuy from "@/app/components/buyComponents/registerBuy";
import { Endpoints } from "@/app/constants/endpointsConstants";
import { useTableContext } from "@/app/context/tableContext";
import TitleTables from "@/app/components/titleTables";
import FilterMeta from "@/app/interfaces/filterMeta";
import { useFormats } from "@/app/constants/formatConstants";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import AuthUtil from "@/app/hooks/utils/authUtils";
import StorageService from "@/app/hooks/services/storageService";
import { FormTypes } from "@/app/constants/formTypeConstant";
import DateUtil from "@/app/hooks/utils/dateUtils";

export default function BuyPage() {
    const { product, setProduct } = useProductContext();
    const { user, setUser } = useContext(userContext);

    const { reloadData, setReloadData } = useTableContext();

    const { formatDate, formatCurrency, formatDetail } = useFormats();

    const [visible, setVisible] = useState<boolean>(false);
    const { getCredentials } = AuthUtil();


    const {addDaysFromNow, getInitialDate} = DateUtil();
    const { getValue } = StorageService();
    const role = getValue("role");

    const buyFilter: FilterMeta = {
        values: [
            { field: "price", label: "Precio", value: 0 },
            { field: "amount", label: "Cantidad", value: 0 },
            { field: "initialDate", label: "Fecha Inicial", value: null },
            { field: "finalDate", label: "Fecha Final", value: null },
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
        required: {
            user: {
                id: role === 'M' || role === 'C' ? undefined : getCredentials().user,
                company: {
                    id: getCredentials().company
                },
            },
            initialDate: getInitialDate(),
            finalDate: addDaysFromNow(1),
        }

    }
    const { setBuy } = useContext(buyContext);

    const columns: ColumnMeta[] = [
        { field: 'buyDate', header: 'Fecha de compra', format: formatDate },
        { field: 'nameProduct', header: 'Producto' },
        { field: "details", header: 'Detalle', format: formatDetail },
        { field: 'price', header: 'Precio', format: formatCurrency },
        { field: 'amount', header: 'Cantidad' },
        { field: 'totalValue', header: 'Valor total', format: formatCurrency },
        ...(role === 'M' || role === 'C'
            ? [{ field: 'nameUser', header: 'Usuario' }] : []
        ),
    ];

    const handleNewBuy = () => {
        setVisible(true);
        setBuy(undefined)
    }

    useDidMountEffect(() => {
        if (!visible) {
            setReloadData(true);
        }
    }, [visible])

    const customMap = (buys: any) => {
        const nameUser = buys.user.name;
        const nameProduct = buys?.kindOfProduct?.product?.name;

        const details: any = {};
        buys.kindOfProduct.characteristics.forEach((res: any) => {
            details[res.name] = res.value;
        })

        const totalValue = buys.price * buys.amount;
        return { ...buys, nameProduct: nameProduct, totalValue: totalValue, details: details, nameUser: nameUser, }
    }


    return (
        <>
            <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh', overflowY: 'auto' }}>
                <div className="grid" style={{ width: '90%' }}>
                    <TitleTables title="Compras"></TitleTables>
                    <div className="col-12 flex justify-content-start">
                        <Button onClick={handleNewBuy} label="Nuevo" icon='pi pi-plus'></Button>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <TableGeneral columns={columns} baseFilter={buyFilter} endpoint={Endpoints.BUY} customMap={customMap}></TableGeneral>
                    </div>
                </div>
                {visible && <RegisterBuy visible={visible} setVisible={setVisible} />}
            </div>
        </>
    )

}