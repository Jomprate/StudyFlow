import React, { useRef, useState } from 'react';
import './announcementBox_Create.css';
import { useTheme } from '../../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faListUl, faListOl, faEraser, faIndent } from '@fortawesome/free-solid-svg-icons';

const AnnouncementBox_Create: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [title, setTitle] = useState<string>('');
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    // Function to handle the input to update state
    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            setIsPublishDisabled(content.trim() === '' || title.trim() === '');

            // Update formatting
            updateActiveFormats();
        }
    };

    // Function to update the active formats based on the current selection
    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
        });
    };

    // Handle key commands for indentation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (editorRef.current) {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    const selectedElement = range.startContainer.parentElement;

                    if (selectedElement && selectedElement.tagName === 'LI') {
                        const liElement = selectedElement as HTMLLIElement;
                        const parentList = liElement.parentElement;

                        if (e.shiftKey) {
                            // Reduce indentation (outdent)
                            if (parentList && (parentList.tagName === 'UL' || parentList.tagName === 'OL')) {
                                const grandParent = parentList.parentElement;
                                if (grandParent && (grandParent.tagName === 'UL' || grandParent.tagName === 'OL')) {
                                    grandParent.insertBefore(liElement, parentList.nextSibling);
                                }
                            }
                        } else {
                            // Increase indentation (indent)
                            if (parentList && (parentList.tagName === 'UL' || parentList.tagName === 'OL')) {
                                const previousElement = liElement.previousElementSibling;
                                if (previousElement && previousElement.tagName === 'LI') {
                                    let sublist = previousElement.querySelector('ul, ol') as HTMLElement | null;
                                    if (!sublist) {
                                        sublist = document.createElement(
                                            parentList.tagName === 'UL' ? 'ul' : 'ol'
                                        ) as HTMLElement;
                                        sublist.style.listStyleType = parentList.tagName === 'UL' ? 'disc' : 'decimal';
                                        sublist.style.marginLeft = '20px';
                                        previousElement.appendChild(sublist);
                                    }
                                    sublist.appendChild(liElement);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    // Function to apply formatting using execCommand
    const applyFormatting = (command: string) => {
        if (editorRef.current) {
            document.execCommand(command, false);
            handleInput(); // Ensure content is updated
        }
    };

    // Function to toggle list type between ordered and unordered
    const toggleListType = (ordered: boolean) => {
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const selectedElement = range.startContainer.parentElement;

                if (selectedElement && selectedElement.tagName === 'LI') {
                    const liElement = selectedElement as HTMLLIElement;

                    // Check if a sublist already exists
                    let sublist = liElement.querySelector('ul, ol') as HTMLElement | null;
                    if (sublist) {
                        // If it exists and is of a different type, replace it
                        if ((ordered && sublist.tagName.toLowerCase() === 'ul') || (!ordered && sublist.tagName.toLowerCase() === 'ol')) {
                            const newSublist = document.createElement(ordered ? 'ol' : 'ul');
                            newSublist.innerHTML = sublist.innerHTML;
                            sublist.replaceWith(newSublist);
                            sublist = newSublist;
                        }
                    } else {
                        // Create a new sublist if it doesn't exist
                        sublist = document.createElement(ordered ? 'ol' : 'ul');
                        sublist.style.listStyleType = ordered ? 'decimal' : 'disc';
                        sublist.style.marginLeft = '20px';
                        liElement.appendChild(sublist);
                    }

                    // Create a new list item in the sublist
                    const newSubItem = document.createElement('li');
                    newSubItem.textContent = 'Nuevo subitem';
                    sublist.appendChild(newSubItem);
                }
            }
        }
    };

    const handleSubmit = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            console.log('Title Submitted: ', title);
            console.log('Announcement Submitted: ', content);
        }
    };

    return (
        <div className={`announcementBox_Create_announcement-box ${theme}`}>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setIsPublishDisabled(
                        e.target.value.trim() === '' || (editorRef.current?.innerHTML.trim() ?? '') === ''
                    );
                }}
                className="announcementBox_Create_title-input"
                placeholder="Título del anuncio"
            />
            <div
                ref={editorRef}
                className="announcementBox_Create_announcement-editor"
                contentEditable={true}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onMouseUp={updateActiveFormats}
                placeholder="Anuncia algo a la clase"
            ></div>
            <div className="announcementBox_Create_controls">
                <button
                    onClick={() => applyFormatting('bold')}
                    className={`announcementBox_Create_control-button ${activeFormats.bold ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                    onClick={() => applyFormatting('italic')}
                    className={`announcementBox_Create_control-button ${activeFormats.italic ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                    onClick={() => applyFormatting('underline')}
                    className={`announcementBox_Create_control-button ${activeFormats.underline ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button onClick={() => applyFormatting('insertUnorderedList')} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faListUl} />
                </button>
                <button onClick={() => applyFormatting('insertOrderedList')} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faListOl} />
                </button>
                <button onClick={() => toggleListType(false)} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} /> Sublista (viñetas)
                </button>
                <button onClick={() => toggleListType(true)} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} /> Sublista (numerada)
                </button>
                <button onClick={() => applyFormatting('removeFormat')} className="announcementBox_Create_control-button">
                    <FontAwesomeIcon icon={faEraser} />
                </button>
            </div>
            <div className="announcementBox_Create_footer">
                <button className="announcementBox_Create_footer-button announcementBox_Create_cancel-button">Cancelar</button>
                <button
                    className="announcementBox_Create_footer-button announcementBox_Create_publish-button"
                    onClick={handleSubmit}
                    disabled={isPublishDisabled}
                >
                    Publicar
                </button>
            </div>
        </div >
    );
};

export default AnnouncementBox_Create;
