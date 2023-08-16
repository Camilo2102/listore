import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { productContext } from "@/app/pages/main/inventory/product/productContext";
import { ToastUtil } from "@/app/utils/toastUtil";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import ProductModel from "@/app/models/product";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import User from "@/app/models/user";
import { AuthUtil } from "@/app/utils/authUtil";
import { saleContext } from "@/app/pages/main/sale/saleContext";
import { CRUDFactory } from "@/app/models/CRUDFactory";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import TableGeneral from "../tableComponents/tableGeneral";
import { useHandleInput } from "@/app/hooks/handleInput";
import Paginator from "@/app/interfaces/paginator";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Endpoints } from "@/app/constants/endpointsConstants";
import useCRUDService from "@/app/hooks/services/useCRUDService";

export default function RegisterSale({ visible, setVisible }: { visible: boolean, setVisible: (partialT: Partial<boolean>) => void }) {

    const [sales, setSales] = useState<any[]>([]);

    const [newSaleVisible, setNewSaleVisible] = useState(false);

    const { createAll } = useCRUDService(Endpoints.SALE);

    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "unitaryValue",
                value: "",
                description: "Valor unitario",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "amount",
                value: "",
                description: "Cantidad",
                colSize: 6,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-user"
            },
            {
                field: "inventory",
                value: "",
                description: "Inventario",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                columns: [
                    { field: 'name', header: 'Nombre' },
                    { field: 'description', header: 'Descripcion' },
                    { field: 'category', header: 'Categoria' },
                ],
                icon: "pi-user",
                service: Endpoints.INVENTORY,
                filter: {
                    category: "",
                    description: "",
                    name: "",
                    company: {
                        id: AuthUtil.getCredentials().company
                    }
                },
                fieldDependency: "product"
            },
            {
                field: "product",
                value: "",
                description: "Producto",
                colSize: 6,
                type: FormTypes.INPUTHELPER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                columns: [
                    { field: 'name', header: 'Nombre' },
                    { field: 'description', header: 'Descripcion' },
                ],
                icon: "pi-user",
                service: Endpoints.PRODUCT,
                disabled: true,
                filter: {

                }
            },
        ]
    );


    const [saleToRegister, form, setSaleToRegister, validateFormControls] = handleForm(controls);

    const { sale, setSale } = useContext(saleContext);

    const [submited, setSubmited] = useState<boolean>(false);
    /*  const handleBuy = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const [formControls, valid] = validateFormControls();
  
          setControls([...formControls]);
          if (valid) {
              saleToRegister.user = new User();
              saleToRegister.user.id = AuthUtil.getCredentials().user;
              saleToRegister.inventory = undefined;
              saleToRegister.product = {
                  id: saleToRegister.product
              }
              saleService.create(true, saleToRegister).then(
                  res => {
                      if (!ResErrorHandler.isValidRes(res)) {
                          return;
                      }
                      ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, sale ? Messages.MESSAGE_CREATE_SUCCESS : Messages.MESSAGE_UPDATE_SUCCESS)
                      setVisible(false)
                      setSubmited(false)
                      setSale(undefined)
                  }
              )
          }
      }*/
    useEffect(() => {
        if (sale !== undefined && !submited) {


            setSaleToRegister(sale)
        }
    }, [submited])


    const columns: ColumnMeta[] = [
        { field: 'nameInventory', header: 'Inventario' },
        { field: 'nameProduct', header: 'Producto' },
        { field: 'amount', header: 'Cantidad' },
        { field: 'unitaryValue', header: 'Valor unitario' },

    ];




    const addSale = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita la recarga de la página
        const [formControls, valid] = validateFormControls();



        setControls([...formControls]);
        if (valid) {
            const newSale = {
                unitaryValue: saleToRegister.unitaryValue,
                amount: saleToRegister.amount,
                inventory: saleToRegister.inventory,
                product: saleToRegister.product,
                nameInventory: saleToRegister.nameinventory,
                nameProduct: saleToRegister.nameproduct,
            };


            // Agrega la nueva venta al arreglo de sales
            setSales(prevSales => [...prevSales, newSale]);

            // Limpia los campos del formulario
            setSaleToRegister({
                unitaryValue: "",
                amount: "",
                inventory: "",
                product: "",
                // Limpia campos
            });

            // Cierra el popup de nueva venta
            setNewSaleVisible(false);
        }

    }

    const loadSales = () => {
        const modifiedSales = sales.map((sale) => {

            delete sale.inventory;
            delete sale.nameInventory;
            delete sale.nameProduct;


            sale.product = {
                id: sale.product
            }

            sale.user = {
                id: AuthUtil.getCredentials().user
            }

            console.log(sale);
            return sale;
        })

        createAll(true, modifiedSales).then(res => {
            if (!ResErrorHandler.isValidRes(res)) {
                return;
            }
            ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS)
            setVisible(false)
            setSubmited(false)
            setSale(undefined)
        })


    }

    return (
        <>

            <PopUp title="Tabla de ventas" visible={visible} setVisible={setVisible}>
                <div className="col-12 flex justify-content-start">
                    <Button label="Agregar" icon="pi pi-plus" onClick={() => setNewSaleVisible(true)} ></Button>
                </div>
                <TableGeneral showRepotGenerator={false} columns={columns} staticValues={sales} ></TableGeneral>

                <div className="col-12 flex justify-content-start">
                    <Button label="Cargar ventas" icon="pi pi-check" onClick={loadSales}   ></Button>
                </div>
            </PopUp>


            <PopUp title="Nueva Venta" visible={newSaleVisible} setVisible={setNewSaleVisible}>
                <FormGenerator form={form} setValue={setSaleToRegister} submit={addSale} value={saleToRegister} buttonLabel="Agregar"></FormGenerator>
            </PopUp>


        </>
    )

}
