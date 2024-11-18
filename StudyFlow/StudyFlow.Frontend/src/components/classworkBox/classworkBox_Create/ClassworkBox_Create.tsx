import React, { useState, useRef, useEffect } from 'react';
import './classworkBox_Create.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faListUl, faListOl, faIndent } from '@fortawesome/free-solid-svg-icons';
import { subjectApi } from '../../../services/api';
import { useParams } from 'react-router-dom';

interface ClassworkBoxCreateProps {
    onClassworkCreated: (classwork: any) => void;
}

const ClassworkBox_Create: React.FC<ClassworkBoxCreateProps> = ({ onClassworkCreated }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [title, setTitle] = useState<string>('');
    const [classworkType, setClassworkType] = useState<string>('Homework');
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            setIsPublishDisabled(editorRef.current.innerHTML.trim() === '' || title.trim() === '');
        }
    }, [title]);

    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            setIsPublishDisabled(content.trim() === '' || title.trim() === '');
            updateActiveFormats();
        }
    };

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
            handleInput();
        }
    };

    const handleSubmit = async () => {
        if (editorRef.current && courseId) {
            const content = editorRef.current.innerHTML;

            const addClassworkDTO = {
                name: title,
                content: content,
                courseId: courseId,
                type: classworkType,
            };

            console.log('Classwork DTO being sent:', addClassworkDTO);

            try {
                const response = await subjectApi.addSubjectByCourse(addClassworkDTO);
                onClassworkCreated(response.data);

                setTitle('');
                if (editorRef.current) editorRef.current.innerHTML = '';
                setIsPublishDisabled(true);
                console.log('Classwork created successfully:', response.data);
            } catch (error) {
                console.error('Error creating classwork:', error);
            }
        }
    };

    const handleSubjectTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassworkType(event.target.value);
    };

    return (
        <div className={`classworkBox_Create_box ${theme}`}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="classworkBox_Create_title-input"
                placeholder={t('classwork_title')}
            />
            <div
                ref={editorRef}
                className="classworkBox_Create_editor"
                contentEditable={true}
                onInput={handleInput}
            ></div>

            <div className="classworkBox_Create_controls">
                <button onClick={() => applyFormatting('bold')} className={`classworkBox_Create_control-button ${activeFormats.bold ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button onClick={() => applyFormatting('italic')} className={`classworkBox_Create_control-button ${activeFormats.italic ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button onClick={() => applyFormatting('underline')} className={`classworkBox_Create_control-button ${activeFormats.underline ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button onClick={() => applyFormatting('insertUnorderedList')} className="classworkBox_Create_control-button">
                    <FontAwesomeIcon icon={faListUl} />
                </button>
                <button onClick={() => applyFormatting('insertOrderedList')} className="classworkBox_Create_control-button">
                    <FontAwesomeIcon icon={faListOl} />
                </button>
                <button onClick={() => applyFormatting('outdent')} className="classworkBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} />
                </button>
                <button onClick={() => applyFormatting('indent')} className="classworkBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} />
                </button>
            </div>

            {/* Dropdown for Subject Type */}
            <div className="classworkBox_Create_type-selector">
                <select value={classworkType} onChange={handleSubjectTypeChange} className="classworkBox_Create_select">
                    <option value="Homework">{t('subject_homework')}</option>
                    <option value="Classroom">{t('subject_classroom')}</option>
                    <option value="Exam">{t('subject_exam')}</option>
                    <option value="Quiz">{t('subject_quiz')}</option>
                    <option value="Project">{t('subject_project')}</option>
                    <option value="Other">{t('subject_other')}</option>
                </select>
            </div>

            <div className="classworkBox_Create_footer">
                <button className="classworkBox_Create_footer-button classworkBox_Create_cancel-button" onClick={() => setTitle('')}>
                    {t('classwork_Cancel')}
                </button>
                <button className="classworkBox_Create_footer-button classworkBox_Create_publish-button" onClick={handleSubmit} disabled={isPublishDisabled}>
                    {t('classwork_Publish')}
                </button>
            </div>
        </div>
    );
};

export default ClassworkBox_Create;