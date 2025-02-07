/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
    fetchCourses: (forceRefresh?: boolean) => void;
    resetCourses: () => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchCoursesForTeacher = async (userId: string) => {
        const response = await courseApi.getCoursesByTeacherIdAsync(userId);
        return response.data.filter((course: Course) => !course.isDeleted);
    };

    

    const fetchCoursesForStudent = async (userId: string) => {
        const response = await enrollStudentApi.getCoursesByStudentIdAsync(userId, 1, 100);
        return response.data.filter((course: Course) => !course.isDeleted);
    };


    const fetchCourses = async (forceRefresh = false) => {
        if (hasFetched && !forceRefresh) return;

        try {
            const { role: userRole, userName: userId } = state;
            if (!userId) return;

            const fetchedCourses =
                userRole === 'Teacher'
                    ? await fetchCoursesForTeacher(userId)
                    : userRole === 'Student'
                        ? await fetchCoursesForStudent(userId)
                        : [];

            setCourses(fetchedCourses);
            setHasFetched(true);  
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    const resetCourses = () => {
        setCourses([]);
        setHasFetched(false);
    };

    useEffect(() => {
        if (state.role && state.userName) {
            resetCourses();       
            fetchCourses(true);   
        }
    }, [state.role, state.userName]);


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