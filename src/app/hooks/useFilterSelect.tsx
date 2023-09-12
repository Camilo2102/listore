import { useEffect } from "react";
import { FormTypes } from "../constants/formTypeConstant";
import useValidators from "../models/formModels/validators";
import FormControl from "../models/formModels/formControl";
import FilterMeta from "../interfaces/filterMeta";
import { useHandleInput } from "./useHandleInput";
import DateUtil from "./utils/dateUtils";

const convertToInputText = (field: string, description: string) => {
  //eslint-disable-next-line
  const {requiered, maxLenght, minLenght} = useValidators();
  return {
    field: field,
    value: "",
    description: description,
    colSize: 12,
    type: FormTypes.INPUT,
    validators: [requiered, maxLenght(60), minLenght(3)],
    invalid: false,
    message: true,
  }
}

const convertToInputNumber = (field: string, description: string) => {
  //eslint-disable-next-line
  const {requiered, maxLenght, minLenght} = useValidators();
  return {
    field: field,
    value: 0,
    description: description,
    colSize: 12,
    type: FormTypes.NUMBER,
    validators: [requiered, maxLenght(60), minLenght(3)],
    invalid: false,
    message: true,
  }
}

const convertToInputDate = (field: string, description: string) => {
  //eslint-disable-next-line
  const {requiered, maxLenght, minLenght} = useValidators();
  return {
    field: field,
    value: null,
    description: description,
    colSize: 12,
    type: FormTypes.DATE,
    validators: [requiered],
    invalid: false,
    message: true,
  }
}


export default function useGeneratedForm(filter: FilterMeta) {
  const {validateDate} = DateUtil();
  const selectValues = () => {
    const controls: FormControl[] = [];
    filter.values.forEach(value => {
      const valueType = validateDate(value.value)  ? 'date' : typeof value.value;

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
        return convertToInputText(field, description);
      case "number":
        return convertToInputNumber(field, description);
      case 'object':
      case 'date':
        return convertToInputDate(field, description);
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