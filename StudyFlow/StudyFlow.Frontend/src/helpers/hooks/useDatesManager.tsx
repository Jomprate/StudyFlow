import { useState } from 'react';

export const useDatesManager = (initialDates: string[] = []) => {
    const [dates, setDates] = useState<string[]>(initialDates);

    const isValidDate = (date: string) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    };

    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const toggleDaySelection = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const generateRepeatedDates = (startDate: string, selectedDays: string[], repeatFrequency: number) => {
        if (!isValidDate(startDate)) return [];
        const start = new Date(startDate);
        const generatedDates: string[] = [];
        const maxOccurrences = 10;

        for (let i = 0; generatedDates.length < maxOccurrences; i++) {
            const nextDate = new Date(start);
            nextDate.setDate(start.getDate() + i * repeatFrequency);

            const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
            if (selectedDays.includes(dayName)) {
                generatedDates.push(nextDate.toISOString());
            }
        }

        setDates(generatedDates);
        return generatedDates;
    };

    return { dates, setDates, isValidDate, generateRepeatedDates, selectedDays, toggleDaySelection };
};