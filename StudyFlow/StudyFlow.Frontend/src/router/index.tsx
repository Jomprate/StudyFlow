import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Countries from '../pages/Countries';
import LoggedInMainLayout from '../components/layouts/loggedInMainLayout/LoggedInMainLayout';
import Courses from '../pages/courses/Courses.tsx';
import Notifications from '../pages/Notifications/Notifications.tsx';
import Requests from '../pages/Requests/Requests.tsx';
import Settings from '../pages/Settings/Settings.tsx';
import Course from '../pages/Course/course.tsx';
import Subject from '../pages/Subjects/Subject.tsx';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countries" element={<Countries />} />
                <Route path="/subject" element={<Subject />} />
                <Route path="/home_logged_in" element={<LoggedInMainLayout />}>
                    <Route path="courses" element={<Courses />} />
                    <Route path="course" element={<Course />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="requests" element={<Requests />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;