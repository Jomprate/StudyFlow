import React, { createContext, useContext, useEffect, useState } from "react";

interface UtcContextProps {
    utcOffset: number;
    localTimezone: string;
}

const UtcContext = createContext<UtcContextProps | undefined>(undefined);

export const UtcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [utcOffset, setUtcOffset] = useState<number>(0);
    const [localTimezone, setLocalTimezone] = useState<string>("");

    useEffect(() => {
        const offset = -new Date().getTimezoneOffset() / 60;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        setUtcOffset(offset);
        setLocalTimezone(timezone);
    }, []);

    return (
        <UtcContext.Provider value={{ utcOffset, localTimezone }}>
            {children}
        </UtcContext.Provider>
    );
};

// Crear un hook personalizado para consumir el contexto
export const useUtc = (): UtcContextProps => {
    const context = useContext(UtcContext);
    if (!context) {
        throw new Error("useUtc must be used within a UtcProvider");
    }
    return context;
};