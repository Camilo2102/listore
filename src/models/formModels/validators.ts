import { Messages } from "@/app/constants/generalConstant";
import { ToastService } from "@/app/services/toastService";
import FormControl from "./formControl";

export default class Validators {
    
  /**
   * Validador para indicar que el elemento debe tener valor 
   * @param formControl el formcontrol con la informacion del elemento
   * @returns booleano que permite establecer el estado del formcontrol
   */
  public static requiered(formControl: FormControl): boolean {
      
      const isEmpty = Validators.isEmpty(formControl.value);
       if(isEmpty && formControl.message) {
        ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_REQUIERED + formControl.description);
       }
        return isEmpty;
  }

  /**
   * Validador para establecer una longitud maxima
   * @param formControl el formcontrol con la informacion del elemento
   * @returns booleano que permite establecer el estado del formcontrol
   */
  public static maxLenght(formControl: FormControl): boolean {
    if(formControl.maxLenght) {
      const isInvalid = formControl.value.length > formControl.maxLenght;

      if(isInvalid && formControl.message) {
        ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_MAX_LENGTH + formControl.maxLenght + " para " + formControl.description);
      }

      return isInvalid;
    } else {
      ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_NO_MAX_LENGTH_STABLISHED + formControl.description);

      return false;
    }
  }

  /**
   * Validador para establecer la longitud minima
   * @param formControl el formcontrol con la informacion del elemento
   * @returns booleano que permite establecer el estado del formcontrol
   */
  public static minLenght(formControl: FormControl): boolean {
    if(formControl.minLenght) {
      const isInvalid = formControl.value.length < formControl.minLenght;

      if(isInvalid && formControl.message) {
        ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_MIN_LENGTH + formControl.minLenght + " para " + formControl.description);
      }

      return isInvalid;
    } else {
      ToastService.showError(Messages.MESSAGE_ERROR, Messages.MESSAGE_NO_MIN_LENGTH_STABLISHED + formControl.description);

      return false;
    }
  }



  /**
   * Validacion de multiples objetos para validar si tienen contenido
   * @param value un objeto de cualquier tipo
   * @returns el estado para saber si esta vacio
   */
  public static isEmpty(value: string | number | object | null | undefined): boolean {
    if (value === null || value === undefined) {
      return true;
    } else if (typeof value !== 'number' && value === '') {
      return true;
    } else if (typeof value === 'object' && Object.keys(value).length === 0 && !(value instanceof Date)) {
      return true;
    } else if (value instanceof Date && isNaN(value.getTime())) {
      return true;
    } else {
      return false;
    }
  }
}