export default function DateUtil() {
    /**
   * Obtiene la fecha actual.
   * @returns La fecha actual.
   */
    const getCurrentDate = ():Date => new Date();

    /**
   * Valida si el valor es una fecha valida
   * @param value valor a validar
   * @returns devuelve si el valor es una instancia valida de una fecha
   */
    const validateDate = (value: any) => value instanceof Date;
  
    const formatFullDate = (value: any):boolean => {
      if (!validateDate(value)) {
        return value;
      }
      return value.toLocaleDateString('es-ES');
    };

    /**
   * Agrega una cantidad especificada de días a una fecha.
   * @param date La fecha a la que se agregarán los días.
   * @param days La cantidad de días a agregar.
   * @returns La nueva fecha después de agregar los días.
   */
    const addDays = (date: Date, days: number):Date => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    /**
   * Se devuelve una cantidad especificada de días a una fecha.
   * @param date La fecha a la que se agregarán los días.
   * @param days La cantidad de días a devolverse.
   * @returns La nueva fecha después de regresear los días.
   */
    const removeDays = (date: Date, days: number):Date => {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    };

    /**
   * Agrega una cantidad especificada de días a la fecha actual.
   * @param days La cantidad de días a agregar.
   * @returns La nueva fecha después de agregar los días.
   */
  
    const addDaysFromNow = (days: number):Date => {
      const result = new Date();
      result.setDate(result.getDate() + days);
      return result;
    };
  
    const removeDaysFromNow = (days: number):Date => {
      const result = new Date();
      result.setDate(result.getDate() - days);
      return result;
    };

    /**
     * Calcula la diferencia en días entre dos fechas.
     * @param date1 La primera fecha.
     * @param date2 La segunda fecha.
     * @returns La diferencia en días entre las dos fechas.
     */
  
    const differenceInDays = (date1: Date, date2: Date):number => {
      const timeDiff = date2.getTime() - date1.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    /**
     * Calcula los días desde la fecha actual hasta una fecha objetivo.
     * @param targetDate La fecha objetivo.
     * @returns Los días desde la fecha actual hasta la fecha objetivo.
     */
    const daysFromNow = (targetDate: Date):number => {
      const currentDate = getCurrentDate();
      return differenceInDays(currentDate, targetDate);
    };

    /**
     * Calcula los días antes de una fecha objetivo a partir de la fecha actual.
     * @param targetDate La fecha objetivo.
     * @returns Los días antes de la fecha objetivo a partir de la fecha actual.
     */
    const daysBefore = (targetDate: Date): number => {
      const currentDate = getCurrentDate();
      return differenceInDays(targetDate, currentDate);
    };

    return {
        getCurrentDate,
        validateDate,
        formatFullDate,
        addDays,
        removeDays,
        addDaysFromNow,
        differenceInDays,
        daysFromNow,
        daysBefore
    }
  }
  