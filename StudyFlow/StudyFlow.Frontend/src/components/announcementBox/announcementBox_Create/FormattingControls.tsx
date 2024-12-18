import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faListUl, faListOl, faIndent } from '@fortawesome/free-solid-svg-icons';

interface FormattingControlsProps {
    activeFormats: { bold: boolean; italic: boolean; underline: boolean };
    applyFormatting: (command: string) => void;
    createSublist: (ordered: boolean) => void;
}

const FormattingControls: React.FC<FormattingControlsProps> = ({ activeFormats, applyFormatting, createSublist }) => (
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
        <button onClick={() => createSublist(false)} className="announcementBox_Create_control-button">
            <FontAwesomeIcon icon={faIndent} />
        </button>
        <button onClick={() => createSublist(true)} className="announcementBox_Create_control-button">
            <FontAwesomeIcon icon={faIndent} />
        </button>
    </div>
);

export default FormattingControls;