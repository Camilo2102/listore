import { Endpoints } from "@/app/constants/endpointsConstants";
import { useMainContext } from "@/app/context/mainContext";
import { useHandleInput } from "@/app/hooks/useHandleInput";
import useCRUDService from "@/app/hooks/services/useCRUDService";
import Paginator from "@/app/interfaces/paginator";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import PopUp from "../popUp";
import FormGenerator from "../CRUDComponents/formGenerator";
import { useHandleForm } from "@/app/hooks/useHandleForm";
import FormControl from "@/app/models/formModels/formControl";
import { useProductContext } from "@/app/context/productContext";
import { useSubProductContext } from "@/app/context/subProductContext";

type registerSubProductProps = {
    visible: boolean,
    setVisible: (partialT: Partial<boolean>) => void,
    controls: FormControl[],
    setControls: Dispatch<SetStateAction<FormControl[]>>,
}

export default function RegisterSubProduct(props: registerSubProductProps) {
    const kindOfProduct = useCRUDService(Endpoints.KINDOFPRODUCT);
    const characteristic = useCRUDService(Endpoints.CHARACTERISTIC);

    const { product } = useProductContext()

    const [subProductToRegister, form, setSubProductToRegister, validateFormControls] = useHandleForm(props.controls);

    const handleProduct = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [formControls, valid] = validateFormControls();

        props.setControls([...formControls])

        if (valid) {
            const createdKindOfProduct = await kindOfProduct.create(true, {
                id: subProductToRegister.id ?? undefined,
                amount: subProductToRegister.amount,
                product: {
                    id: product?.id
                }
            })

            delete subProductToRegister.amount;
            delete subProductToRegister.id;

            const characteristics = subProductToRegister.characteristic ?? subProductToRegister
            
            const charIds = characteristics.characteristics;

            delete characteristics.characteristics

            const characteristicsToRegister = Object.keys(characteristics).map(key => {
                const characteristic = {
                    kindOfProduct: {
                        id: createdKindOfProduct.id
                    },
                    name: key,
                    value: characteristics[key],
                    id: charIds?.find((char: any) =>  char.name === key)?.id
                }
                return characteristic
            })
            
            await characteristic.createAll(true, characteristicsToRegister);
            props.setVisible(false);
        }
    }

    const {subProduct, setSubProduct} = useSubProductContext()

    useEffect(()=> {
        if(subProduct) {            
            delete subProduct.product
            setSubProductToRegister(subProduct)
        }
        //eslint-disable-next-line
    }, [subProduct])


    return (
        <>
            <PopUp title="Registro de producto" visible={props.visible} setVisible={props.setVisible}>
                <FormGenerator form={form} value={subProductToRegister} setValue={setSubProductToRegister} submit={handleProduct} buttonLabel="Crear" />
            </PopUp>
        </>
    )
}