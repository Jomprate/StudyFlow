import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './updateUserModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { userApi } from '../../../services/api';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import userPlaceholder from '../../../assets/user_p.svg';
import ImageCropModal from '../imageCropModal/ImageCropModal';
import UserCreatedModal from '../userCreatedModal/UserCreatedModal';
import { useAuth } from "../../../contexts/AuthContext";
import { cleanBase64, readFileAsBase64 } from '../../../utils/images/imageUtils';
import { useTranslatedCountries } from '../../../helpers/hooks/useTranslatedCountries';

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
    targetUserId?: string;
}

const UpdateUserModal: React.FC<AuthModalProps> = ({ open, setOpen, targetUserId }) => {
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
            countryId: '',
            profileId: '',
            image: '',
        }
    });

    const { countries, loading, error } = useTranslatedCountries();

    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [problemMessage, setProblemMessage] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    /*const [countries, setCountries] = useState<Country[]>([]);*/
    const password = watch('password');
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const { state } = useAuth();
    const [isEditable, setIsEditable] = useState(false);

    const isSelfUpdate = !targetUserId;

    const effectiveUserId = targetUserId || state.userName;

    const userType = state.role === 'Teacher' ? 'Teacher' :
        state.role === 'Student' ? 'Student' :
            '';

    useEffect(() => {
        if (open && effectiveUserId != null) {
            const fetchUserData = async () => {
                try {
                    console.log("Fetching user data for ID:", effectiveUserId);
                    const response = await userApi.getuserbyid(effectiveUserId);
                    const userData = response.data;

                    reset({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                        phoneNumber: userData.phoneNumber || '',
                        countryId: userData.country ? userData.country.toString() : '',
                        profileId: userData.profileId || '',
                        image: userData.profilePicture || null,
                    });
                    setProblemMessage('');

                    if (userData.profilePicture) {
                        setImagePreview(`data:image/png;base64,${userData.profilePicture}`);
                    } else {
                        setImagePreview(null);
                    }

                    switch (userData.profileId) {
                        case 1: (t('global_teacher')); break;
                        case 2: (t('global_student')); break;
                        default: (t('global_unknown')); break;
                    }
                } catch (error) {
                    console.error("Error loading user data:", error);
                    setProblemMessage('Error al cargar los datos del usuario');
                }
            };
            setIsEditable(false);

            fetchUserData();
        }
    }, [open, effectiveUserId, reset, setImagePreview, t]);

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^0-9+]/g, '').slice(0, 16);
        e.target.value = filteredValue;
    };

    const [isUserCreatedModalOpen, setIsUserCreatedModalOpen] = useState(false);

    const onSubmit = async (data: any) => {
        if (data.password !== data.repeatPassword) {
            setProblemMessage('Las contraseñas no coinciden');
            return;
        }

        const validProfileId = isSelfUpdate && state.role === 'Admin' ? 0 : userType === 'Teacher' ? 1 : userType === 'Student' ? 2 : 0;

        const { firstName, lastName, email, password, phoneNumber, countryId } = data;

        const cleanProfilePicture = cleanBase64(croppedImage || imagePreview || '');

        const finalData = {
            id: state.userName ?? "",
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            countryId: countryId ? Number(countryId) : undefined,
            profilePicture: cleanProfilePicture,
            profileId: validProfileId,
        };

        try {
            await userApi.updateUser(finalData);
            setProblemMessage('Usuario actualizado con éxito');
            reset();
            setImagePreview(null);
            setCroppedImage(null);
            setFileName('');
            setOpen(false);
        } catch (error: any) {
            let errorMessage = 'Ocurrió un error inesperado';
            if (error.response && error.response.data) {
                errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data);
            } else if (error.message) {
                errorMessage = error.message;
            }
            setProblemMessage(errorMessage);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleCroppedImage = (croppedImage: string) => {
        const cleanCroppedImage = cleanBase64(croppedImage);
        setCroppedImage(cleanCroppedImage);
        setImagePreview(`data:image/png;base64,${cleanCroppedImage}`);
        setIsCropModalOpen(false);
    };

    const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setProblemMessage('Tipo de archivo no permitido. Solo PNG y JPEG.');
            return;
        }

        try {
            const base64Image = await readFileAsBase64(file);
            setImagePreview(base64Image);
            setIsCropModalOpen(true);
            setFileName(file.name);
        } catch (error) {
            setProblemMessage('Error al leer la imagen');
            console.error('File reading error:', error);
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
            /*setOpen(false);*/
        }
    };

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`update-user-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>
                    &times;
                </button>

                <h2 className={`update-user-modal-header ${theme}-text`}>{t('auth_userCreation')}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <div className="form-columns">
                        <div className="left-column">
                            <div className="first-last-name-group">
                                <div className={`form-group ${theme}-text`}>
                                    <label>{t('global_firstName')}</label>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        rules={{ required: t('global_error_firstNameIsRequired') }}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                className={`${theme}-input`}
                                                placeholder={t('auth_firstNamePlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.firstName && <p className="update-user-modal-error">{errors.firstName.message}</p>}
                                </div>

                                <div className={`form-group ${theme}-text`}>
                                    <label>{t('global_lastName')}</label>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        rules={{ required: t('global_error_lastNameIsRequired') }}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                className={`${theme}-input`}
                                                placeholder={t('auth_lastNamePlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.lastName && <p className="update-user-modal-error">{errors.lastName.message}</p>}
                                </div>
                            </div>

                            <div className={`form-group ${theme}-text`}>
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
                                            className={`${theme}-input`}
                                            {...field}
                                            placeholder={t('global_emailPlaceholder')}
                                            readOnly
                                        />
                                    )}
                                />
                                {errors.email && <p className="update-user-modal-error">{errors.email.message}</p>}
                            </div>

                            <div className={`form-group ${theme}-text`}>
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
                                            className={`${theme}-input`}
                                            placeholder={t('auth_phonePlaceholder')}
                                            {...field}
                                            onInput={handlePhoneInput}
                                        />
                                    )}
                                />
                                {errors.phoneNumber && <p className="update-user-modal-error">{errors.phoneNumber.message}</p>}
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('global_password')}</label>
                                <div className="password-container">
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: t('global_error_passwordRequired') }}
                                        render={({ field }) => (
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`${theme}-input`}
                                                placeholder={t('auth_passwordPlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaLockOpen /> : <FaLock />}
                                    </span>
                                </div>
                                {errors.password && <p className="update-user-modal-error">{errors.password.message}</p>}
                            </div>

                            <div className={`form-group ${theme}-text`}>
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
                                                className={`${theme}-input`}
                                                placeholder={t('auth_passwordRepeatPlaceholder')}
                                                {...field}
                                            />
                                        )}
                                    />
                                    <span className="toggle-password" onClick={toggleRepeatPasswordVisibility}>
                                        {showRepeatPassword ? <FaLockOpen /> : <FaLock />}
                                    </span>
                                </div>
                                {errors.repeatPassword && <p className="update-user-modal-error">{errors.repeatPassword.message}</p>}
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <div className="form-group">
                                    <label>{t('global_country')}</label>
                                    <Controller
                                        name="countryId"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="country-dropdown"
                                                disabled={loading}
                                            >
                                                <option value="">{t('auth_selectCountry')}</option>
                                                {countries.map((country) => (
                                                    <option key={country.id} value={country.id}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                    {loading && <p>{t('auth_loadingCountries')}</p>}
                                    {error && <p>{t('error_loadingCountries')}</p>}
                                    {errors.countryId && <span>{t('Country is required')}</span>}
                                </div>
                                {errors.countryId && <p className="update-user-modal-error">{errors.countryId.message}</p>}
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="form-group user-image">
                                {/*<img*/}
                                {/*    src={imagePreview || userPlaceholder}*/}
                                {/*    alt="User"*/}
                                {/*    className="user-placeholder"*/}
                                {/*    style={{ objectFit: 'cover', width: '205px', height: '205px' }}*/}
                                {/*/>*/}
                                <img
                                    src={imagePreview || userPlaceholder}
                                    alt="User"
                                    className="user-placeholder"
                                    style={{
                                        objectFit: 'cover',
                                        width: '205px',
                                        height: '205px',
                                        border: imagePreview ? '2px solid green' : '2px dashed gray',
                                    }}
                                />

                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('global_image')}</label>
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
                                        placeholder={t('global_noFileSelected')}
                                    />
                                    <button type="button" className="select-button" onClick={handleSelectClick}>
                                        {t('Seleccionar')}
                                    </button>
                                </div>
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('auth_userType')}</label>
                                <select
                                    className={`${theme}-input disabled-dropdown`}
                                    defaultValue={userType}
                                    disabled={isEditable}
                                >
                                    <option value="Teacher">{t('global_teacher')}</option>
                                    <option value="Student">{t('global_student')}</option>
                                </select>
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
                        <button type="submit" className={`submit-button ${theme}-button`}>
                            {t('update_user')}
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

                <UserCreatedModal
                    open={isUserCreatedModalOpen}
                    setOpen={setIsUserCreatedModalOpen}
                    onBackToLogin={() => {
                        setIsUserCreatedModalOpen(false);
                        setOpen(false);
                    }}
                />

            </div>

        </div>
    );
};

export default UpdateUserModal;