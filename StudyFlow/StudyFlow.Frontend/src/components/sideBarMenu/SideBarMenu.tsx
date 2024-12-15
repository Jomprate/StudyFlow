import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineRequestPage } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import './sidebarMenu.css';
import { useCourses } from '../../contexts/CoursesContext';
import defaultCourseImage from '../../assets/user_p.svg';

interface SidebarMenuProps {
    visible: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ visible }) => {
    const location = useLocation();
    const { t } = useTranslation();
    const { courses } = useCourses();

    useEffect(() => {
        console.log('Courses updated:', courses);
    }, [courses]);

    return (
        <div className={`custom-sidebar ${visible ? 'open' : 'collapsed'}`}>
            <nav>
                <ul>
                    {/* Main Section */}
                    <li className={`item ${location.pathname === '/home_logged_in/mainloggedin' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/mainloggedin">
                            <AiOutlineHome className="icon" />
                            {visible && <span>{t('Main')}</span>}
                        </Link>
                    </li>

                    {/* Courses Section */}
                    <li className={`item ${location.pathname === '/home_logged_in/courses' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/courses">
                            <HiOutlineBookOpen className="icon" />
                            {visible && <span>{t('sideBar_loggedIn_Courses')}</span>}
                        </Link>
                    </li>

                    {/* Dynamically Rendered Courses */}
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <li
                                key={course.id}
                                className={`sub-item ${location.pathname === `/home_logged_in/course/${course.id}` ? 'active' : ''}`}
                            >
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

                    {/* Calendar Section */}
                    <li className={`item ${location.pathname === '/home_logged_in/calendar' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/calendar">
                            <BiCalendar className="icon" />
                            {visible && <span>{t('Calendar')}</span>}
                        </Link>
                    </li>

                    {/* Notifications Section */}
                    <li className={`item ${location.pathname === '/home_logged_in/notifications' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/notifications">
                            <AiOutlineBell className="icon" />
                            {visible && <span>{t('Notifications')}</span>}
                        </Link>
                    </li>

                    {/* Requests Section */}
                    <li className={`item ${location.pathname === '/home_logged_in/requests' ? 'active' : ''}`}>
                        <Link to="/home_logged_in/requests">
                            <MdOutlineRequestPage className="icon" />
                            {visible && <span>{t('Requests')}</span>}
                        </Link>
                    </li>

                    {/* Settings Section */}
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
};

export default SidebarMenu;