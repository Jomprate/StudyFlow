import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { useParams } from 'react-router-dom';
import AddStudentToCourseModal from '@components/modals/addStudentToCourseModal/AddStudentToCourseModal';
import PersonCard from '@components/cards/personCard/PersonCard';
import { enrollApi, userApi } from '../../../services/api'; // Ajusta la ruta según sea necesario
import userPlaceholder from '../../../assets/user_p.svg';
import './course_people.css';

interface Enrollment {
    id: string;
    studentName: string;
    email: string;
    enrollmentDate: string;
    isEnabled: boolean;
    isCompleted: boolean;  // Asegúrate de incluir esta propiedad
    profileImageUrl?: string;
}

const Course_People: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [isModalOpen, setModalOpen] = useState(false);
    const [students, setStudents] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfileImage = async (userId: string) => {
        try {
            const response = await userApi.getuserbyid(userId);
            const userData = response.data;
            return userData.profilePicture
                ? `data:image/png;base64,${userData.profilePicture}`
                : userPlaceholder;
        } catch (error) {
            console.error(`Error fetching profile image for user ${userId}:`, error);
            return userPlaceholder;
        }
    };

    const handleAddStudents = (students: { email: string }[]) => {
        console.log('Students added:', students);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            if (!courseId) return;

            try {
                setLoading(true);
                const response = await enrollApi.getEnrollmentsByCourseId(courseId, 1, 10);

                // Verifica la respuesta de la API
                console.log("Students fetched:", response.data);

                const studentsWithImages = await Promise.all(
                    response.data.map(async (student) => {
                        const profileImageUrl = await fetchUserProfileImage(student.id);
                        return {
                            ...student,
                            profileImageUrl,
                        };
                    })
                );

                setStudents(studentsWithImages);
                setError(null);
            } catch (error: any) {
                setError(t('error_loading_students'));
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [courseId, t]);

    return (
        <div className={`people-page ${theme}`}>
            <div className="people-container">
                <div className="people-layout">
                    <div className="people-main">
                        <div className="people-add-container" onClick={() => setModalOpen(true)}>
                            <span className="people-add-text">{t('add_students')}</span>
                        </div>

                        <div className="people-list">
                            <h3>{t('people_list')}</h3>
                            {loading ? (
                                <p>{t('loading')}</p>
                            ) : error ? (
                                <p className="error-message">{error}</p>
                            ) : students.length === 0 ? (
                                <p>{t('no_students')}</p>
                            ) : (
                                students.map((student) => (
                                    <PersonCard
                                        key={student.id}
                                        id={student.id}
                                        name={student.studentName}
                                        role={t('student')}
                                        profileImageUrl={student.profileImageUrl}
                                        email={student.email}
                                        enrollmentDate={student.enrollmentDate}
                                        isEnabled={student.isEnabled}
                                        isCompleted={student.isCompleted} // Pasa el valor isCompleted
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="people-empty"></div>
                </div>
            </div>

            <AddStudentToCourseModal
                open={isModalOpen}
                setOpen={setModalOpen}
                onStudentsAdded={handleAddStudents}
            />
        </div>
    );
};

export default Course_People;