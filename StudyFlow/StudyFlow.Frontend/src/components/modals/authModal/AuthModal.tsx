import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './authModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { createUser } from '../../../services/api'; // Importa la función de creación de usuario
import { FaLock, FaLockOpen } from 'react-icons/fa';
import userPlaceholder from '../../../assets/user_p.svg';

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            repeatPassword: '',
            countryId: '', // Cambiado a countryId para alinearlo con el DTO
            userType: '',
            image: ''
        }
    });

    const [problemMessage, setProblemMessage] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const password = watch('password');
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^0-9+]/g, '').slice(0, 16);
        e.target.value = filteredValue;
    };

    const onSubmit = async (data: any) => {
        if (data.password !== data.repeatPassword) {
            setProblemMessage('Passwords do not match');
            return;
        }

        const { repeatPassword, ...finalData } = data;
        finalData.profilePicture = imagePreview; // Añadir la imagen, si existe

        try {
            await createUser(finalData); // Llamada a la API
            setProblemMessage('User created successfully');
            reset();
            setImagePreview(null);
            setFileName('');
            setOpen(false);
        } catch (error: any) {
            setProblemMessage(error.message || 'An unexpected error occurred');
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`auth-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>
                    &times;
                </button>

                <h2 className="auth-modal-header">{t('auth_userCreation')}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <div className="form-columns">
                        <div className="left-column">
                            <div className="first-last-name-group">
                                <div className="form-group">
                                    <label>{t('global_firstName')}</label>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        rules={{ required: t('global_error_firstNameIsRequired') }}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                placeholder={t('auth_firstNamePlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.firstName && <p className="auth-modal-error">{errors.firstName.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>{t('global_lastName')}</label>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        rules={{ required: t('global_error_lastNameIsRequired') }}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                placeholder={t('auth_lastNamePlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.lastName && <p className="auth-modal-error">{errors.lastName.message}</p>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>{t('global_Email')}</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: t('global_error_emailRequired'),
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: t('global_error_invalidEmail')
                                        }
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="email"
                                            {...field}
                                            placeholder={t('global_emailPlaceholder')}
                                        />
                                    )}
                                />
                                {errors.email && <p className="auth-modal-error">{errors.email.message}</p>}
                            </div>

                            <div className="form-group">
                                <label>{t('auth_phoneNumber')}</label>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: phoneRegex,
                                            message: t('auth_invalidPhoneNumber')
                                        }
                                    }}
                                    render={({ field }) => (
                                        <input
                                            type="tel"
                                            placeholder={t('auth_phonePlaceholder')}
                                            {...field}
                                            onInput={handlePhoneInput}
                                        />
                                    )}
                                />
                                {errors.phoneNumber && <p className="auth-modal-error">{errors.phoneNumber.message}</p>}
                            </div>

                            <div className="form-group">
                                <label>{t('global_password')}</label>
                                <div className="password-container">
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: t('global_error_passwordRequired') }}
                                        render={({ field }) => (
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder={t('auth_passwordPlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaLockOpen /> : <FaLock />}
                                    </span>
                                </div>
                                {errors.password && <p className="auth-modal-error">{errors.password.message}</p>}
                            </div>

                            <div className="form-group">
                                <label>{t('auth_passwordRepeat')}</label>
                                <div className="password-container">
                                    <Controller
                                        name="repeatPassword"
                                        control={control}
                                        rules={{
                                            required: t('auth_error_repeatPasswordRequiered'),
                                            validate: value => value === password || t('global_error_passwordMismatch')
                                        }}
                                        render={({ field }) => (
                                            <input
                                                type={showRepeatPassword ? "text" : "password"}
                                                placeholder={t('auth_passwordRepeatPlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    <span className="toggle-password" onClick={toggleRepeatPasswordVisibility}>
                                        {showRepeatPassword ? <FaLockOpen /> : <FaLock />}
                                    </span>
                                </div>
                                {errors.repeatPassword && <p className="auth-modal-error">{errors.repeatPassword.message}</p>}
                            </div>

                            <div className="form-group">
                                <label>{t('global_country')}</label>
                                <Controller
                                    name="countryId"
                                    control={control}
                                    rules={{ required: t('Country is required') }}
                                    render={({ field }) => (
                                        <select {...field}>
                                            <option value="">--Select Country--</option>
                                            <option value={1}>United States</option>
                                            <option value={2}>Canada</option>
                                        </select>
                                    )}
                                />
                                {errors.countryId && <p className="auth-modal-error">{errors.countryId.message}</p>}
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="form-group user-image">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="User" className="user-placeholder uploaded-image" />
                                ) : (
                                    <img src={userPlaceholder} alt="User Placeholder" className="user-placeholder" />
                                )}
                            </div>

                            <div className="form-group">
                                <label>{t('global_image')}</label>
                                <div className="image-field">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <input
                                        type="text"
                                        value={fileName}
                                        readOnly
                                        className="file-name-input"
                                        placeholder={t('global_noFileSelected')}
                                    />
                                    <button type="button" className="select-button" onClick={handleSelectClick}>
                                        {t('Seleccionar')}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group user-type">
                                <label>{t('auth_userType')}</label>
                                <Controller
                                    name="userType"
                                    control={control}
                                    rules={{ required: t('User type is required') }}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            placeholder={t('Enter user type')}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.userType && <p className="auth-modal-error">{errors.userType.message}</p>}
                            </div>

                            {problemMessage && (
                                <div className="form-group">
                                    <label>{t('auth_generalProblems')}</label>
                                    <textarea
                                        value={problemMessage}
                                        readOnly
                                        className="problem-message-textarea"
                                        placeholder={t('No hay problemas.')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button">{t('auth_createUser')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;