using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.DTOS.OnboardingStudent.Request;
using StudyFlow.BLL.DTOS.OnboardingStudent.Response;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Enumeration;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class OnBoardingStudentService : IOnBoardingStudentService
    {
        private IUnitOfWork _unitOfWork;

        public OnBoardingStudentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IActionResult> GetCoursesByStudentIdAsync(GetCourseStudentDTORequest getCourseStudentDTORequest)
        {
            var user = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == getCourseStudentDTORequest.StudentId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {getCourseStudentDTORequest.StudentId}.");
            }

            var paginationResult = await _unitOfWork.CourseRepository.GetAllCourseByStudentIdAsync(getCourseStudentDTORequest.StudentId, getCourseStudentDTORequest.Pagination);

            if (!paginationResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists courses for this student.");
            }

            OnBoardingStudentCourseDTOResponse onBoardingStudentCourseDTOResponse = new()
            {
                PaginationResult = new PaginationResult<CourseDTO>
                {
                    ListResult = paginationResult.ListResult.Select(s => s.ToDTO()).ToList(),
                    TotalRecords = paginationResult.TotalRecords,
                    TotalPages = paginationResult.TotalPages,
                    Pagination = paginationResult.Pagination
                }
            };

            return ApiResponseHelper.Success(onBoardingStudentCourseDTOResponse);
        }

        public async Task<IActionResult> GetCoursesByTeacherNameAsync(GetCourseStudentDTORequest getCourseStudentDTORequest)
        {
            if (string.IsNullOrEmpty(getCourseStudentDTORequest.Pagination?.Filter))
            {
                return ApiResponseHelper.BadRequest("TeacherNameFilter is required.");
            }

            PaginationResult<Course> listCourses = await _unitOfWork.CourseRepository.GetCoursesByTeacherNameAsync(getCourseStudentDTORequest.Pagination);

            if (!listCourses.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists course for this Teacher.");
            }

            OnBoardingStudentCourseDTOResponse onBoardingStudentCourseDTOResponse = new()
            {
                PaginationResult =
                    new PaginationResult<CourseDTO>
                    {
                        ListResult = listCourses.ListResult.Select(s => s.ToDTO()).ToList(),
                        TotalRecords = listCourses.TotalRecords,
                        TotalPages = listCourses.TotalPages,
                        Pagination = listCourses.Pagination
                    },
            };
            return ApiResponseHelper.Success(onBoardingStudentCourseDTOResponse);
        }

        public async Task<IActionResult> AddRequestToCourseFromStudentAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            var user = await _unitOfWork.UserRepository.AnyAsync(x => x.Id == enrollmentFromStudentDTORequest.StudentId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"User with Id {enrollmentFromStudentDTORequest.StudentId} not found.");
            }

            var course = await _unitOfWork.CourseRepository.AnyAsync(x => x.Id == enrollmentFromStudentDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {enrollmentFromStudentDTORequest.CourseId} not found.");
            }

            try
            {
                await _unitOfWork.EnrollmentRepository.CreateAsync(new Enrollment
                {
                    CourseId = enrollmentFromStudentDTORequest.CourseId,
                    StudentId = enrollmentFromStudentDTORequest.StudentId,
                    IsEnabled = false,
                    IsCompleted = false
                });

                await _unitOfWork.SaveChangesAsync();
                return ApiResponseHelper.Create(true);
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new ArgumentException("An error occurred while adding the request.");
            }
        }

        public async Task<IActionResult> DeleteRequestToCourseFromStudentAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            var user = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == enrollmentFromStudentDTORequest.StudentId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"User with Id {enrollmentFromStudentDTORequest.StudentId} not found.");
            }

            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == enrollmentFromStudentDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {enrollmentFromStudentDTORequest.CourseId} not found.");
            }

            var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollmentByStudentAndCourseIdAsync(enrollmentFromStudentDTORequest.StudentId, enrollmentFromStudentDTORequest.CourseId);

            if (enrollment == null)
            {
                return ApiResponseHelper.NotFound($"Enrollment not found.");
            }

            try
            {
                await _unitOfWork.EnrollmentRepository.DeleteAsync(enrollment);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponseHelper.NoContent();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new ArgumentException("An error occurred while deleting the request.");
            }
        }

        public async Task<IActionResult> GetSubjectsByStudentIdAsync(OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest)
        {
            if (onBoardingStudentSubjectDTORequest.StudentId is null)
            {
                return ApiResponseHelper.BadRequest("StudentId is required.");
            }

            var user = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == onBoardingStudentSubjectDTORequest.StudentId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {onBoardingStudentSubjectDTORequest.StudentId}.");
            }

            var paginationResult = await _unitOfWork.SubjectRepository.GetSubjectsByStudentIdAsync(onBoardingStudentSubjectDTORequest.StudentId.Value, onBoardingStudentSubjectDTORequest.Pagination);

            if (!paginationResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists subjects for this student.");
            }

            OnBoardingStudentSubjectDTOResponse onBoardingStudentSubjectDTOResponse = new()
            {
                PaginationResult = new PaginationResult<SubjectDTO>
                {
                    ListResult = paginationResult.ListResult.Select(s => s.ToDTO()).ToList(),
                    TotalRecords = paginationResult.TotalRecords,
                    TotalPages = paginationResult.TotalPages,
                    Pagination = paginationResult.Pagination
                }
            };

            return ApiResponseHelper.Success(onBoardingStudentSubjectDTOResponse);
        }

        public async Task<IActionResult> GetSubjectsByTeacherIdAsync(OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest)
        {
            if (onBoardingStudentSubjectDTORequest.TeacherId is null)
            {
                return ApiResponseHelper.BadRequest("TeacherId is required.");
            }

            var user = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == onBoardingStudentSubjectDTORequest.TeacherId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {onBoardingStudentSubjectDTORequest.TeacherId}.");
            }

            var paginationResult = await _unitOfWork.SubjectRepository.GetSubjectsByTeacherIdAsync(onBoardingStudentSubjectDTORequest.TeacherId.Value, onBoardingStudentSubjectDTORequest.Pagination);

            if (!paginationResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists subjects for this teacher.");
            }

            OnBoardingStudentSubjectDTOResponse onBoardingStudentSubjectDTOResponse = new()
            {
                PaginationResult = new PaginationResult<SubjectDTO>
                {
                    ListResult = paginationResult.ListResult.Select(s => s.ToDTO()).ToList(),
                    TotalRecords = paginationResult.TotalRecords,
                    TotalPages = paginationResult.TotalPages,
                    Pagination = paginationResult.Pagination
                }
            };
            return ApiResponseHelper.Success(onBoardingStudentSubjectDTOResponse);
        }

        public async Task<IActionResult> GetSubjectsFromCourseByTypeAsync(OnBoardingStudentSubjectDTORequest onBoardingStudentSubjectDTORequest)
        {
            if (onBoardingStudentSubjectDTORequest.CourseId is null)
            {
                return ApiResponseHelper.BadRequest("CourseId is required.");
            }

            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == onBoardingStudentSubjectDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Not found course with the Id {onBoardingStudentSubjectDTORequest.CourseId}.");
            }

            SubjectTypeEnum subjectTypeEnum = Enum.TryParse(onBoardingStudentSubjectDTORequest.Pagination.Filter, out subjectTypeEnum) ? subjectTypeEnum : SubjectTypeEnum.Default;

            if (subjectTypeEnum == SubjectTypeEnum.Default)
            {
                return ApiResponseHelper.BadRequest("SubjectType is required.");
            }

            var paginationResult = await _unitOfWork.SubjectRepository.GetSubjectsFromCourseByTypeAsync(onBoardingStudentSubjectDTORequest.CourseId.Value, subjectTypeEnum, onBoardingStudentSubjectDTORequest.Pagination);

            if (!paginationResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists subjects for this course.");
            }

            OnBoardingStudentSubjectDTOResponse onBoardingStudentSubjectDTOResponse = new()
            {
                PaginationResult = new PaginationResult<SubjectDTO>
                {
                    ListResult = paginationResult.ListResult.Select(s => s.ToDTO()).ToList(),
                    TotalRecords = paginationResult.TotalRecords,
                    TotalPages = paginationResult.TotalPages,
                    Pagination = paginationResult.Pagination
                }
            };

            return ApiResponseHelper.Success(onBoardingStudentSubjectDTOResponse);
        }

        public async Task<IActionResult> GetEnrollmentsCompletedByStudentIdAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            var user = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == enrollmentFromStudentDTORequest.StudentId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {enrollmentFromStudentDTORequest.StudentId}.");
            }

            var enrollments = await _unitOfWork.EnrollmentRepository.GetEnrollmentsCompletedByStudentIdAsync(enrollmentFromStudentDTORequest.StudentId, enrollmentFromStudentDTORequest.Pagination);

            if (!enrollments.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists enrollments for this student.");
            }

            OnBoardingStudentEnrollmentDTOResponse onBoardingStudentEnrollmentDTOResponse = new()
            {
                PaginationResult = new PaginationResult<EnrollmentDTO>
                {
                    ListResult = enrollments.ListResult.Select(s => s.ToDTO()).ToList(),
                    TotalRecords = enrollments.TotalRecords,
                    TotalPages = enrollments.TotalPages,
                    Pagination = enrollments.Pagination
                }
            };

            return ApiResponseHelper.Success(onBoardingStudentEnrollmentDTOResponse);
        }

        public async Task<IActionResult> GetEnrollmentEnabledByStudentIdAsync(EnrollmentFromStudentDTORequest enrollmentFromStudentDTORequest)
        {
            var user = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == enrollmentFromStudentDTORequest.StudentId);

            if (!user)
            {
                return ApiResponseHelper.NotFound($"Not found user with the Id {enrollmentFromStudentDTORequest.StudentId}.");
            }

            var enrollments = await _unitOfWork.EnrollmentRepository.GetEnrollmentsEnabledByStudentIdAsync(enrollmentFromStudentDTORequest.StudentId, enrollmentFromStudentDTORequest.Pagination);

            if (!enrollments.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists enrollments for this student.");
            }

            OnBoardingStudentEnrollmentDTOResponse onBoardingStudentEnrollmentDTOResponse = new()
            {
                PaginationResult = new PaginationResult<EnrollmentDTO>
                {
                    ListResult = enrollments.ListResult.Select(s => s.ToDTO()).ToList(),
                    TotalRecords = enrollments.TotalRecords,
                    TotalPages = enrollments.TotalPages,
                    Pagination = enrollments.Pagination
                }
            };

            return ApiResponseHelper.Success(onBoardingStudentEnrollmentDTOResponse);
        }
    }
}