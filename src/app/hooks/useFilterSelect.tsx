import { useEffect } from "react";
import { FormTypes } from "../constants/formTypeConstant";
import Validators from "../models/formModels/validators";
import FormControl from "../models/formModels/formControl";
import FilterMeta from "../interfaces/filterMeta";
import { useHandleInput } from "./handleInput";
import { DateUtil } from "../utils/dateUtil";

const useInputText = (field: string, description: string) => {
  return {
    field: field,
    value: "",
    description: description,
    colSize: 12,
    type: FormTypes.INPUT,
    validators: [Validators.requiered, Validators.maxLenght(60), Validators.minLenght(3)],
    invalid: false,
    message: true,
  }
}

const useInputNumber = (field: string, description: string) => {
  return {
    field: field,
    value: 0,
    description: description,
    colSize: 12,
    type: FormTypes.NUMBER,
    validators: [Validators.requiered, Validators.maxLenght(60), Validators.minLenght(3)],
    invalid: false,
    message: true,
  }
}

const useInputDate = (field: string, description: string) => {
  return {
    field: field,
    value: null,
    description: description,
    colSize: 12,
    type: FormTypes.DATE,
    validators: [Validators.requiered],
    invalid: false,
    message: true,
  }
}


export default function useGeneratedForm(filter: FilterMeta) {

  const selectValues = () => {
    const controls: FormControl[] = [];
    filter.values.forEach(value => {
      const valueType = DateUtil.validateDate(value.value)  ? 'date' : typeof value.value;

      const description = value.label;
      const key = value.field;

      const selectedInput = selectInputFromType(valueType, key, description);
      if (selectedInput) {
        controls.push(selectedInput);
      }
    })

    return controls;
  }

  const selectInputFromType = (valueType: string, field: string, description: string) => {
    switch (valueType) {
      case "string":
        return useInputText(field, description);
      case "number":
        return useInputNumber(field, description);
      case 'object':
      case 'date':
        return useInputDate(field, description);
    }
    return null;
  }

  return selectValues();
}

export function useCleanFilterInput(initialValue: any): [any, (partialT: Partial<any>) => void] {
  Object.keys(initialValue.values).forEach(key => {
    const valueType = typeof initialValue.values[key];
    if (valueType === 'string') {
      initialValue.values[key] = '';
    }
    if (valueType === 'number') {
      initialValue.values[key] = 0;
    }
    if (valueType === 'object') {
      initialValue.values[key] = initialValue.values[key];
    }
  })


  const [value, setValue] = useHandleInput(initialValue);
  return [value, setValue];
}