import { FormTypes } from "@/app/constants/formTypeConstant";
import { Messages } from "@/app/constants/messageConstant";
import { handleForm } from "@/app/hooks/handleForm";
import FormControl from "@/app/models/formModels/formControl";
import Validators from "@/app/models/formModels/validators";
import { ToastUtil } from "@/app/utils/toastUtil";
import { FormEvent, useContext, useEffect, useState } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import { ResErrorHandler } from "@/app/utils/resErrorHandler";
import User from "@/app/models/user";
import { AuthUtil } from "@/app/utils/authUtil";
import { spentContext } from "@/app/pages/main/spent/spentContext";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import { Endpoints } from "@/app/constants/endpointsConstants";
import ColumnMeta from "@/app/interfaces/columnMeta";
import { Button } from "primereact/button";
import TableGeneral from "../tableComponents/tableGeneral";

export default function RegisterSpent({visible, setVisible}: {visible: boolean, setVisible: (partialT: Partial<boolean>) => void}){
    const {createAll} = useCRUDService(Endpoints.SPENT);
    const [spents, setspents] = useState<any[]>([]);
    const [newSpentVisible, setNewSpentVisible] = useState(false);
    const [controls, setControls] = useState<FormControl[]>(
        [
            {
                field: "price",
                value: "",
                description: "Precio",
                colSize: 12,
                type: FormTypes.NUMBER,
                validators: [Validators.requiered, Validators.maxLenght(200), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-dollar"
            },
            {
                field: "description",
                value: "",
                description: "Descripción",
                colSize: 12,
                type: FormTypes.INPUT,
                validators: [Validators.requiered, Validators.maxLenght(120), Validators.minLenght(3)],
                invalid: false,
                message: true,
                icon: "pi-pencil"
             },
        ]
    );
    const [spentToRegister, form, setSpentToRegister, validateFormControls] = handleForm(controls);
    const {spent, setSpent} = useContext(spentContext);

    const [submited, setSubmited] = useState<boolean>(false);
    


    useEffect(() =>{
        if(spent !== undefined && !submited){
            setSpentToRegister(spent)
        }
    }, [submited]);

    const columns: ColumnMeta[] = [
        {field: 'price', header: 'Precio'},
        {field: 'description', header: 'Descripción'}
    ];

    //agregar gasto
    const addSpent = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const[formControls, valid] = validateFormControls();
        setControls([...formControls]);
        if(valid){
            const newSpent ={
                price: spentToRegister.price,
                description: spentToRegister.description
            };
            setspents(prevSpents => [...prevSpents, newSpent])

            setSpentToRegister({
                price: "",
                description: ""
            })

            setNewSpentVisible(false);
        }
    }

    //cargue de gastos
    const loadSpents = () =>{
        const modifiedSpents = spents.map((spent) =>{
            spent.user ={
                id: AuthUtil.getCredentials().user
            }
            return spent;
        })

        createAll(true, modifiedSpents).then(res =>{
            if(!ResErrorHandler.isValidRes(res)){
                return;
            }
            ToastUtil.showSuccess(Messages.MESSAGE_SUCCESS, Messages.MESSAGE_CREATE_SUCCESS);
            setVisible(false)
            setSubmited(false)
            setSpent(undefined)
        })
    }



    return (
        <>
            <PopUp title="Tabla de gastos" visible={visible} setVisible={setVisible}>
                <div className="col-12 flex justify-content-start">
                    <Button label="Agregar" icon="pi pi-plus" onClick={() => setNewSpentVisible(true)}></Button>
                </div>
               <TableGeneral useFilter={false} showRepotGenerator={false} columns={columns} staticValues={spents}></TableGeneral>
               <div className="col-12 flex justify-content-start">
                    <Button label="Cargar gastos" icon="pi pi-check" onClick={loadSpents}></Button>
               </div>
            </PopUp>

            <PopUp title="Nuevo Gasto" visible= {newSpentVisible} setVisible={setNewSpentVisible}>
                <FormGenerator form={form} setValue={setSpentToRegister} submit={addSpent} value={spentToRegister} buttonLabel="Agregar"></FormGenerator>
            </PopUp>
        </>
    )

}