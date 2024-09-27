import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Countries from '../pages/Countries';
import LoggedInMainLayout from '../Components/layouts/loggedInMainLayout/LoggedInMainLayout';
import Courses from '../pages/courses/Courses.tsx';
import Notifications from '../pages/Notifications/Notifications.tsx';
import Requests from '../pages/Requests/Requests.tsx';
import Settings from '../pages/Settings/Settings.tsx';
import Course from '../pages/Course/course.tsx';
import Subject from '../pages/Subjects/Subject.tsx';
import Notification from '../pages/Notification/Notification.tsx';
import CourseCrud from '../pages/Course/CourseCrud.tsx';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countries" element={<Countries />} />
                <Route path="/subject/create" element={<Subject />} />
                <Route path="/subject" element={<Subject method='get' />} />
                <Route path="/subject/update/:subjectId" element={<Subject method='put' />} />
                <Route path="/subject/student/:studentId" element={<Subject method='get-student-id' />} />
                <Route path="/subject/teacher/:teacherId" element={<Subject method='get-teacher-id' />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/notification/:notificationId" element={<Notification />} />
                <Route path="/notification/create" element={<Notification method='post' />} />
                <Route path="/notification/update/:notificationId" element={<Notification method='put' />} />
                <Route path="/notification/update/:notificationId" element={<Notification method='put' />} />
                <Route path="/course/create" element={<CourseCrud />} />
                <Route path="/course" element={<CourseCrud method='get'/>} />
                <Route path="/course/:courseId" element={<CourseCrud method='get'/>} />
                <Route path="/course/update/:courseId" element={<CourseCrud method='put'/>} />
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