import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './authModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { userApi } from '../../../services/api';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import userPlaceholder from '../../../assets/user_p.svg';
import ImageCropModal from '../imageCropModal/ImageCropModal';
import UserCreatedModal from '../userCreatedModal/UserCreatedModal';
import { useTranslatedCountries } from '../../../helpers/hooks/useTranslatedCountries';

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
            countryId: '',
            profileId: '',
            image: ''
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

    useEffect(() => {
        if (open) {
            reset(); // Limpiar el formulario al abrir AuthModal
        }
    }, [open, reset]);

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^0-9+]/g, '').slice(0, 16);
        e.target.value = filteredValue;
    };

    const [isUserCreatedModalOpen, setIsUserCreatedModalOpen] = useState(false);

    const validatePasswords = (password: string, repeatPassword: string): string | null => {
        if (password !== repeatPassword) return 'Las contrase�as no coinciden';
        return null;
    };

    const getValidProfileId = (profileId: string): number => {
        return profileId && !isNaN(Number(profileId)) ? Number(profileId) : 0;
    };

    const cleanBase64Image = (image: string | null): string => {
        return (image || '').replace(/^data:image\/[a-z]+;base64,/, '');
    };

    const handleApiError = (error: any): string => {
        if (error.response && error.response.data) {
            return typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        }
        return error.message || 'Ocurri� un error inesperado';
    };

    const prepareFinalData = (data: any, croppedImage: string | null, imagePreview: string | null) => {
        return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber || null,
            countryId: data.countryId ? Number(data.countryId) : 1,
            profilePicture: cleanBase64Image(croppedImage || imagePreview),
            profileId: getValidProfileId(data.profileId),
        };
    };

    const handleSuccess = () => {
        setProblemMessage('Usuario creado con �xito');
        reset();
        setImagePreview(null);
        setCroppedImage(null);
        setFileName('');
        setOpen(false);
        setIsUserCreatedModalOpen(true);
    };

    const onSubmit = async (data: any) => {
        const passwordError = validatePasswords(data.password, data.repeatPassword);
        if (passwordError) {
            setProblemMessage(passwordError);
            return;
        }

        const finalData = prepareFinalData(data, croppedImage, imagePreview);

        console.log("Datos enviados al backend:", finalData);

        try {
            await userApi.createUser(finalData);
            handleSuccess();
        } catch (error: any) {
            setProblemMessage(handleApiError(error));
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleCroppedImage = (croppedImage: string) => {
        console.log("Imagen recortada recibida (con prefijo MIME):", croppedImage);

        const cleanCroppedImage = croppedImage.replace(/^data:image\/[a-z]+;base64,/, '');

        setCroppedImage(`data:image/png;base64,${cleanCroppedImage}`);
        setImagePreview(`data:image/png;base64,${cleanCroppedImage}`);
        console.log("Imagen previsualizada (sin prefijo MIME para la vista):", cleanCroppedImage);
        setIsCropModalOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageURL = reader.result?.toString() || "";
            setImagePreview(imageURL);
            setIsCropModalOpen(true);
        });
        reader.readAsDataURL(file);
        setFileName(file.name);
    };

    <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
    />

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
            //setOpen(false);
        }
    };

    return (
        <div className={`modal-overlay ${open ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={`auth-modal ${theme}`}>
                <button className="close-button" onClick={() => setOpen(false)}>
                    &times;
                </button>

                <h2 className={`auth-modal-header ${theme}-text`}>{t('auth_userCreation')}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container" autoComplete="on">
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
                                    {errors.firstName && <p className="auth-modal-error">{errors.firstName.message}</p>}
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
                                    {errors.lastName && <p className="auth-modal-error">{errors.lastName.message}</p>}
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
                                        />
                                    )}
                                />
                                {errors.email && <p className="auth-modal-error">{errors.email.message}</p>}
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('auth_phoneNumber')}</label>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{
                                        required: t('auth_error_phoneNumberRequired'),
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

                                {errors.phoneNumber && <p className="auth-modal-error">{errors.phoneNumber.message}</p>}
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
                                {errors.password && <p className="auth-modal-error">{errors.password.message}</p>}
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
                                {errors.repeatPassword && <p className="auth-modal-error">{errors.repeatPassword.message}</p>}
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('global_country')}</label>
                                <Controller
                                    name="countryId"
                                    control={control}
                                    rules={{ required: t('auth_error_countryIsRequired') }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className={`${theme}-input`}
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
                                {errors.countryId && <p className="auth-modal-error">{errors.countryId.message}</p>}
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="form-group user-image">
                                {croppedImage ? (
                                    <img
                                        src={croppedImage}
                                        alt="User"
                                        className="user-placeholder uploaded-image"
                                        style={{ objectFit: 'cover', width: '205px', height: '205px' }}
                                    />
                                ) : (
                                    <img
                                        src={userPlaceholder}
                                        alt="User Placeholder"
                                        className="user-placeholder"
                                        style={{ objectFit: 'cover', width: '205px', height: '205px' }}
                                    />
                                )}
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('global_image')}</label>

                                <div className="image-field">
                                    {/* Input de archivo, solo permite im�genes PNG y JPEG */}
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

                                    {/* Bot�n para abrir el explorador de archivos */}
                                    <button type="button" className="select-button" onClick={handleSelectClick}>
                                        {t('select')}
                                    </button>
                                </div>
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('auth_userType')}</label>
                                <Controller
                                    name="profileId"
                                    control={control}
                                    rules={{ required: t('auth_error_userTypeRequired') }}
                                    render={({ field }) => (
                                        <select
                                            className={`${theme}-input`}
                                            {...field}
                                        >
                                            <option value="" disabled>{t('auth_selectUserType')}</option>
                                            <option value="1">{t('global_teacher')}</option>
                                            <option value="2">{t('global_student')}</option>
                                        </select>
                                    )}
                                />
                                {errors.profileId && <p className="auth-modal-error">{errors.profileId.message}</p>}
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
                            {t('auth_createUser')}
                        </button>
                    </div>
                </form>

                {isCropModalOpen && (
                    <ImageCropModal
                        open={isCropModalOpen}
                        onClose={() => setIsCropModalOpen(false)}
                        onCropComplete={handleCroppedImage}
                        imageSrc={imagePreview!}
                        fileName={''} />
                )}

                {/* Modal para indicar que el usuario fue creado */}
                <UserCreatedModal
                    open={isUserCreatedModalOpen}
                    setOpen={setIsUserCreatedModalOpen}
                    onBackToLogin={() => {
                        setIsUserCreatedModalOpen(false);
                        setOpen(false); // Cerrar ambos modales
                    }}
                />

            </div>

        </div>
    );
};

export default AuthModal;