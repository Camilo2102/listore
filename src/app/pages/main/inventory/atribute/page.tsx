import { useContext } from "react";
import { atributeContext } from "./atributeContext";
import { AtributeService } from "@/app/services/atributeService";

export default function AtributePage(){
    const {atribute, setAtribute} = useContext(atributeContext);
    const atributesService = new AtributeService();
    
}