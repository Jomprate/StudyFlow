import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { courseApi, enrollStudentApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Course {
    id: string;
    name: string;
    logo?: string;
    isDeleted?: boolean;
}

interface CoursesContextType {
    courses: Course[];
    fetchCourses: () => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchCourses = async (forceRefresh = false) => {
        if (hasFetched && !forceRefresh) return;
        setHasFetched(true);

        try {
            const { role: userRole, userName: userId } = state;

            if (userRole === 'Teacher' && userId) {
                const response = await courseApi.getCoursesByTeacherIdAsync(userId);
                const filteredCourses = response.data.filter((course: Course) => !course.isDeleted);
                setCourses(filteredCourses);
            } else if (userRole === 'Student' && userId) {
                const response = await enrollStudentApi.getCoursesByStudentIdAsync(userId, 1, 100);
                const filteredCourses = response.data.filter((course: Course) => !course.isDeleted);
                setCourses(filteredCourses);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        if (state.role && state.userName && !hasFetched) {
            fetchCourses();
        }
    }, [state.role, state.userName, hasFetched]);

    const value = useMemo(() => ({
        courses,
        fetchCourses: () => fetchCourses(true),
    }), [courses]);

    return (
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    );
};

export const useCourses = () => {
    const context = useContext(CoursesContext);
    if (!context) {
        throw new Error('useCourses must be used within a CoursesProvider');
    }
    return context;
};