import { checkBackendStatus } from './statusApi';
import * as authApi from './authApi';
import * as userApi from './userApi';
import * as countryApi from './countryApi';
import * as announceApi from './announceApi';
import * as courseApi from './courseApi';
import * as enrollTeacherApi from './enrollmentsTeacherApi';
import * as enrollStudentApi from './enrollmentsStudentApi';
import * as subjectApi from './subjectApi';
import * as utcOffset from './utcOffset';
import * as loadTranslations from './translationsService'; // Importa loadTranslations

export {
    checkBackendStatus,
    authApi,
    userApi,
    countryApi,
    announceApi,
    courseApi,
    enrollTeacherApi,
    enrollStudentApi,
    subjectApi,
    utcOffset,
    loadTranslations
};