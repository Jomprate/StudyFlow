import React, { useState, useEffect } from 'react';
import './main_loggedIn.css';
import { useTheme } from '../../ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import CreateCourseModal from '../../components/modals/createCourseModal/CreateCourseModal';
import Popup from '../../components/modals/PopUp/PopUp';
import { useTranslation } from 'react-i18next'; // Importa useTranslation para traducciones

interface Course {
    id: string;
    name: string;
    createdBy?: string;
    enrolled?: boolean;
}

interface Student {
    id: string;
    name: string;
}

const MainLoggedIn: React.FC = () => {
    const { theme } = useTheme();
    const { state } = useAuth();
    const { t } = useTranslation(); // Traducciones

    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(''); // Mensaje para el Popup

    useEffect(() => {
        const userRole = state.role;
        const allCourses: Course[] = [
            { id: '1', name: 'Course 1', createdBy: 'teacherId', enrolled: true },
            { id: '2', name: 'Course 2', createdBy: 'teacherId', enrolled: false },
        ];
        const enrolledStudents: Student[] = [
            { id: '1', name: 'John Doe' },
            { id: '2', name: 'Jane Smith' }
        ];

        if (userRole === 'Teacher') {
            setUserCourses(allCourses.filter(course => course.createdBy === 'teacherId'));
            setStudents(enrolledStudents);
        } else {
            setUserCourses(allCourses.filter(course => course.enrolled));
        }
    }, [state.role]);

    // Manejador para abrir el popup con un mensaje específico
    const handlePopupOpen = () => {
        setPopupMessage(t('popup_message')); // Traduce el mensaje del Popup
        setShowPopup(true);
    };

    return (
        <div className={`main_loggedIn_page ${theme}`}>
            <div className="main_loggedIn-header">
                <h1>{t('main_title')}</h1> {/* Título traducido */}
                <p>{t('main_subtitle')}</p> {/* Subtítulo traducido */}
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
                                <ul className="course-list">
                                    {userCourses.map(course => (
                                        <li key={course.id} className="course-item">
                                            {course.name}
                                        </li>
                                    ))}
                                </ul>
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
            />

            {/* Popup Component */}
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
