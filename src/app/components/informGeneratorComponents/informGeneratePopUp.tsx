import {Button} from "primereact/button";
import React, {FormEvent, useState} from "react";
import {Dialog} from "primereact/dialog";
import FormGenerator from "@/app/components/CRUDComponents/formGenerator";
import FormControl from "@/app/models/formModels/formControl";
import {FormTypes} from "@/app/constants/formTypeConstant";
import {Endpoints} from "@/app/constants/endpointsConstants";
import {useHandleForm} from "@/app/hooks/useHandleForm";
import useValidators from "@/app/models/formModels/validators";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import AuthUtil from "@/app/hooks/utils/authUtils";

export default function InformGeneratorPopUp({screenWidth}: { screenWidth: number }) {
    const [visible, setVisible] = useState<boolean>(false);

    const {requiered} = useValidators();
    const {getCredentials} = AuthUtil();

    const [controls, setControls] = useState<FormControl[]>([{
            field: "initialDate",
            value: null,
            description: "Fecha Inicial",
            colSize: 6,
            type: FormTypes.DATE,
            validators: [requiered],
            invalid: false,
            message: true,
        },
            {
                field: "finalDate",
                value: null,
                description: "Fecha final",
                colSize: 6,
                type: FormTypes.DATE,
                validators: [requiered],
                invalid: false,
                message: true,
            }]
    );

    const [filter, form, setFilter, validateFormControls] = useHandleForm(controls);

    const saleService = useCRUDService(Endpoints.SALE);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        setControls([...formControls]);

        if(valid) {
            filter.company = { id: getCredentials().company }

            saleService.getAll(false, filter).then((res) => {
                console.log(res)
            })
        }
    }

    return (
        <>
            <Button
                icon="pi pi-file-export"
                className="navbar-icon2"
                title='Cerrar sesión'
                label={screenWidth <= 767 ? 'Generar informe' : ''}
                onClick={() => setVisible(true)}
            />
            <Dialog header="Generar informe?" visible={visible} onHide={() => setVisible(false)}
                    style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                <p>
                    Deberas seleccionar el periodo del cual deseas generar el informe:
                </p>
                <FormGenerator form={form} value={filter} setValue={setFilter} submit={handleSubmit} ></FormGenerator>
            </Dialog>
        </>
    )

}