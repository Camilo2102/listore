
import FilterMeta, { FilterValue } from "@/app/interfaces/filterMeta";


export function validateInput(input: any) {
  if (typeof input === 'string') {
    return input.trim() !== '';
  } else if (typeof input === 'number') {
    return input !== 0;
  } else if (input instanceof Date) {
    return true;
  } else {
    return false;
  }
}

export function parseToFilter(filter: FilterMeta) {
  
  let object: any = {}

  filter.values.forEach((value: FilterValue) => {
    
    if(value.formControl){
      filter.required[value.field].id = value.formControl.value?.id
      return
    }

    object[value.field] = value.value;

  })

  object = {
    ...object,
    ...filter.required
  }

  return object;
}