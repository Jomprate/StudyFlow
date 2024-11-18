import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineRequestPage } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import './sidebarMenu.css';
import { useAuth } from '../../contexts/AuthContext';
import { courseApi, enrollStudentApi } from '../../services/api';

interface SidebarMenuProps {
    visible: boolean;
}

interface Course {
    id: string;
    name: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ visible }) => {
    const location = useLocation();
    const { t } = useTranslation();
    const { state } = useAuth();
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userRole = state.role;
                const userId = state.userName;

                if (userRole === 'Teacher' && userId !== null) {
                    const courses = await courseApi.getCoursesByTeacherIdAsync(userId);
                    setAllCourses(courses);
                }
                else if (userRole === 'Student' && userId !== null) {
                    const response = await enrollStudentApi.getCoursesByStudentIdAsync(userId, 1, 100);
                    setAllCourses(response.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [state.role, state.userName]);

    return (
        <div className={`custom-sidebar ${visible ? '' : 'collapsed'}`}>
            <nav>
                <ul>
                    {/* Enlace a la página de inicio */}
                    <li className={`item ${location.pathname === '/mainloggedin' ? 'active' : ''}`}>
                        <Link to="mainloggedin">
                            <AiOutlineHome className="icon" />
                            {visible && <span>{t('Main')}</span>}
                        </Link>
                    </li>

                    {/* Enlace a los cursos */}
                    <li className={`item ${location.pathname === '/courses' ? 'active' : ''}`}>
                        <Link to="courses">
                            <HiOutlineBookOpen className="icon" />
                            {visible && <span>{t('sideBar_loggedIn_Courses')}</span>}
                        </Link>
                    </li>

                    {/* Enlace fijo a Course */}
                    <li className={`sub-item ${location.pathname === '/course' ? 'active' : ''}`}>
                        <Link to="course">
                            <HiOutlineBookOpen className="icon" />
                            {visible && <span>{t('Course')}</span>}
                        </Link>
                    </li>

                    {allCourses.length > 0 ? (
                        allCourses.map((course) => (
                            <li key={course.id} className={`sub-item ${location.pathname === `/course/${course.id}` ? 'active' : ''}`}>
                                <Link to={`/home_logged_in/course/${course.id}`}>
                                    <HiOutlineBookOpen className="icon" />
                                    {visible && <span>{course.name}</span>}
                                </Link>
                            </li>
                        ))
                    ) : (
                        visible && <li className="no-courses">{t('No courses available')}</li>
                    )}

                    <li className={`item ${location.pathname === '/calendar' ? 'active' : ''}`}>
                        <Link to="calendar">
                            <BiCalendar className="icon" />
                            {visible && <span>{t('Calendar')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/notifications' ? 'active' : ''}`}>
                        <Link to="notifications">
                            <AiOutlineBell className="icon" />
                            {visible && <span>{t('Notifications')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/requests' ? 'active' : ''}`}>
                        <Link to="requests">
                            <MdOutlineRequestPage className="icon" />
                            {visible && <span>{t('Requests')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/settings' ? 'active' : ''}`}>
                        <Link to="settings">
                            <AiOutlineSetting className="icon" />
                            {visible && <span>{t('Settings')}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;