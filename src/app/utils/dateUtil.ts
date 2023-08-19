export class DateUtil{
    /**
   * Obtiene la fecha actual.
   * @returns La fecha actual.
   */
  public static getCurrentDate(): Date {
    return new Date();
  }

  /**
   * Formatea una fecha en una cadena de texto según el formato especificado.
   * @param date La fecha a formatear.
   * @returns La fecha formateada como una cadena de texto.
   */
  public static formatDate(date: number[]): string {
    const [year, month, day, hour = 0, minute = 0, second = 0] = date;

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

    if (hour === 0 && minute === 0 && second === 0) {
        return formattedDate;
    } else {
        return `${formattedDate} - ${formattedTime}`;
    }
  }


  /**
   * Valida si el valor es una fecha valida
   * @param value valor a validar
   * @returns devuelve si el valor es una instancia valida de una fecha
   */
  public static validateDate(value: any): boolean {
    return value instanceof Date
  }


  public static formatFullDate(value: any): string {
      if(!this.validateDate(value)){
        return value;
      }
      return value.toLocaleDateString('es-ES');

  }

  /**
   * Agrega una cantidad especificada de días a una fecha.
   * @param date La fecha a la que se agregarán los días.
   * @param days La cantidad de días a agregar.
   * @returns La nueva fecha después de agregar los días.
   */
  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Se devuelve una cantidad especificada de días a una fecha.
   * @param date La fecha a la que se agregarán los días.
   * @param days La cantidad de días a devolverse.
   * @returns La nueva fecha después de regresear los días.
   */
  public static removeDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }


  /**
   * Agrega una cantidad especificada de días a la fecha actual.
   * @param days La cantidad de días a agregar.
   * @returns La nueva fecha después de agregar los días.
   */
  public static addDaysFromNow(days: number): Date {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Se regresa una cantidad especificada de días a la fecha actual.
   * @param days La cantidad de días a regresarse.
   * @returns La nueva fecha después de regresar los días.
   */
  public static removeDaysFromNow(days: number): Date {
    const result = new Date();
    result.setDate(result.getDate() - days);
    return result;
  }

  /**
   * Calcula la diferencia en días entre dos fechas.
   * @param date1 La primera fecha.
   * @param date2 La segunda fecha.
   * @returns La diferencia en días entre las dos fechas.
   */
  public static differenceInDays(date1: Date, date2: Date): number {
    const timeDiff = date2.getTime() - date1.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  /**
   * Calcula los días desde la fecha actual hasta una fecha objetivo.
   * @param targetDate La fecha objetivo.
   * @returns Los días desde la fecha actual hasta la fecha objetivo.
   */
  public static daysFromNow(targetDate: Date): number {
    const currentDate = this.getCurrentDate();
    return this.differenceInDays(currentDate, targetDate);
  }

  /**
   * Calcula los días antes de una fecha objetivo a partir de la fecha actual.
   * @param targetDate La fecha objetivo.
   * @returns Los días antes de la fecha objetivo a partir de la fecha actual.
   */
  public static daysBefore(targetDate: Date): number {
    const currentDate = this.getCurrentDate();
    return this.differenceInDays(targetDate, currentDate);
  }


}