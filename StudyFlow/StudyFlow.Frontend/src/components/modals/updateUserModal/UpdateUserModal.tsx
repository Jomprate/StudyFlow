import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './updateUserModal.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../ThemeContext';
import { updateUser, getCountriesWithLanguage, getuserbyid } from '../../../services/api'; // Importar getuserbyid
import { FaLock, FaLockOpen } from 'react-icons/fa';
import userPlaceholder from '../../../assets/user_p.svg';
import ImageCropModal from '../imageCropModal/ImageCropModal';
import UserCreatedModal from '../userCreatedModal/UserCreatedModal';
import { useAuth } from "../../../contexts/AuthContext";

interface Country {
    id: number;
    name: string;
    isoCode: string;
}

interface AuthModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string; // Añadimos userId como propiedad
}

const UpdateUserModal: React.FC<AuthModalProps> = ({ open, setOpen, userId }) => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const { control, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
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

    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [problemMessage, setProblemMessage] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const password = watch('password');
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const { state } = useAuth();

    const fetchCountries = async () => {
        try {
            const countriesList = await getCountriesWithLanguage();
            const sortedCountries = countriesList.map((country, index) => ({
                id: index + 1,  // Temp Id for TS
                name: country.name,
                isoCode: country.isoCode
            })).sort((a, b) => a.name.localeCompare(b.name));

            setCountries(sortedCountries);
        } catch (error) {
            setProblemMessage('Error al obtener los países');
        }
    };

    useEffect(() => {
        if (open) {
            const fetchUserData = async () => {
                try {
                    const response = await getuserbyid(userId); // Llamada a la API
                    const userData = response.data; // Accede a los datos dentro de 'data'

                    console.log("Datos del usuario:", userData); // Verifica que `profileId` y `userType` estén presentes

                    // Utiliza reset para cargar los datos en el formulario
                    reset({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                        phoneNumber: userData.phoneNumber || '',
                        countryId: userData.country ? userData.country.toString() : '',
                        profileId: userData.profileId || '', // Asegúrate de que se configure correctamente
                        image: userData.profilePicture || null,
                    });

                    // Añade el prefijo MIME adecuado a la imagen si está en Base64
                    if (userData.profilePicture) {
                        setImagePreview(`data:image/png;base64,${userData.profilePicture}`);
                    } else {
                        setImagePreview(null);
                    }
                } catch (error) {
                    setProblemMessage('Error al cargar los datos del usuario');
                }
            };

            fetchUserData();
        }
    }, [open, userId, reset, setImagePreview]);

    useEffect(() => {
        fetchCountries();

        i18n.on('languageChanged', fetchCountries);

        return () => {
            i18n.off('languageChanged', fetchCountries);
        };
    }, [i18n, setValue]);

    useEffect(() => {
        if (open) {
            fetchCountries();
        }
    }, [open, setValue]);

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^0-9+]/g, '').slice(0, 16);
        e.target.value = filteredValue;
    };

    const [isUserCreatedModalOpen, setIsUserCreatedModalOpen] = useState(false);

    const onSubmit = async (data: any) => {
        if (data.password !== data.repeatPassword) {
            console.error('Las contraseñas no coinciden');
            return;
        }

        const { userName } = state;

        // Usa la imagen recortada limpia sin el prefijo "Modal"
        const cleanProfilePicture = (croppedImage || imagePreview || '').replace(/^Modal/, '');

        console.log("Imagen en Base64 enviada al backend (sin 'Modal'):", cleanProfilePicture);

        const finalData = {
            id: userName,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber || null,
            countryId: Number(data.countryId),
            profilePicture: cleanProfilePicture,
            profileId: parseInt(data.profileId || '2')
        };

        try {
            await updateUser(finalData);
            reset();
            setImagePreview(null);
            setCroppedImage(null);
            setFileName('');
            setOpen(false);
        } catch (error: any) {
            console.error('Ocurrió un error inesperado:', error);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    //const handleCroppedImage = (croppedImage: string) => {
    //    setCroppedImage(croppedImage);
    //    console.log("cropped image in update User Modal" + croppedImage);
    //    setIsCropModalOpen(false);
    //};

    const handleCroppedImage = (croppedImage: string) => {
        // Remueve "Modal" al inicio de la cadena si está presente y actualiza la vista previa con la imagen recortada
        const cleanCroppedImage = croppedImage.replace(/^Modal/, '');
        setCroppedImage(cleanCroppedImage);
        setImagePreview(`data:image/png;base64,${cleanCroppedImage}`); // Actualiza la vista previa con la imagen recortada
        console.log("Imagen recortada recibida en UpdateUserModal (sin 'Modal'):", cleanCroppedImage);
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
                                            readOnly // Aquí se añade el atributo readOnly
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
                                <label>{t('global_country')}</label>
                                <Controller
                                    name="countryId"
                                    control={control}
                                    rules={{ required: t('Country is required') }}
                                    render={({ field }) => (
                                        <select
                                            className={`${theme}-input`}
                                            value={field.value ? countries.find(country => country.id === Number(field.value))?.isoCode : ''}
                                            onChange={(e) => {
                                                const selectedIso = e.target.value;

                                                const selectedCountry = countries.find(country => country.isoCode === selectedIso);

                                                if (selectedCountry) {
                                                    setValue('countryId', String(selectedCountry.id));
                                                    console.log("País seleccionado:", selectedCountry);
                                                    console.log("ID del país seleccionado:", selectedCountry.id);
                                                }
                                            }}
                                        >
                                            <option value="">{t('auth_selectCountry')}</option>
                                            {countries.length > 0 ? (
                                                countries.map((country) => (
                                                    <option key={country.isoCode} value={country.isoCode}>
                                                        {country.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>{t('auth_loadingCountries')}</option>
                                            )}
                                        </select>
                                    )}
                                />
                                {errors.countryId && <p className="update-user-modal-error">{errors.countryId.message}</p>}
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="form-group user-image">
                                {/* Mostrar la imagen seleccionada o la imagen por defecto (placeholder) */}
                                <img
                                    src={imagePreview || userPlaceholder}  // Si existe imagePreview, se muestra; si no, el placeholder
                                    alt="User"
                                    className="user-placeholder"
                                    style={{ objectFit: 'cover', width: '205px', height: '205px' }}
                                />
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('global_image')}</label>

                                <div className="image-field">
                                    {/* Input de archivo, solo permite imágenes PNG y JPEG */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}  // Se oculta el input de archivo
                                    />

                                    <input
                                        type="text"
                                        value={fileName}  // Mostrar el nombre del archivo seleccionado
                                        readOnly
                                        className="file-name-input"
                                        placeholder={t('global_noFileSelected')}  // Placeholder si no hay archivo seleccionado
                                    />

                                    {/* Botón para abrir el explorador de archivos */}
                                    <button type="button" className="select-button" onClick={handleSelectClick}>
                                        {t('Seleccionar')}
                                    </button>
                                </div>
                            </div>

                            <div className={`form-group ${theme}-text`}>
                                <label>{t('auth_userType')}</label>
                                <Controller
                                    name="profileId"
                                    control={control}
                                    rules={{ required: t('User type is required') }}
                                    render={({ field }) => (
                                        <input
                                            type="text"
                                            className={`${theme}-input`}
                                            placeholder={t('Enter user type')}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.profileId && <p className="update-user-modal-error">{errors.profileId.message}</p>}
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

export default UpdateUserModal;