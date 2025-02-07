/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './updateCourseModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { courseApi } from '../../../services/api';
import userPlaceholder from '../../../assets/user_p.svg';
import ImageCropModal from '../imageCropModal/ImageCropModal';
import { useAuth } from '../../../contexts/AuthContext';
import { useCourses } from '../../../contexts/CoursesContext';

interface UpdateCourseModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    courseId: string;
    onCourseUpdated?: () => void;
}

const UpdateCourseModal: React.FC<UpdateCourseModalProps> = ({ open, setOpen, courseId, onCourseUpdated }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { state } = useAuth();
    const { fetchCourses } = useCourses();

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            description: '',
            logo: '',
            isEnabled: true,
        },
    });

    const [problemMessage, setProblemMessage] = useState('');
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    useEffect(() => {
        if (open && courseId) {

            (async () => {
                try {
                    const course = await courseApi.getCourseByIdAsync(courseId, state.userName?.toString() ?? '');
                    setValue('name', course.data.name);
                    setValue('description', course.data.description);
                    setImagePreview(`data:image/png;base64,${course.data.logo}`);
                } catch (error) {
                    console.error('Error loading course:', error); 
                    setProblemMessage(t('error_loading_course'));
                }
            })();
        }
    }, [open, courseId, setValue, t, state.userName]);

    const handleCroppedImage = (croppedImage: string) => {
        const cleanCroppedImage = croppedImage.replace(/^data:image\/[^;]+;base64,/, '');
        setCroppedImage(`data:image/png;base64,${cleanCroppedImage}`);
        setImagePreview(`data:image/png;base64,${cleanCroppedImage}`);
        setIsCropModalOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const imageURL = reader.result?.toString() || "";
            setImagePreview(imageURL);
            setIsCropModalOpen(true);
        };
        reader.readAsDataURL(file);
        setFileName(file.name);
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleSelectClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    const onSubmit = async (data: any) => {
        const cleanLogo = croppedImage ? croppedImage.replace(/^data:image\/[^;]+;base64,/, '') : '';
        const courseData = {
            id: courseId,
            teacherId: state.userName?.toString() ?? '',
            name: data.name,
            description: data.description,
            logo: cleanLogo || imagePreview?.replace(/^data:image\/[^;]+;base64,/, '') || '',
            isEnabled: true,
        };

        try {
            await courseApi.updateCourse(courseData);

            setProblemMessage(t('course_updated_successfully'));
            reset();
            setOpen(false);

            await fetchCourses(true);

            if (onCourseUpdated) onCourseUpdated();
        } catch (error: any) {
            setProblemMessage(t('error_updating_course'));
            console.error("Update error:", error.response?.data || error.message);
        }
    };




    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`update-course-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                <h2 className={`modal-header ${theme}-text`}>{t('course_update_Title')}</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <div className="form-columns">
                        <div className="left-column">
                            <div className="form-group">
                                <label>{t('course_name')}</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: t('course_error_name_required') }}
                                    render={({ field }) => (
                                        <input type="text" className={`${theme}-input`} {...field} />
                                    )}
                                />
                                {errors.name && <p className="modal-error">{errors.name.message}</p>}
                            </div>

                            <div className="form-group">
                                <label>{t('course_description')}</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{ required: t('course_error_description_required') }}
                                    render={({ field }) => (
                                        <textarea className={`${theme}-input`} {...field} />
                                    )}
                                />
                                {errors.description && <p className="modal-error">{errors.description.message}</p>}
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="form-group user-image">
                                <img
                                    src={imagePreview || userPlaceholder}
                                    alt="Course Logo"
                                    className="uploaded-image"
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('course_logo')}</label>
                                <div className="image-field">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <input
                                        type="text"
                                        value={fileName}
                                        readOnly
                                        className="file-name-input"
                                    />
                                    <button type="button" className="select-button" onClick={handleSelectClick}>
                                        {t('select')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {problemMessage && <p className="modal-error">{problemMessage}</p>}

                    <div className="button-container">
                        <button type="submit" className={`submit-button ${theme}-button`}>
                            {t('update_course')}
                        </button>
                    </div>
                </form>

                {isCropModalOpen && (
                    <ImageCropModal
                        open={isCropModalOpen}
                        onClose={() => setIsCropModalOpen(false)}
                        onCropComplete={handleCroppedImage}
                        imageSrc={imagePreview!}
                        fileName={fileName}
                    />
                )}
            </div>
        </div>
    );
};

export default UpdateCourseModal;
