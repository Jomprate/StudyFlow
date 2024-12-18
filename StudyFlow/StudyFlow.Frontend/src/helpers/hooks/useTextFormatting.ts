import { useState } from 'react';

export const useTextFormatting = (editorRef: React.RefObject<HTMLDivElement>) => {
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
        });
    };

    const applyFormatting = (command: string) => {
        if (editorRef.current) {
            document.execCommand(command, false);
            updateActiveFormats();
        }
    };

    return { activeFormats, applyFormatting, updateActiveFormats };
};