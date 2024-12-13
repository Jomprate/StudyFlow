import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineRequestPage } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import './sidebarMenu.css';
import { useAuth } from '../../contexts/AuthContext';
import { courseApi, enrollStudentApi } from '../../services/api';
import defaultCourseImage from '../../assets/user_p.svg';

interface SidebarMenuProps {
    visible: boolean;
}

interface Course {
    id: string;
    name: string;
    logo?: string;
}

const SidebarMenu = forwardRef(({ visible }: SidebarMenuProps, ref) => {
    const location = useLocation();
    const { t } = useTranslation();
    const { state } = useAuth();
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    const fetchCourses = async () => {
        try {
            const userRole = state.role;
            const userId = state.userName;

            if (userRole === 'Teacher' && userId !== null) {
                const courses = await courseApi.getCoursesByTeacherIdAsync(userId);
                const filteredCourses = courses.data.filter((course: any) => !course.isDeleted);
                setAllCourses(filteredCourses);
            } else if (userRole === 'Student' && userId !== null) {
                const response = await enrollStudentApi.getCoursesByStudentIdAsync(userId, 1, 100);
                const filteredCourses = response.data.filter((course: any) => !course.isDeleted);
                setAllCourses(filteredCourses);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [state.role, state.userName]);

    useImperativeHandle(ref, () => ({
        fetchCourses,
    }));

    return (
        <div className={`custom-sidebar ${visible ? '' : 'collapsed'}`}>
            <nav>
                <ul>
                    <li className={`item ${location.pathname === '/home_logged_in/mainloggedin' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/mainloggedin">
                            <AiOutlineHome className="icon" />
                            {visible && <span>{t('Main')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/home_logged_in/courses' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/courses">
                            <HiOutlineBookOpen className="icon" />
                            {visible && <span>{t('sideBar_loggedIn_Courses')}</span>}
                        </Link>
                    </li>

                    {allCourses.length > 0 ? (
                        allCourses.map((course) => (
                            <li key={course.id} className={`sub-item ${location.pathname === `/home_logged_in/course/${course.id}` ? 'active' : ''}`}>
                                <Link to={`/home_logged_in/course/${course.id}`} className="course-link">
                                    <img
                                        src={course.logo ? `data:image/png;base64,${course.logo}` : defaultCourseImage}
                                        alt={course.name}
                                        className="course-logo"
                                    />
                                    {visible && <span>{course.name}</span>}
                                </Link>
                            </li>
                        ))
                    ) : (
                        visible && <li className="no-courses">{t('No courses available')}</li>
                    )}

                    <li className={`item ${location.pathname === '/home_logged_in/calendar' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/calendar">
                            <BiCalendar className="icon" />
                            {visible && <span>{t('Calendar')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/home_logged_in/notifications' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/notifications">
                            <AiOutlineBell className="icon" />
                            {visible && <span>{t('Notifications')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/home_logged_in/requests' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/requests">
                            <MdOutlineRequestPage className="icon" />
                            {visible && <span>{t('Requests')}</span>}
                        </Link>
                    </li>

                    <li className={`item ${location.pathname === '/home_logged_in/settings' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/settings">
                            <AiOutlineSetting className="icon" />
                            {visible && <span>{t('Settings')}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
});

export default SidebarMenu;