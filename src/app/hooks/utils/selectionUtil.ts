import FilterMeta from "@/app/interfaces/filterMeta";


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

  filter.values.forEach((value: { field: string | number; value: any; }) => {
    object[value.field] = value.value;
  })

  object = {
    ...object,
    ...filter.required
  }

  return object;
}