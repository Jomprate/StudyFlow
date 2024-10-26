import axios from 'axios';
import i18n from '../i18n';

const api = axios.create({
    baseURL: 'https://localhost:7033/api',
    headers: {
        'content-type': 'application/json',
    },
});

export const checkBackendStatus = async (callback: (isReady: boolean) => void) => {
    try {
        console.log("Checking backend status...");
        const response = await api.get('/Status');
        console.log("Backend response:", response.data);

        if (response.data.status === 'ready') {
            console.log("Backend is ready, setting backendReady to true");
            callback(true); // Backend is ready
        } else {
            console.warn("Backend is not ready. Retrying in 2 seconds...");
            setTimeout(() => checkBackendStatus(callback), 2000); // Retry after 2 seconds
        }
    } catch (error) {
        console.error("Error while checking backend status:", error);
        setTimeout(() => checkBackendStatus(callback), 2000); // Retry after 2 seconds on error
    }
};

interface userdata {
    data: any;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password: string;
    countryid: string;
    usertype: string;
    image?: string;
}

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configurar el encabezado Authorization
    } else {
        delete api.defaults.headers.common['Authorization']; // Eliminar el encabezado si no hay token
    }
};

// LoginRequestDTO: DTO para enviar los datos al servidor

// Función para hacer login
export const loginUser = async (loginDTO: { email: string; password: string }): Promise<string> => {
    try {
        // Realizamos la petición al endpoint de login
        const response = await api.post('/Auth/Login', loginDTO, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Verificamos si la respuesta tiene el token
        const token = response.data;  // Aquí asumimos que el token es el único dato devuelto en response.data

        if (!token || typeof token !== 'string') {
            throw new Error('Invalid login response: token is missing or not a string');
        }

        // Guardar el token en localStorage
        localStorage.setItem('token', token);

        // Configurar el token en los encabezados de axios
        setAuthToken(token);

        // Retornamos el token
        return token;
    } catch (error: any) {
        throw new Error(error.response?.data || error.message || 'An unexpected error occurred during login');
    }
};

// Función para hacer logout
export const logoutUser = async (): Promise<void> => {
    try {
        // Obtener el token de localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found, unable to log out.');
        }

        // Hacer la solicitud de logout al API
        const response = await api.post('/Auth/LogOut', {}, {
            headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
            },
        });

        // Si la respuesta es exitosa, limpiar el token
        if (response.status === 200) {
            localStorage.removeItem('token'); // Limpiar el token de localStorage
            setAuthToken(null); // Remover el token de los encabezados de axios
            console.log('Logout successful.');
        } else {
            throw new Error('Logout failed.');
        }
    } catch (error: any) {
        console.error('Error during logout:', error.message || error);
        throw new Error(error.response?.data || 'An unexpected error occurred during logout.');
    }
};

export const createUser = async (userDTO: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    countryId: number;
    profilePicture?: string;
    profileId: number;
}): Promise<void> => {
    try {
        const response = await api.post('/user/createuser', userDTO);
        return response.data;
    } catch (error: any) {
        // Captura y formatea adecuadamente el error
        let errorMessage = 'An unexpected error occurred';

        if (error.response && error.response.data) {
            // Si `error.response.data` es un objeto, lo convertimos en string
            errorMessage = typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        } else if (error.message) {
            // Si hay un `error.message`, usamos eso
            errorMessage = error.message;
        }

        console.error(errorMessage); // Para depuración
        throw new Error(errorMessage); // Lanzamos el error para que sea capturado por `onSubmit`
    }
};

export const updateUser = async (userDTO: {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    countryId?: number;
    profilePicture?: string;
    profileId?: number;
}): Promise<void> => {
    try {
        console.log("the updated dto is :" + userDTO); // Imprimir el objeto en co
        setAuthToken(localStorage.getItem('token') || null); // Cargar el token de localStorage en el encabezado de aut
        const response = await api.put('/user/updateuser/', userDTO);
        return response.data;
    } catch (error: any) {
        // Captura y formatea adecuadamente el error
        let errorMessage = 'An unexpected error occurred';

        if (error.response && error.response.data) {
            // Si `error.response.data` es un objeto, lo convertimos en string
            errorMessage = typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        } else if (error.message) {
            // Si hay un `error.message`, usamos eso
            errorMessage = error.message;
        }

        console.error(errorMessage); // Para depuración
        throw new Error(errorMessage); // Lanzamos el error para que sea capturado por `onSubmit`
    }
};

