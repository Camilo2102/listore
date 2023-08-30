import FilterMeta from "../interfaces/filterMeta";

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

  filter.values.forEach(value => {
    object[value.field] = value.value;
  })

  object = {
    ...object,
    ...filter.required
  }

  return object;
}