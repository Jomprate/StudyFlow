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
    const [scheduledDate, setScheduledDate] = useState<string>('');
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

    const [scheduledDates, setScheduledDates] = useState<string[]>([]);
    const [repeatFrequency, setRepeatFrequency] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    const [generatedDates, setGeneratedDates] = useState<string[]>([]);

    const multiDateTypes = ['Classroom', 'Exam', 'Project'];

    const daysOfWeek = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
    ];

    const isValidDate = (date: string) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    };

    const generateRepeatedDates = (startDate: string) => {
        if (!isValidDate(startDate)) {
            alert(t('error_invalid_start_date'));
            return;
        }

        if (selectedDays.length === 0) {
            alert(t('error_no_days_selected'));
            return;
        }

        if (repeatFrequency <= 0) {
            alert(t('error_invalid_frequency'));
            return;
        }

        const start = new Date(startDate);
        const dates: string[] = [];
        const maxOccurrences = 10;

        for (let i = 0; dates.length < maxOccurrences; i++) {
            const nextDate = new Date(start);
            nextDate.setDate(start.getDate() + i * repeatFrequency);

            const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
            if (selectedDays.includes(dayName) && isValidDate(nextDate.toISOString())) {
                dates.push(nextDate.toISOString());
            }
        }

        if (dates.length === 0) {
            alert(t('error_no_dates_generated'));
        } else {
            setGeneratedDates(dates);
            setScheduledDates(dates);
        }
    };

    const toggleDaySelection = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    useEffect(() => {
        const storedYouTubeLinks = sessionStorage.getItem('youtubeLinks');
        const storedGoogleDriveLinks = sessionStorage.getItem('googleDriveLinks');
        const storedOtherLinks = sessionStorage.getItem('otherLinks');

        if (storedYouTubeLinks) setYouTubeLinks(JSON.parse(storedYouTubeLinks));
        if (storedGoogleDriveLinks) setGoogleDriveLinks(JSON.parse(storedGoogleDriveLinks));
        if (storedOtherLinks) setOtherLinks(JSON.parse(storedOtherLinks));
    }, []);

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

    const handleSubmit = async () => {
        const isMultiDateType = multiDateTypes.includes(classworkType);

        const finalDates = isMultiDateType
            ? scheduledDates.filter(isValidDate)
            : [scheduledDate].filter(isValidDate).map((date) => new Date(date).toISOString());

        if (isMultiDateType && finalDates.length === 0) {
            alert(t('error_generate_dates'));
            return;
        } else if (!isMultiDateType && finalDates.length !== 1) {
            alert(t('error_single_date_required'));
            return;
        }

        const subjectPayload = {
            courseId: courseId || 'default_course_id',
            subjectDTO: {
                course: {
                    id: courseId || 'default_course_id',
                    teacherDTO: {
                        id: state.userName || 'unknown',
                        fullName: state.fullName || t('unknown_teacher'),
                    },
                    name: t('default_course_name'),
                    description: t('default_course_description'),
                    logo: t('default_course_logo'),
                    isEnabled: true,
                },
                name: title,
                htmlContent: editorRef.current?.innerHTML.trim() || '',
                type: classworkType,
                youTubeVideos: youtubeLinks || [],
                googleDriveLinks: googleDriveLinks || [],
                alternateLinks: otherLinks || [],
                listScheduleds: finalDates.map((date) => ({
                    id: crypto.randomUUID(),
                    scheduledDate: date,
                    link: 'string',
                })),
                creationDate: new Date().toISOString(),
                modifiedDate: new Date().toISOString(),
            },
        };

        try {
            console.log('Submitting:', JSON.stringify(subjectPayload, null, 2));
            const response = await subjectApi.addSubjectByCourse(subjectPayload);

            onClassworkCreated({
                id: response.id || '',
                title,
                content: editorRef.current?.innerHTML.trim(),
                date: finalDates,
                creator: state.userName,
            });
            alert(t('success_subject_created'));
        } catch (error: any) {
            console.error(t('error_submission'), error.response?.data || error.message);
            alert(t('error_submission_message'));
        }
    };

    const applyFormatting = (command: string) => {
        if (editorRef.current) {
            document.execCommand(command, false);
            handleInput();
        }
    };

    const handleSubjectTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassworkType(event.target.value);
    };

    const addYouTubeLink = (link: string) => {
        const updatedLinks = [...youtubeLinks, link];
        setYouTubeLinks(updatedLinks);
        sessionStorage.setItem('youtubeLinks', JSON.stringify(updatedLinks));
    };

    const addGoogleDriveLink = (link: string) => {
        const updatedLinks = [...googleDriveLinks, link];
        setGoogleDriveLinks(updatedLinks);
        sessionStorage.setItem('googleDriveLinks', JSON.stringify(updatedLinks));
    };

    const addOtherLink = (link: string) => {
        const updatedLinks = [...otherLinks, link];
        setOtherLinks(updatedLinks);
        sessionStorage.setItem('otherLinks', JSON.stringify(updatedLinks));
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
                    <span className="classworkBox_Create_date-icon"></span>
                </div>
            </div>

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

            {classworkType === 'Classroom' && (
                <div className="classworkBox_Create_repeat-container">
                    <label htmlFor="repeatFrequency" className="classworkBox_Create_repeat-label">
                        {t('repeat_every')}:
                    </label>
                    <input
                        id="repeatFrequency"
                        type="number"
                        min={1}
                        value={repeatFrequency}
                        onChange={(e) => setRepeatFrequency(Number(e.target.value))}
                        className="classworkBox_Create_repeat-input"
                    />

                    <div className="classworkBox_Create_days-container">
                        {daysOfWeek.map((day) => (
                            <label key={day.value} className="classworkBox_Create_day">
                                <input
                                    type="checkbox"
                                    checked={selectedDays.includes(day.value)}
                                    onChange={() => toggleDaySelection(day.value)}
                                />
                                {t(day.label)}
                            </label>
                        ))}
                    </div>

                    <button
                        className="classworkBox_Create_generate-dates-button"
                        onClick={() => generateRepeatedDates(scheduledDate)}
                    >
                        {t('generate_dates')}
                    </button>

                    <ul className="classworkBox_Create_generated-dates">
                        {generatedDates.map((date, index) => (
                            <li key={index}>{new Date(date).toLocaleString()}</li>
                        ))}
                    </ul>
                </div>
            )}

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

            <AnnouncementsYouTubeModal isOpen={isYouTubeModalOpen} onClose={() => setIsYouTubeModalOpen(false)} onSave={addYouTubeLink} />
            <AnnouncementsGoogleDriveModal isOpen={isGoogleDriveModalOpen} onClose={() => setIsGoogleDriveModalOpen(false)} onSave={addGoogleDriveLink} />
            <AnnouncementsOtherLinksModal isOpen={isOtherLinksModalOpen} onClose={() => setIsOtherLinksModalOpen(false)} onSave={addOtherLink} />
        </div>
    );
};

export default ClassworkBox_Create;