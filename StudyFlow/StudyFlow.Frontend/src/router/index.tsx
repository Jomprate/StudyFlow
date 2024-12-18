import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Countries from '../pages/Countries';
import LoggedInMainLayout from '../components/layouts/loggedInMainLayout/LoggedInMainLayout';
import Courses from '../pages/Courses_/Courses.tsx';
import Notifications from '../pages/Notifications/Notifications.tsx';
import Requests from '../pages/Requests/Requests.tsx';
import Settings from '../pages/Settings/Settings.tsx';
import Course from '../pages/Course_/Course_.tsx';
import Notification from '../pages/Notification/Notification.tsx';
import Calendar from '../pages/Calendar_/Calendar.tsx';
import ConfirmPage from '../pages/ConfirmEmailPage/Confirm_page.tsx';
import RecoveryPassword from '../pages/RecoveryPassword/RecoveryPassword.tsx'
import MainLoggedIn from '../pages/Main_loggedIn/MainLoggedIn.tsx';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/confirmpage" element={<ConfirmPage />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/notification/:notificationId" element={<Notification />} />
            <Route path="/notification/create" element={<Notification method='post' />} />
            <Route path="/notification/update/:notificationId" element={<Notification method='put' />} />
            <Route path="/notification/update/:notificationId" element={<Notification method='put' />} />
            <Route path="/home_logged_in" element={<LoggedInMainLayout />}>
                <Route index element={<Navigate to="mainloggedin" />} />
                <Route path="mainloggedin" element={<MainLoggedIn />} />
                <Route path="courses" element={<Courses />} />
                <Route path="course" element={<Course />} />
                <Route path="/home_logged_in/course/:courseId" element={<Course />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="requests" element={<Requests />} />
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/recoverypassword" element={<RecoveryPassword />} />
        </Routes>
    );
};

export default Router;