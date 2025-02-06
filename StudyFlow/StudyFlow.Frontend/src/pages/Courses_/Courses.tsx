import React, { useState, useEffect } from 'react';
import './courses.css';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import CreateCourseModal from '../../components/modals/createCourseModal/CreateCourseModal';
import Popup from '../../components/modals/PopUp/PopUp';
import { useTranslation } from 'react-i18next';
import MainCourseCard from '../../components/cards/mainCourseCard/MainCourseCard';
import Pagination from '@components/pagination/Pagination';
import { useCourses } from '../../contexts/CoursesContext';
import { announceApi } from '../../services/api';
import CourseDataCard from '../../components/cards/courseDataCard/courseDataCard';

interface Student {
    id: string;
    name: string;
}

interface Course {
    id: string;
    name: string;
    description: string;
    createdBy?: string;
    enrolled?: boolean;
    teacher: string;
    logo?: string;
    isDeleted?: boolean;
    userId?: string;
}

const Courses: React.FC = () => {
    const { theme } = useTheme();
    const { state } = useAuth();
    const { t } = useTranslation();
    const { courses, fetchCourses } = useCourses();
    const [paginatedCourses, setPaginatedCourses] = useState<Course[]>([]);
    const [students, _setStudents] = useState<Student[]>([]);
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [activeTab, setActiveTab] = useState<'students' | 'courseData'>('students');
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [announcementCount, setAnnouncementCount] = useState(0);

    useEffect(() => {
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        setPaginatedCourses(courses.slice(startIndex, endIndex) as Course[]);
        setTotalPages(Math.ceil(courses.length / recordsPerPage));
    }, [courses, currentPage, recordsPerPage]);

    useEffect(() => {
        if (activeTab === 'courseData' && selectedCourseId) {
            fetchAnnouncementsCount(selectedCourseId);
        }
    }, [activeTab, selectedCourseId]);

    const fetchAnnouncementsCount = async (courseId: string) => {
        try {
            const data = await announceApi.getCourseAnnouncesPaginated(courseId, 1, 1000, '');
            const totalAnnouncements = data.data.length || 0;

            setAnnouncementCount(totalAnnouncements);
        } catch (error) {
            console.error('Error fetching announcements count:', error);
            setAnnouncementCount(0);
        }
    };

    const handleCourseClick = (courseId: string) => {
        setSelectedCourseId(courseId);
        setActiveTab('courseData');
    };

    const handleCourseCreated = async () => {
        await fetchCourses();
        setCurrentPage(1);
    };

    const handlePopupOpen = () => {
        setPopupMessage(t('popup_message'));
        setShowPopup(true);
    };

    const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
        setRecordsPerPage(newRecordsPerPage);
        setCurrentPage(1);
    };

    return (
        <div className={`courses_page ${theme}`}>
            <div className="courses-header-container">
                <div className="courses-header-box">
                    <h1>{t('courses_title_2')}</h1>
                    <p>{state.role === 'Teacher'
                        ? t('courses_subtitle_teacher')
                        : t('courses_subtitle_student')}
                    </p>
                </div>
            </div>

            <div className="courses-columns">
                <div className="column-box">
                    <div className="courses-left">
                        {state.role === 'Teacher' && (
                            <>
                                <button
                                    className="create-course-button"
                                    onClick={() => setIsCreateCourseModalOpen(true)}
                                >
                                    {t('create_course_button')}
                                </button>

                                <button
                                    className="open-popup-button"
                                    onClick={handlePopupOpen}
                                >
                                    {t('open_popup_button')}
                                </button>

                                <h2>{t('courses_created_courses_title')}</h2>
                                <div className="course-list">
                                    {paginatedCourses.length > 0 ? (
                                        paginatedCourses.map(course => (
                                            <MainCourseCard
                                                key={course.id}
                                                id={course.id}
                                                name={course.name}
                                                description={course.description}
                                                teacher={course.teacher}
                                                image={course.logo || ""}
                                                onCourseDeleted={fetchCourses}
                                                userId={course.userId ?? ""}
                                                onClick={() => handleCourseClick(course.id)}
                                            />
                                        ))
                                    ) : (
                                        <p>{t('no_courses_message')}</p>
                                    )}
                                </div>

                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                    recordsPerPage={recordsPerPage}
                                    onRecordsPerPageChange={handleRecordsPerPageChange}
                                />
                            </>
                        )}

                        {state.role === 'Student' && (
                            <>
                                <h2>{t('courses_enrolled_courses_title')}</h2>
                                <div className="course-list">
                                    {paginatedCourses.length > 0 ? (
                                        paginatedCourses.map(course => (
                                            <MainCourseCard
                                                key={course.id}
                                                id={course.id}
                                                name={course.name}
                                                description={course.description}
                                                teacher={course.teacher}
                                                image={course.logo || ""}
                                                onCourseDeleted={fetchCourses}
                                                userId={course.userId ?? ""}
                                                onClick={() => handleCourseClick(course.id)}
                                            />
                                        ))
                                    ) : (
                                        <p>{t('no_enrolled_courses_message')}</p>
                                    )}
                                </div>

                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                    recordsPerPage={recordsPerPage}
                                    onRecordsPerPageChange={handleRecordsPerPageChange}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="column-box">
                    <div className="courses-right">
                        {state.role === 'Teacher' || state.role === 'Admin' ? (
                            <>
                                <div className="button-group">
                                    <button
                                        className={`toggle-button ${activeTab === 'students' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('students')}
                                    >
                                        {t('show_students_button')}
                                    </button>
                                    <button
                                        className={`toggle-button ${activeTab === 'courseData' ? 'active' : ''}`}
                                        onClick={() => selectedCourseId && setActiveTab('courseData')}
                                        disabled={!selectedCourseId}
                                    >
                                        {t('show_course_data_button')}
                                    </button>
                                </div>

                                {activeTab === 'students' && (
                                    <>
                                        <h2>{t('enrolled_students_title')}</h2>
                                        <ul className="student-list">
                                            {students.map(student => (
                                                <li key={student.id} className="student-item">
                                                    {student.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {activeTab === 'courseData' && selectedCourseId && (
                                    <>
                                        <h2>{t('course_data_title')}</h2>
                                        <div className="course-data-list">
                                            <CourseDataCard title={t('created_announcements')} value={announcementCount} />
                                            <CourseDataCard title={t('created_classwork')} value={0} />
                                            <CourseDataCard title={t('deleted_classwork')} value={0} />
                                        </div>
                                    </>
                                )}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            <CreateCourseModal
                open={isCreateCourseModalOpen}
                setOpen={setIsCreateCourseModalOpen}
                onCourseCreated={handleCourseCreated}
            />

            {showPopup && (
                <Popup
                    message={popupMessage}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default Courses;
