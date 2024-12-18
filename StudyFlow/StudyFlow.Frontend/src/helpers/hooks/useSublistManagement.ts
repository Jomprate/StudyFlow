import { useTranslation } from 'react-i18next';

export const useSublistManagement = (editorRef: React.RefObject<HTMLDivElement>) => {
    const { t } = useTranslation();

    const createSublist = (ordered: boolean) => {
        if (!editorRef.current) return;
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedElement = range.startContainer.parentElement;
        if (!selectedElement || selectedElement.tagName !== 'LI') return;

        const liElement = selectedElement as HTMLLIElement;
        addSublistToElement(liElement, ordered);
    };

    const addSublistToElement = (liElement: HTMLLIElement, ordered: boolean) => {
        let sublist = liElement.querySelector('ul, ol') as HTMLElement | null;
        if (!sublist) {
            sublist = document.createElement(ordered ? 'ol' : 'ul');
            sublist.style.listStyleType = ordered ? 'decimal' : 'disc';
            sublist.style.marginLeft = '20px';
            liElement.appendChild(sublist);
        }

        const newSubItem = document.createElement('li');
        newSubItem.textContent = t('announce_newSubitem');
        sublist.appendChild(newSubItem);
    };

    return { createSublist };
};