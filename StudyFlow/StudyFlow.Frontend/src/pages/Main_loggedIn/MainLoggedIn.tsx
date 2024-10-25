import React, { useState, useEffect } from 'react';
import './main_loggedIn.css';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import CreateCourseModal from '../../components/modals/createCourseModal/CreateCourseModal';
import Popup from '../../components/modals/PopUp/PopUp';
import { useTranslation } from 'react-i18next';
import CourseCard from '../../components/cards/courseCard/CourseCard';
import Pagination from '@components/pagination/Pagination';
import { getCoursesByTeacherIdPaginatedAsync } from '../../services/api';

interface Course {
    id: string;
    name: string;
    description: string;
    createdBy?: string;
    enrolled?: boolean;
    teacher: string;
    logo?: string;
}

interface Student {
    id: string;
    name: string;
}

const MainLoggedIn: React.FC = () => {
    const { theme } = useTheme();
    const { state } = useAuth();
    const { t } = useTranslation();

    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [courseCreated, setCourseCreated] = useState(false); // Estado para manejar la actualización

    const fetchCourses = async () => {
        try {
            const userRole = state.role;
            const teacherId = state.userName;

            if (userRole === 'Teacher' && teacherId) {
                const { data, totalPages } = await getCoursesByTeacherIdPaginatedAsync(
                    teacherId,
                    currentPage,
                    recordsPerPage
                );

                setUserCourses(data);
                setTotalPages(totalPages);
            }
        } catch (error) {
            console.error('Error fetching paginated courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [state.role, state.userName, currentPage, recordsPerPage, courseCreated]); // Se agrega `courseCreated`

    // Función que se llama cuando se crea un nuevo curso
    const handleCourseCreated = () => {
        setCourseCreated(prev => !prev); // Cambia el estado para forzar la actualización
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
        <div className={`main_loggedIn_page ${theme}`}>
            <div className="main_loggedIn-header">
                <h1>{t('main_title')}</h1>
                <p>{t('main_subtitle')}</p>
            </div>

            <div className="main_loggedIn-columns">
                <div className="column-box">
                    <div className="main_loggedIn-left">
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

                                <h2>{t('created_courses_title')}</h2>
                                <div className="course-list">
                                    {userCourses.map(course => (
                                        <CourseCard
                                            key={course.id}
                                            name={course.name}
                                            description={course.description}
                                            teacher={course.teacher}
                                            image={course.logo || ""}
                                        />
                                    ))}
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
                    <div className="main_loggedIn-right">
                        {state.role === 'Teacher' && (
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
                    </div>
                </div>
            </div>

            <CreateCourseModal
                open={isCreateCourseModalOpen}
                setOpen={setIsCreateCourseModalOpen}
                onCourseCreated={handleCourseCreated} // Pasa el callback al modal
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

export default MainLoggedIn;