export const getallusers = async (): Promise<userdata[]> => {
    try {
        const response = await api.get('/user/getallusers');
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const deleteuser = async (userid: string): Promise<void> => {
    try {
        const response = await api.delete(`/user/deleteuser/${userid}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getuserbyid = async (userid: string): Promise<userdata> => {
    try {
        setAuthToken(localStorage.getItem('token') || null); // Cargar el token de localStorage en el encabezado de au
        const response = await api.get(`/user/getuserbyid?id=${userid}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

// Función para hacer login
export const ResendEmailConfirm = async (email: string): Promise<string> => {
    const emailObj = { Email: email };

    try {
        const response = await api.post('/User/ResendConfirmEmailByEmail', emailObj);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }
        // Retornamos la respuesta como un string
        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

export const RecoveryPassword = async (email: string): Promise<string> => {
    const emailObj = { Email: email };

    try {
        const response = await api.post('/Auth/RecoverPasswordByEmail', emailObj);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }
        // Retornamos la respuesta como un string
        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

export const ResetPassword = async (ResetPasswordRequestDTO: { UserId: string; NewPassword: string; Token: string; }): Promise<string> => {
    try {
        const response = await api.post('/Auth/ResetPasswordAsync', ResetPasswordRequestDTO);

        if (response.status == 400) {
            return JSON.stringify(response.data.data);
        }
        // Retornamos la respuesta como un string
        return JSON.stringify(response.data.data);
    } catch (error: any) {
        const errorMessage = error.response?.data || error.message || 'An unexpected error occurred during email confirmation';
        if (error.status == 500) {
            throw new Error(errorMessage);
        }

        return errorMessage.error.message;
    }
};

// Countries

export const getCountries = async (): Promise<{ id: number; name: string; isoCode: string }[]> => {
    try {
        const response = await api.get('/Country/GetAllCountries/');

        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error(i18n.t('error.invalidDataFormat'));
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getCountriesWithLanguage = async (): Promise<{ isoCode: string; name: string }[]> => {
    try {
        const currentLanguage = i18n.language || 'en';

        const response = await api.get(`/Country/GetAllCountriesWithLanguage/${currentLanguage}/`);

        const countriesArray = Object.keys(response.data).map(isoCode => ({
            isoCode,
            name: response.data[isoCode],
        }));

        return countriesArray;
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

// Announces

export const createAnnounce = async (announceDTO: {
    title: string;
    htmlContent: string;
    userId?: string;
    courseId?: string;
    youTubeVideos?: string[];
    googleDriveLinks?: string[];
    alternateLinks?: string[];
}): Promise<{ id: string }> => {
    try {
        // Valores temporales quemados
        const defaultUserId = "6ec6a992-11de-469b-823e-08dcf1287ffe"; // UserId quemado
        const defaultCourseId = "e4dc593d-ab03-4dfe-a26c-08dcf144334f"; // CourseId quemado

        // Si no se proporcionan userId y courseId, usar los valores quemados
        const userId = announceDTO.userId || defaultUserId;
        const courseId = announceDTO.courseId || defaultCourseId;

        if (!announceDTO) {
            throw new Error(i18n.t('error.announceDataRequired'));
        }

        if (!announceDTO.title.trim()) {
            throw new Error(i18n.t('error.titleCannotBeEmpty'));
        }

        if (!announceDTO.htmlContent.trim()) {
            throw new Error(i18n.t('error.htmlContentCannotBeEmpty'));
        }

        announceDTO.youTubeVideos = announceDTO.youTubeVideos || [];
        announceDTO.googleDriveLinks = announceDTO.googleDriveLinks || [];
        announceDTO.alternateLinks = announceDTO.alternateLinks || [];

        const announceResponse = await api.post('/Announce/CreateAnnounce', {
            title: announceDTO.title,
            htmlContent: announceDTO.htmlContent,
            youTubeVideos: announceDTO.youTubeVideos,
            googleDriveLinks: announceDTO.googleDriveLinks,
            alternateLinks: announceDTO.alternateLinks,
            userId: userId, // Usar el valor quemado si no se proporcionó
            courseId: courseId, // Usar el valor quemado si no se proporcionó
        });

        return announceResponse.data;
    } catch (error: any) {
        // Manejo de errores
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getAnnouncesByCourseId = async (courseId: string): Promise<any[]> => {
    // Course ID quemado temporalmente dentro de la función
    courseId = '3c8825f3-f903-45c9-8dac-0a87a51ef37e'; // Course ID quemado

    try {
        // Asegúrate de incluir el prefijo `/api` en la URL
        const response = await api.get(`/Announce/GetAnnouncesByCourse/${courseId}`);

        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.listResult)) {
                const announcementsArray = response.data.data.listResult.map((announcement: any) => ({
                    id: announcement.id,
                    title: announcement.title,
                    description: announcement.htmlContent, // Mapeamos correctamente el campo
                    userName: announcement.userName,
                    creationDate: announcement.creationDate,
                    youTubeVideos: announcement.youTubeVideos,
                    googleDriveLinks: announcement.googleDriveLinks,
                    alternateLinks: announcement.alternateLinks,
                }));

                return announcementsArray;
            } else {
                throw new Error('Unexpected response format');
            }
        } else {
            throw new Error(`Response is not JSON, received content-type: ${contentType}`);
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

interface PaginatedResponse<T> {
    data: T[];
    totalPages: number;
}

export const getAnnouncesByCourseIdPaginated = async (
    courseId: string,
    page: number,
    recordsNumber: number
): Promise<PaginatedResponse<any>> => {
    courseId = 'e4dc593d-ab03-4dfe-a26c-08dcf144334f'; // Course ID quemado

    try {
        const response = await api.get(`/Announce/GetAnnouncesByCourse/${courseId}?page=${page}&recordsNumber=${recordsNumber}`);

        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json')) {
            if (response.data && response.data.success && response.data.data && Array.isArray(response.data.data.listResult)) {
                const announcementsArray = response.data.data.listResult.map((announcement: any) => ({
                    id: announcement.id,
                    title: announcement.title,
                    description: announcement.htmlContent,
                    userName: announcement.userName,
                    creationDate: announcement.creationDate,
                    youTubeVideos: announcement.youTubeVideos,
                    googleDriveLinks: announcement.googleDriveLinks,
                    alternateLinks: announcement.alternateLinks,
                }));

                return {
                    data: announcementsArray,
                    totalPages: response.data.data.totalPages,
                };
            } else {
                throw new Error('Unexpected response format');
            }
        } else {
            throw new Error(`Response is not JSON, received content-type: ${contentType}`);
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

// Función para confirmar el correo
export const confirmEmail = async (userId: string, token: string): Promise<void> => {
    try {
        const response = await api.post('/user/ConfirmEmail', {
            userId,  // Enviado en el cuerpo
            token,   // Enviado en el cuerpo
        });
        return response.data;
    } catch (error: any) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response && error.response.data) {
            errorMessage = typeof error.response.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response.data);
        } else if (error.message) {
            errorMessage = error.message;
        }

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

//Courses

export const createCourse = async (courseDTO: {
    id?: string;
    teacherId: string;
    name: string;
    description?: string;
    logo?: string;
    isEnabled?: boolean;
}): Promise<void> => {
    try {
        const response = await api.post('/OnBoardingTeacher/CreateCourse', {
            id: courseDTO.id,  // Este campo puede ser opcional
            teacherDTO: {
                id: courseDTO.teacherId,  // El ID del maestro
                fullName: "string"        // Puedes obtener este dato si es necesario
            },
            name: courseDTO.name,
            description: courseDTO.description,
            logo: courseDTO.logo,
            isEnabled: courseDTO.isEnabled ?? true  // Por defecto, true si no está especificado
        });

        console.log('Course created successfully:', response.data);
    } catch (error: any) {
        const errorMessage = error.response
            ? i18n.t('global_error_apiResponse', { message: error.response.data })
            : error.request
                ? i18n.t('global_error_noResponse')
                : i18n.t('global_error_requestSetup', { message: error.message });

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

interface PaginatedCourseResponse<T> {
    data: T[];
    totalPages: number;
    totalRecords: number;
}

//export const getCoursesByTeacherIdPaginated = async (
//    teacherId: string,
//    page: number,
//    recordsNumber: number
//): Promise<PaginatedCourseResponse<any>> => {
//    try {
//        const response = await api.get(`/OnBoardingTeacher/GetCourses`, {
//            params: {
//                teacherId,
//                page,
//                recordsNumber,
//            }
//        });

//        if (response.data && response.data.success && response.data.data) {
//            const coursesArray = response.data.data.PaginationResult.ListResult.map((course: any) => ({
//                id: course.id,
//                name: course.name,
//                description: course.description,
//                teacher: course.teacherName,
//                logo: course.logo,
//                isEnabled: course.isEnabled,
//            }));

//            return {
//                data: coursesArray,
//                totalPages: response.data.data.PaginationResult.TotalPages || 1,
//                totalRecords: response.data.data.PaginationResult.TotalRecords || 0,
//            };
//        } else {
//            throw new Error('Unexpected response format');
//        }
//    } catch (error: any) {
//        const errorMessage = error.response
//            ? i18n.t('global_error_apiResponse', { message: error.response.data })
//            : error.request
//                ? i18n.t('global_error_noResponse')
//                : i18n.t('global_error_requestSetup', { message: error.message });

//        console.error("Error en la respuesta de la API:", errorMessage);
//        throw new Error(errorMessage);
//    }
//};

// Define la interfaz CourseDTO con las propiedades que necesita
// Define la interfaz CourseDTO con las propiedades necesarias
export interface CourseDTO {
    id: string;
    name: string;
    description: string;
    teacher: string;
    logo?: string;
    isEnabled: boolean;
}

export const getCoursesByTeacherIdPaginatedAsync = async (
    teacherId: string,
    page: number,
    recordsNumber: number
): Promise<{ data: CourseDTO[], totalPages: number, totalRecords: number }> => {
    try {
        // Realizar la solicitud GET con los parámetros de paginación
        const response = await api.get(`/OnBoardingTeacher/GetCoursesByTeacherIdPaginated`, {
            params: {
                TeacherId: teacherId,
                'Pagination.Page': page,
                'Pagination.RecordsNumber': recordsNumber
            }
        });

        // Imprimir la respuesta completa para depuración
        console.log("Full response data:", response.data);

        const { value } = response.data;
        if (value && value.data?.listResult) {
            const { listResult, pagination } = value.data;

            // Mapear los cursos a CourseDTO
            const coursesArray: CourseDTO[] = listResult.map((course: any) => ({
                id: course.id,
                name: course.name,
                description: course.description,
                teacher: course.teacherDTO?.fullName || "Unknown",
                logo: course.logo || "",
                isEnabled: course.isEnabled,
            }));

            return {
                data: coursesArray,
                totalPages: pagination.totalPages,
                totalRecords: pagination.totalRecords
            };
        } else {
            console.error("Unexpected response format:", response.data);
            throw new Error('Unexpected response format');
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? `Error en la respuesta de la API: ${error.response.data}`
            : error.request
                ? 'No response received from API'
                : `Error setting up request: ${error.message}`;

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const getCoursesByTeacherIdAsync = async (teacherId: string): Promise<CourseDTO[]> => {
    try {
        // Realizar la solicitud GET para obtener todos los cursos
        const response = await api.get(`/OnBoardingTeacher/GetCoursesByTeacherId`, {
            params: { TeacherId: teacherId }
        });

        // Registrar la respuesta completa para ver su estructura
        console.log("Full response data:", response.data);

        const { value } = response.data;

        // Verificar si `value` es directamente un array o si contiene `data`
        const coursesData = Array.isArray(value) ? value : value?.data;

        if (coursesData && Array.isArray(coursesData)) {
            // Mapear los cursos a CourseDTO
            const coursesArray: CourseDTO[] = coursesData.map((course: any) => ({
                id: course.id,
                name: course.name,
                description: course.description,
                teacher: course.teacherDTO?.fullName || "Unknown",
                logo: course.logo || "",
                isEnabled: course.isEnabled,
            }));

            return coursesArray;
        } else {
            console.error("Unexpected response format:", response.data);
            throw new Error('Unexpected response format');
        }
    } catch (error: any) {
        const errorMessage = error.response
            ? `Error en la respuesta de la API: ${error.response.data}`
            : error.request
                ? 'No response received from API'
                : `Error setting up request: ${error.message}`;

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};
