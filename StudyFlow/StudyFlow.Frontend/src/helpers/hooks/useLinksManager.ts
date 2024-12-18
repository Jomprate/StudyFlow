import { useState, useEffect } from 'react';

export const useLinksManager = (key: string) => {
    const [links, setLinks] = useState<string[]>([]);

    // Cargar enlaces desde sessionStorage al inicializar
    useEffect(() => {
        const storedLinks = sessionStorage.getItem(key);
        if (storedLinks) setLinks(JSON.parse(storedLinks));
    }, [key]);

    const addLink = (link: string) => {
        const updatedLinks = [...links, link];
        setLinks(updatedLinks);
        sessionStorage.setItem(key, JSON.stringify(updatedLinks));
    };

    const removeLink = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
        sessionStorage.setItem(key, JSON.stringify(updatedLinks));
    };

    const clearLinks = () => {
        setLinks([]);
        sessionStorage.removeItem(key);
    };

    return { links, addLink, removeLink, clearLinks };
};