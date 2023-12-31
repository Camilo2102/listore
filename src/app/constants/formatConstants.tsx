
export function useFormats() {

    /**
   * Formatea una fecha en una cadena de texto según el formato especificado.
   * @param date La fecha a formatear.
   * @returns La fecha formateada como una cadena de texto.
   */
    const formatDate = (date: number[]): string => {
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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    const formatDetail = (values: any) => {
        return (
            <ul style={{padding: '0', listStyle: 'inside'}}>
                {Object.keys(values).map((key: any) => (
                    <li key={'prop-name-' + key}>
                        {key}: {values[key]}
                    </li>
                )
                )}
            </ul>
        )
    }

    return {
        formatDate,
        formatCurrency,
        formatDetail
    }

}