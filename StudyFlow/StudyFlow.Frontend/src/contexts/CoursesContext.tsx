import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { courseApi, enrollStudentApi } from '../services/api';

interface Course {
    id: string;
    name: string;
    logo?: string;
    isDeleted?: boolean;
}

interface CoursesContextType {
    courses: Course[];
    fetchCourses: () => void;
    resetCourses: () => void;
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

    const resetCourses = () => {
        setCourses([]);
        setHasFetched(false);
    };

    useEffect(() => {
        if (state.role && state.userName && !hasFetched) {
            fetchCourses();
        }
    }, [state.role, state.userName, hasFetched]);

    const value = useMemo(() => ({
        courses,
        fetchCourses: () => fetchCourses(true),
        resetCourses,
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