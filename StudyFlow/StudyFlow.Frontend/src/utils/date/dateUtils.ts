export const formatDate = (date: string | Date, includeTime: boolean = false): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    const dateObj = new Date(date);

    // Formatear la fecha según las opciones
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};