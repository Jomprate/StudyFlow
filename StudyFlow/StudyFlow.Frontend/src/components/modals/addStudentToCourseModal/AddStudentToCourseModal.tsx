import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { enrollTeacherApi } from '../../../services/api';
import { useParams } from 'react-router-dom';
import './addStudentToCourseModal.css';

interface AddStudentToCourseModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onStudentsAdded?: (students: { email: string }[]) => void; // Callback para enviar los estudiantes agregados
}

const AddStudentToCourseModal: React.FC<AddStudentToCourseModalProps> = ({ open, setOpen, onStudentsAdded }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { courseId } = useParams<{ courseId: string }>();
    const [studentEmail, setStudentEmail] = useState('');
    const [bulkEmails, setBulkEmails] = useState('');
    const [students, setStudents] = useState<{ email: string }[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmails = (emails: string): string[] => {
        return emails
            .split(/[, ]+/)
            .map((email) => email.trim())
            .filter((email) => /\S+@\S+\.\S+/.test(email));
    };

    const handleAddStudent = () => {
        if (!studentEmail || !/\S+@\S+\.\S+/.test(studentEmail)) {
            setError(t('invalid_email'));
            return;
        }

        setStudents((prev) => [...prev, { email: studentEmail }]);
        setStudentEmail('');
        setError('');
    };

    const handleAddBulkStudents = () => {
        const validEmails = validateEmails(bulkEmails);
        if (validEmails.length === 0) {
            setError(t('no_valid_emails'));
            return;
        }

        const newStudents = validEmails.map((email) => ({ email }));
        setStudents((prev) => [...prev, ...newStudents]);
        setBulkEmails('');
        setError('');
    };

    const handleRemoveStudent = (email: string) => {
        setStudents((prev) => prev.filter((student) => student.email !== email));
    };

    const handleSubmit = async () => {
        if (students.length === 0) {
            setError(t('no_students_added'));
            return;
        }

        if (!courseId) {
            setError(t('no_course_id'));
            return;
        }

        setIsLoading(true);
        try {
            for (const student of students) {
                await enrollTeacherApi.addEnrollmentByStudent({
                    courseId,
                    emailStudent: student.email,
                });
            }
            if (onStudentsAdded) {
                onStudentsAdded(students);
            }
            setStudents([]);
            setOpen(false);
        } catch (error) {
            console.error(t('error_adding_students'), error);
            setError(t('error_adding_students'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`add-student-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                <h2 className={`modal-header ${theme}-text`}>{t('add_students_to_course')}</h2>

                <div className="form-container">
                    <div className="form-group">
                        <label>{t('student_email')}</label>
                        <div className="image-field">
                            <input
                                type="email"
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                                className={`${theme}-input`}
                                placeholder={t('enter_student_email')}
                            />
                            <button type="button" className="select-button" onClick={handleAddStudent}>
                                {t('add')}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>{t('bulk_student_emails')}</label>
                        <textarea
                            value={bulkEmails}
                            onChange={(e) => setBulkEmails(e.target.value)}
                            className={`${theme}-input`}
                            placeholder={t('enter_bulk_emails')}
                        />
                        <button type="button" className="select-button" onClick={handleAddBulkStudents}>
                            {t('add_bulk')}
                        </button>
                    </div>

                    <div className="form-group">
                        <label>{t('students_list')}</label>
                        <ul className="students-list">
                            {students.map((student) => (
                                <li key={student.email} className="student-item">
                                    <span>{student.email}</span>
                                    <button
                                        type="button"
                                        className="close-button"
                                        onClick={() => handleRemoveStudent(student.email)}
                                    >
                                        &times;
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {error && <p className="modal-error">{error}</p>}

                    <div className="button-container">
                        <button
                            type="button"
                            className={`submit-button ${theme}-button`}
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? t('loading') : t('submit')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudentToCourseModal;