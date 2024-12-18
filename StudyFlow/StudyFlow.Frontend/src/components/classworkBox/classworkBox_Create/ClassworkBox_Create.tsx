import React, { useState, useRef, useEffect } from 'react';
import './classworkBox_Create.css';
import '../../cards/YoutubeVideoCard/ytvideoCard.css';
import YTVideoAnnounceCard from '../../cards/Announces/YoutubeAnnounceCard/YTVideoAnnounceCard';
import GoogleDriveAnnounceCard from '../../cards/Announces/GoogleDriveAnnounceCard/GoogleDriveAnnounceCard';
import OtherLinksAnnounceCard from '../../cards/Announces/OtherLinksAnnounceCard/OtherLinksAnnounceCard';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { AnnouncementsYouTubeModal, AnnouncementsGoogleDriveModal, AnnouncementsOtherLinksModal } from '../../announcementBox/announcementBox_Create/AnnouncementsModals';
import { subjectApi } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import LinksList from '../../announcementBox/announcementBox_Create/linksList/LinksList';
import { useTextFormatting } from '../../../helpers/hooks/useTextFormatting';
import { useSublistManagement } from '../../../helpers/hooks/useSublistManagement';
import { useLinksManager } from '../../../helpers/hooks/useLinksManager';
import { useDatesManager } from '../../../helpers/hooks/useDatesManager';
import FormattingControls from '../../announcementBox/announcementBox_Create/FormattingControls';
import ExternalDataLinks from '../../../helpers/hooks/ExternalDataLinks';

interface ClassworkBoxCreateProps {
    onClassworkCreated: (classwork: any) => void;
}

const ClassworkBox_Create: React.FC<ClassworkBoxCreateProps> = ({ onClassworkCreated }) => {
    const { t } = useTranslation();
    const { state } = useAuth();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [title, setTitle] = useState<string>('');
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [classworkType, setClassworkType] = useState<string>('Homework');
    const [scheduledDate, setScheduledDate] = useState<string>('');

    const [repeatFrequency, setRepeatFrequency] = useState<number>(1);
    const editorRef = useRef<HTMLDivElement>(null);
    const { activeFormats, applyFormatting, updateActiveFormats } = useTextFormatting(editorRef);
    const youtubeLinksManager = useLinksManager('youtubeLinks');
    const googleDriveLinksManager = useLinksManager('googleDriveLinks');
    const otherLinksManager = useLinksManager('otherLinks');
    const { createSublist } = useSublistManagement(editorRef);
    const [activeModal, setActiveModal] = useState<'youtube' | 'googleDrive' | 'otherLinks' | null>(null);
    const { dates, setDates, isValidDate, generateRepeatedDates, selectedDays, toggleDaySelection } = useDatesManager();

    const multiDateTypes = ['Classroom', 'Exam', 'Project'];

    const daysOfWeek = [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
    ];

    const validateClasswork = (): string[] | null => {
        const isMultiDateType = multiDateTypes.includes(classworkType);

        const finalDates = isMultiDateType
            ? dates
            : [scheduledDate].filter(isValidDate).map((date) => new Date(date).toISOString());

        if (isMultiDateType && finalDates.length === 0) {
            alert(t('error_generate_dates'));
            return null;
        }

        if (!isMultiDateType && finalDates.length !== 1) {
            alert(t('error_single_date_required'));
            return null;
        }

        return finalDates;
    };

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

    const resetForm = () => {
        setTitle('');
        setScheduledDate('');
        editorRef.current!.innerHTML = '';
        youtubeLinksManager.clearLinks();
        googleDriveLinksManager.clearLinks();
        otherLinksManager.clearLinks();
        setDates([]);
    };

    const handleSubmit = async () => {
        const finalDates = validateClasswork();
        if (!finalDates) return;

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
                youTubeVideos: youtubeLinksManager.links || [],
                googleDriveLinks: googleDriveLinksManager.links || [],
                alternateLinks: otherLinksManager.links || [],
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
            const response = await subjectApi.addSubjectByCourse(subjectPayload);

            onClassworkCreated({
                id: response.id || '',
                title,
                content: editorRef.current?.innerHTML.trim(),
                date: finalDates,
                creator: state.userName,
            });

            alert(t('success_subject_created'));
            resetForm();
        } catch (error: any) {
            console.error(t('error_submission'), error.response?.data || error.message);
            alert(t('error_submission_message'));
        }
    };

    const handleSubjectTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassworkType(event.target.value);

        if (!multiDateTypes.includes(event.target.value)) {
            toggleDaySelection(''); // Limpia los días seleccionados
        }
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

            <hr className="classworkBox_Create_separator" />
            <div className="classworkBox_Create_controls">
                <FormattingControls
                    activeFormats={activeFormats}
                    applyFormatting={applyFormatting}
                    createSublist={createSublist}
                />
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
                        onClick={() => {
                            if (!scheduledDate) {
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
                            generateRepeatedDates(scheduledDate, selectedDays, repeatFrequency);
                        }}
                    >
                        {t('generate_dates')}
                    </button>

                    <ul className="classworkBox_Create_generated-dates">
                        {dates.map((date, index) => (
                            <li key={index}>{new Date(date).toLocaleString()}</li>
                        ))}
                    </ul>
                </div>
            )}

            <LinksList
                links={youtubeLinksManager.links}
                onRemove={youtubeLinksManager.removeLink}
                CardComponent={YTVideoAnnounceCard}
            />

            <LinksList
                links={googleDriveLinksManager.links}
                onRemove={googleDriveLinksManager.removeLink}
                CardComponent={GoogleDriveAnnounceCard}
            />

            <LinksList
                links={otherLinksManager.links}
                onRemove={otherLinksManager.removeLink}
                CardComponent={OtherLinksAnnounceCard}
            />

            <div className="classworkBox_Create_footer">
                <ExternalDataLinks onOpenModal={setActiveModal} />

                <div className="classworkBox_Create_footer-buttons">
                    <button
                        className="classworkBox_Create_footer-cancel"
                        onClick={resetForm}
                    >
                        {t('classwork_Cancel')}
                    </button>
                    <button
                        className="classworkBox_Create_footer-publish"
                        onClick={handleSubmit}
                        disabled={isPublishDisabled}
                    >
                        {t('classwork_Publish')}
                    </button>
                </div>
            </div>

            {activeModal === 'youtube' && (
                <AnnouncementsYouTubeModal
                    isOpen
                    onClose={() => setActiveModal(null)}
                    onSave={(link: string) => {
                        youtubeLinksManager.addLink(link);
                        console.log('YouTube Link Added:', link);
                    }}
                />

            )}

            {activeModal === 'googleDrive' && (
                <AnnouncementsGoogleDriveModal
                    isOpen
                    onClose={() => setActiveModal(null)}
                    onSave={(link: string) => {
                        googleDriveLinksManager.addLink(link);
                        console.log('Google Drive Link Added:', link);
                    }}
                />
            )}

            {activeModal === 'otherLinks' && (
                <AnnouncementsOtherLinksModal
                    isOpen
                    onClose={() => setActiveModal(null)}
                    onSave={(link: string) => {
                        otherLinksManager.addLink(link);
                        console.log('Other Link Added:', link);
                    }}
                />

            )}

        </div>
    );
};

export default ClassworkBox_Create;