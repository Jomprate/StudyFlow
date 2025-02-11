/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './createCourseModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { courseApi } from '../../../services/api';
import userPlaceholder from '../../../assets/user_p.svg';
import ImageCropModal from '../imageCropModal/ImageCropModal';
import { useAuth } from '../../../contexts/AuthContext';
import { useCourses } from '../../../contexts/CoursesContext';

interface CreateCourseModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCourseCreated?: () => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ open, setOpen, onCourseCreated }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { state } = useAuth();
    const { fetchCourses } = useCourses();

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
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

    const handleCroppedImage = (croppedImage: string) => {
        const cleanCroppedImage = croppedImage.replace(/^data:image\/[a-z]+;base64,/, '');
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
        const cleanLogo = croppedImage ? croppedImage.replace(/^data:image\/[a-z]+;base64,/, '') : '';
        const courseData = {
            teacherId: state.userName?.toString() ?? '',
            name: data.name,
            description: data.description,
            logo: cleanLogo || '',
            isEnabled: true,
            /*isEnabled: data.isEnabled*/
        };

        try {
            await courseApi.createCourse(courseData);

            setProblemMessage(t('course_created_successfully'));

            reset();
            setOpen(false);

            await fetchCourses();

            if (onCourseCreated) onCourseCreated();
        } catch (error: any) {
            setProblemMessage(t('error_creating_course'));
        }
    };

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`create-course-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>&times;</button>
                <h2 className={`modal-header ${theme}-text`}>{t('course_Create_Title')}</h2>

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

                            {/*<div className="form-group toggle-group">*/}
                            {/*    <label className="toggle-label-text">{t('is_enabled')}</label>*/}
                            {/*    <Controller*/}
                            {/*        name="isEnabled"*/}
                            {/*        control={control}*/}
                            {/*        render={({ field }) => (*/}
                            {/*            <Toggle*/}
                            {/*                checked={field.value}*/}
                            {/*                onChange={(e) => field.onChange(e.target.checked)}*/}
                            {/*            />*/}
                            {/*        )}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>

                        <div className="right-column">
                            <div className="form-group user-image">
                                {croppedImage ? (
                                    <img
                                        src={croppedImage}
                                        alt="Course Logo"
                                        className="uploaded-image"
                                        style={{
                                            objectFit: 'contain',
                                            maxWidth: '205px',
                                            maxHeight: '205px',
                                            borderRadius: '15px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={userPlaceholder}
                                        alt="Placeholder"
                                        className="user-placeholder"
                                        style={{
                                            objectFit: 'cover',
                                            width: '205px',
                                            height: '205px',
                                        }}
                                    />
                                )}
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
                            {t('create_course')}
                        </button>
                    </div>
                </form>

                {isCropModalOpen && (
                    <ImageCropModal
                        open={isCropModalOpen}
                        onClose={() => setIsCropModalOpen(false)}
                        onCropComplete={handleCroppedImage}
                        imageSrc={imagePreview!}
                        fileName={''}
                    />
                )}
            </div>
        </div>
    );
};

export default CreateCourseModal;