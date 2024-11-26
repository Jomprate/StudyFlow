import { useUtc } from "../../contexts/UtcContext";

export const formatDate = (date: string | Date, includeTime: boolean = false): string => {
    if (!date) {
        console.error("Invalid date value:", date);
        return "Invalid Date";
    }

    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date format:", date);
        return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

export const useConvertUtcToLocal = () => {
    const { utcOffset } = useUtc();

    return (utcDate: string, includeTime: boolean = true): string => {
        const date = new Date(utcDate);
        if (isNaN(date.getTime())) {
            console.error("Invalid UTC date:", utcDate);
            return "Invalid Date";
        }

        const adjustedDate = new Date(date.getTime() + utcOffset * 60 * 60 * 1000);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        if (includeTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
        }

        return adjustedDate.toLocaleString('en-US', options);
    };
};