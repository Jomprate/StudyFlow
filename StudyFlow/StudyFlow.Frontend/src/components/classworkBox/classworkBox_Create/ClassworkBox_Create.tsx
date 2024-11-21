import React, { useState, useRef, useEffect } from 'react';
import './classworkBox_Create.css';
import '../../cards/YoutubeVideoCard/ytvideoCard.css';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faListUl, faListOl, faIndent, faLink } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import AnnouncementsYouTubeModal from '../../announcementBox/announcementBox_Create/AnnouncementsModals/AnnouncementsYouTubeModal';
import AnnouncementsGoogleDriveModal from '../../announcementBox/announcementBox_Create/AnnouncementsModals/AnnouncementsGoogleDriveModal';
import AnnouncementsOtherLinksModal from '../../announcementBox/announcementBox_Create/AnnouncementsModals/AnnouncementsOtherLinksModal';
import { subjectApi } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

interface ClassworkBoxCreateProps {
    onClassworkCreated: (classwork: any) => void;
}

const ClassworkBox_Create: React.FC<ClassworkBoxCreateProps> = ({ onClassworkCreated }) => {
    const { t } = useTranslation();
    const { state } = useAuth();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [title, setTitle] = useState<string>('');
    const [classworkType, setClassworkType] = useState<string>('Homework');
    const [scheduledDate, setScheduledDate] = useState<string>(''); // Nuevo estado para la fecha y hora
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });
    const [youtubeLinks, setYouTubeLinks] = useState<string[]>([]);
    const [googleDriveLinks, setGoogleDriveLinks] = useState<string[]>([]);
    const [otherLinks, setOtherLinks] = useState<string[]>([]);
    const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
    const [isGoogleDriveModalOpen, setIsGoogleDriveModalOpen] = useState(false);
    const [isOtherLinksModalOpen, setIsOtherLinksModalOpen] = useState(false);

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
        if (!courseId) {
            alert('Course ID is required.');
            return;
        }

        if (!title.trim()) {
            alert('Title is required.');
            return;
        }

        const content = editorRef.current?.innerHTML.trim();
        if (!content) {
            alert('Content is required.');
            return;
        }

        const subjectPayload = {
            courseId: courseId, // Asegura que no sea null
            subjectDTO: {
                course: {
                    id: courseId, // ID del curso asociado
                    teacherDTO: {
                        id: state.userName || 'unknown', // Valor por defecto si state.userName es null
                        fullName: state.fullName || 'Unknown Teacher', // Valor por defecto si falta fullName
                    },
                    name: 'Course Name', // Sustituir con el nombre real del curso
                    description: 'Course Description', // Sustituir con la descripción real del curso
                    logo: 'Course Logo URL', // Sustituir con el logo real del curso
                    isEnabled: true, // Configuración habilitada por defecto
                },
                name: title, // Título del subject
                htmlContent: content, // Contenido HTML
                type: classworkType, // Tipo de trabajo
                link: 'string', // Ajusta este valor si es necesario
                youTubeVideos: youtubeLinks.length > 0 ? youtubeLinks : ['string'],
                googleDriveLinks: googleDriveLinks.length > 0 ? googleDriveLinks : ['string'],
                alternateLinks: otherLinks.length > 0 ? otherLinks : ['string'],
                listScheduleds: [
                    {
                        id: crypto.randomUUID(), // Genera un ID único para el schedule
                        scheduledDate: new Date(scheduledDate).toISOString(),
                        link: 'string', // Ajusta este valor según sea necesario
                    },
                ],
            },
        };

        try {
            console.log('Subject Payload:', subjectPayload);

            const subjectResponse = await subjectApi.addSubjectByCourse(subjectPayload);

            console.log('Full Subject Response:', subjectResponse);

            // No validar subjectId inmediatamente
            console.log('Subject created successfully');
            alert('Subject created successfully');
            onClassworkCreated({
                id: subjectResponse?.id || '', // Puedes usar un valor vacío o un placeholder
                title,
                content,
                date: scheduledDate,
                creator: state.userName,
            });
        } catch (error: any) {
            console.error('Error during submission:', error.response?.data || error.message || 'No response data available');
            alert(`Error: ${error.response?.data?.message || 'Failed to create subject or schedules.'}`);
        }
    };

    const handleSubjectTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassworkType(event.target.value);
    };

    const addYouTubeLink = (link: string) => {
        setYouTubeLinks([...youtubeLinks, link]);
    };

    const addGoogleDriveLink = (link: string) => {
        setGoogleDriveLinks([...googleDriveLinks, link]);
    };

    const addOtherLink = (link: string) => {
        setOtherLinks([...otherLinks, link]);
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
                <button onClick={() => applyFormatting('indent')} className="classworkBox_Create_control-button">
                    <FontAwesomeIcon icon={faIndent} />
                </button>
            </div>

            <hr className="classworkBox_Create_separator" />

            {/* Campo para seleccionar fecha y hora */}
            <div className="classworkBox_Create_date-container">
                <label htmlFor="scheduledDate" className="classworkBox_Create_date-label">
                    {t('scheduled_date')}
                </label>
                <div className="classworkBox_Create_date-wrapper">
                    <input
                        id="scheduledDate"
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="classworkBox_Create_date-input"
                    />
                    <span className="classworkBox_Create_date-icon">
                        {/*<FontAwesomeIcon icon={faListOl} />*/}
                    </span>
                </div>
            </div>

            {/* Selector de tipo de trabajo */}
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

            <div className="classworkBox_Create_external-data-links">
                <button className="classworkBox_Create_control-button" onClick={() => setIsYouTubeModalOpen(true)}>
                    <FontAwesomeIcon icon={faYoutube} />
                </button>
                <button className="classworkBox_Create_control-button" onClick={() => setIsGoogleDriveModalOpen(true)}>
                    <FontAwesomeIcon icon={faGoogleDrive} />
                </button>
                <button className="classworkBox_Create_control-button" onClick={() => setIsOtherLinksModalOpen(true)}>
                    <FontAwesomeIcon icon={faLink} />
                </button>
            </div>

            {/* Lista de videos de YouTube */}
            <div className="youtube-video-list">
                {youtubeLinks.map((link, index) => (
                    <div key={index} className="youtube-video-item">
                        <YTVideoAnnounceCard url={link} />
                        <button
                            className="remove-video-button"
                            onClick={() => {
                                const updatedLinks = youtubeLinks.filter((_, i) => i !== index);
                                setYouTubeLinks(updatedLinks);
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {/* Lista de enlaces de Google Drive */}
            <div className="googledrive-links-list">
                {googleDriveLinks.map((link, index) => (
                    <div key={index} className="googledrive-link-item">
                        <GoogleDriveAnnounceCard url={link} />
                        <button
                            className="remove-link-button"
                            onClick={() => {
                                const updatedLinks = googleDriveLinks.filter((_, i) => i !== index);
                                setGoogleDriveLinks(updatedLinks);
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {/* Lista de otros enlaces */}
            <div className="other-links-list">
                {otherLinks.map((link, index) => (
                    <div key={index} className="other-link-item">
                        <OtherLinksAnnounceCard url={link} />
                        <button
                            className="remove-link-button"
                            onClick={() => {
                                const updatedLinks = otherLinks.filter((_, i) => i !== index);
                                setOtherLinks(updatedLinks);
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="classworkBox_Create_footer">
                <button className="classworkBox_Create_footer-button classworkBox_Create_cancel-button" onClick={() => setTitle('')}>
                    {t('classwork_Cancel')}
                </button>
                <button
                    className="classworkBox_Create_footer-button classworkBox_Create_publish-button"
                    onClick={handleSubmit}
                    disabled={isPublishDisabled}
                >
                    {t('classwork_Publish')}
                </button>
            </div>

            {/* Modales */}
            <AnnouncementsYouTubeModal isOpen={isYouTubeModalOpen} onClose={() => setIsYouTubeModalOpen(false)} onSave={addYouTubeLink} />
            <AnnouncementsGoogleDriveModal isOpen={isGoogleDriveModalOpen} onClose={() => setIsGoogleDriveModalOpen(false)} onSave={addGoogleDriveLink} />
            <AnnouncementsOtherLinksModal isOpen={isOtherLinksModalOpen} onClose={() => setIsOtherLinksModalOpen(false)} onSave={addOtherLink} />
        </div>
    );
};

export default ClassworkBox_Create;