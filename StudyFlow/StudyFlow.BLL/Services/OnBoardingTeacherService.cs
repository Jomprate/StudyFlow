﻿using Microsoft.AspNetCore.Mvc;
using StudyFlow.BLL.DTOS.ApiResponse;
using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.BLL.DTOS.OnBoardingTeacher;
using StudyFlow.BLL.DTOS.OnBoardingTeacher.Request;
using StudyFlow.BLL.Interfaces;
using StudyFlow.BLL.Mapping;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Enumeration;
using StudyFlow.DAL.Interfaces;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.BLL.Services
{
    public class OnBoardingTeacherService : IOnBoardingTeacherService
    {
        #region Private Fields

        private IUnitOfWork _unitOfWork;
        private IStorageService _storageService;

        #endregion Private Fields

        #region Constructors

        public OnBoardingTeacherService(IUnitOfWork unitOfWork, IStorageService blobStorage)
        {
            _unitOfWork = unitOfWork;
            _storageService = blobStorage;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<IActionResult> GetCoursesAsync(GetCourseTeacherDTORequest getCourseTeacherDTORequest)
        {
            if (getCourseTeacherDTORequest.TeacherId is null)
            {
                return ApiResponseHelper.BadRequest("TeacherId is required.");
            }

            var teacher = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == getCourseTeacherDTORequest.TeacherId.Value);

            if (teacher == null)
            {
                throw new Exception("Teacher not found");
            }

            var courses = await _unitOfWork.CourseRepository.GetAllCourseByTeacherIdAsync(getCourseTeacherDTORequest.TeacherId.Value, getCourseTeacherDTORequest.Pagination);
            IList<CourseDTO> listCoursesDto = new List<CourseDTO>();
            listCoursesDto = courses.ListResult.Select(s => s.ToDTO()).ToList();
            listCoursesDto = listCoursesDto.Select(s =>
            {
                s.Logo = courses.ListResult.Any(w => w.HaveLogo && w.Id == s.Id) ? _storageService.DownloadAsync(s.Id.ToString()).Result : string.Empty;
                return s;
            }).ToList();

            return ApiResponseHelper.Success(
                new OnBoardingTeacherCourseDTOResponse()
                {
                    PaginationResult = new PaginationResult<CourseDTO>()
                    {
                        ListResult = listCoursesDto,
                        TotalRecords = courses.TotalRecords,
                        TotalPages = courses.TotalPages,
                        Pagination = courses.Pagination
                    }
                });
        }

        public async Task<IActionResult> GetCourseByIdAsync(GetCourseTeacherDTORequest getCourseTeacherDTORequest)
        {
            if (getCourseTeacherDTORequest.CourseId is null)
            {
                return ApiResponseHelper.BadRequest("CourseId is required.");
            }

            var course = await _unitOfWork.CourseRepository.GetByIdWithTeacherAsync(getCourseTeacherDTORequest.CourseId.Value);

            if (course == null)
            {
                return ApiResponseHelper.NotFound($"Not found course with the Id {getCourseTeacherDTORequest.CourseId}.");
            }

            CourseDTO courseDTO = course.ToDTO();
            courseDTO.Logo = course.HaveLogo ? await _storageService.DownloadAsync(course.Id.ToString()) : string.Empty;

            return ApiResponseHelper.Success(courseDTO);
        }

        public async Task<IActionResult> CreateCourseAsync(CourseDTO courseDTO)
        {
            if (courseDTO.TeacherDTO.Id is null)
            {
                return ApiResponseHelper.BadRequest("TeacherId is required.");
            }

            var teacher = await _unitOfWork.UserRepository.GetByIdAsync(courseDTO.TeacherDTO.Id.Value);

            if (teacher is null)
            {
                return ApiResponseHelper.NotFound($"Not found teacher with the Id {courseDTO.TeacherDTO.Id}.");
            }

            var course = courseDTO.ToEntity();
            course.TeacherId = courseDTO.TeacherDTO.Id.Value;
            Course newCourse = null;

            try
            {
                newCourse = await _unitOfWork.CourseRepository.CreateAsync(course);

                if (!string.IsNullOrEmpty(courseDTO.Logo))
                {
                    _storageService.UploadAsync(courseDTO.Logo, course.Id.ToString());
                }

                _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to create course", ex);
            }

            newCourse.Teacher = teacher;
            return ApiResponseHelper.Create(newCourse.ToDTO());
        }

        public async Task<IActionResult> UpdateCourseAsync(CourseDTO courseDTO)
        {
            if (courseDTO.Id is null)
            {
                return ApiResponseHelper.BadRequest("CourseId is required.");
            }

            var course = await _unitOfWork.CourseRepository.GetByIdAsync(courseDTO.Id.Value);

            if (course == null)
            {
                return ApiResponseHelper.NotFound($"Not found course with the Id {courseDTO.Id}.");
            }

            course.Description = courseDTO.Description ?? course.Description;
            course.Name = courseDTO.Name ?? course.Name;
            course.IsEnabled = courseDTO.IsEnabled ?? course.IsEnabled;
            course.HaveLogo = !string.IsNullOrEmpty(courseDTO.Logo) || course.HaveLogo;
            bool result;

            try
            {
                result = await _unitOfWork.CourseRepository.UpdateAsync(course);

                if (!string.IsNullOrEmpty(courseDTO.Logo) && result)
                {
                    _storageService.UploadAsync(courseDTO.Logo, course.Id.ToString());
                }

                _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to update course", ex);
            }

            return ApiResponseHelper.NoContent();
        }

        public async Task<IActionResult> DeleteCourseAsync(Guid courseId)
        {
            var course = await _unitOfWork.CourseRepository.GetByIdAsync(courseId);

            if (course == null)
            {
                return ApiResponseHelper.NotFound($"Not found course with the Id {courseId}.");
            }

            bool result;

            try
            {
                result = await _unitOfWork.CourseRepository.DeleteAsync(course);

                if (result)
                {
                    var isDeleted = course.HaveLogo ? _storageService.DeleteAsync(course.Id.ToString()).Result : false;
                    _unitOfWork.SaveChangesAsync();
                    return ApiResponseHelper.NoContent();
                }

                throw new ArgumentException("Failed to delete course");
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to delete course", ex);
            }
        }

        public async Task<IActionResult> AddEnrollmentByStudentAsync(AddEnrollmentByStudentDTORequest addEnrollmentByStudentDTORequest)
        {
            var student = await _unitOfWork.UserRepository.GetUserByEmailAsync(addEnrollmentByStudentDTORequest.EmailStudent);

            if (student is null)
            {
                return ApiResponseHelper.NotFound($"Student with email {addEnrollmentByStudentDTORequest.EmailStudent} not found.");
            }

            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == addEnrollmentByStudentDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {addEnrollmentByStudentDTORequest.CourseId} not found.");
            }

            try
            {
                await _unitOfWork.EnrollmentRepository.CreateAsync(new Enrollment()
                {
                    CourseId = addEnrollmentByStudentDTORequest.CourseId,
                    StudentId = student.Id,
                    IsCompleted = true,
                    IsEnabled = true
                });

                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to create enrollment", ex);
            }

            return ApiResponseHelper.Create(true);
        }

        public async Task<IActionResult> GetEnrollmentsByCourseIdAsync(GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == getEnrollmentsByCourseDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {getEnrollmentsByCourseDTORequest.CourseId} not found.");
            }

            var enrollments = await _unitOfWork.EnrollmentRepository.GetEnrollmentsByCourseIdAsync(getEnrollmentsByCourseDTORequest.CourseId, getEnrollmentsByCourseDTORequest.Pagination);

            if (!enrollments.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists enrollments for this courseId.");
            }
            IList<EnrollmentDTO> listEnrollmentsDto = new List<EnrollmentDTO>();
            listEnrollmentsDto = enrollments.ListResult.Select(s => s.ToDTO()).ToList();

            return ApiResponseHelper.Success(
                new OnBoardingTeacherEnrollmentDTOResponse()
                {
                    PaginationResult = new PaginationResult<EnrollmentDTO>()
                    {
                        ListResult = listEnrollmentsDto,
                        TotalRecords = enrollments.TotalRecords,
                        TotalPages = enrollments.TotalPages,
                        Pagination = enrollments.Pagination
                    }
                });
        }

        public async Task<IActionResult> SetEnrollmentByCourseidAsync(SetEnrollmentByCourseStudentDTORequest setEnrollmentByCourseStudentDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == setEnrollmentByCourseStudentDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {setEnrollmentByCourseStudentDTORequest.CourseId} not found.");
            }

            var student = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == setEnrollmentByCourseStudentDTORequest.StudentId);

            if (!student)
            {
                return ApiResponseHelper.NotFound($"Student with Id {setEnrollmentByCourseStudentDTORequest.StudentId} not found.");
            }

            var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollmentByStudentAndCourseIdAsync(setEnrollmentByCourseStudentDTORequest.StudentId, setEnrollmentByCourseStudentDTORequest.CourseId);

            if (enrollment == null)
            {
                return ApiResponseHelper.NotFound($"Enrollment not found.");
            }

            enrollment.IsEnabled = setEnrollmentByCourseStudentDTORequest.IsEnabled ?? enrollment.IsEnabled;
            enrollment.IsCompleted = setEnrollmentByCourseStudentDTORequest.IsCompleted ?? enrollment.IsCompleted;

            bool result = await _unitOfWork.EnrollmentRepository.UpdateAsync(enrollment);
            try
            {
                await _unitOfWork.SaveChangesAsync();
                return ApiResponseHelper.NoContent();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to update enrollment", ex);
            }
        }

        public async Task<IActionResult> DeleteEnrollmentByCourseIdAsync(SetEnrollmentByCourseStudentDTORequest setEnrollmentByCourseStudentDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == setEnrollmentByCourseStudentDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {setEnrollmentByCourseStudentDTORequest.CourseId} not found.");
            }

            var student = await _unitOfWork.UserRepository.AnyAsync(w => w.Id == setEnrollmentByCourseStudentDTORequest.StudentId);

            if (!student)
            {
                return ApiResponseHelper.NotFound($"Student with Id {setEnrollmentByCourseStudentDTORequest.StudentId} not found.");
            }

            var enrollment = await _unitOfWork.EnrollmentRepository.GetEnrollmentByStudentAndCourseIdAsync(setEnrollmentByCourseStudentDTORequest.StudentId, setEnrollmentByCourseStudentDTORequest.CourseId);

            if (enrollment == null)
            {
                return ApiResponseHelper.NotFound($"Enrollment not found.");
            }

            bool result = await _unitOfWork.EnrollmentRepository.DeleteAsync(enrollment);

            try
            {
                if (result)
                {
                    await _unitOfWork.SaveChangesAsync();
                    return ApiResponseHelper.NoContent();
                }

                throw new ArgumentException("Failed to delete enrollment");
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to delete enrollment", ex);
            }
        }

        public async Task<IActionResult> GetEnrollmentsCompletedByCourseIdAsync(GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == getEnrollmentsByCourseDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {getEnrollmentsByCourseDTORequest.CourseId} not found.");
            }

            if (getEnrollmentsByCourseDTORequest.Pagination is null)
            {
                return ApiResponseHelper.BadRequest("Pagination is required.");
            }

            if (getEnrollmentsByCourseDTORequest.Pagination.Filter is null)
            {
                return ApiResponseHelper.BadRequest("Filter is required.");
            }

            var enrollments = await _unitOfWork.EnrollmentRepository.GetEnrollmentsCompletedByCourseIdAsync(getEnrollmentsByCourseDTORequest.CourseId, getEnrollmentsByCourseDTORequest.Pagination);

            if (!enrollments.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists enrollments for this courseId.");
            }

            IList<EnrollmentDTO> listEnrollmentsDto = new List<EnrollmentDTO>();
            listEnrollmentsDto = enrollments.ListResult.Select(s => s.ToDTO()).ToList();

            return ApiResponseHelper.Success(
                new OnBoardingTeacherEnrollmentDTOResponse()
                {
                    PaginationResult = new PaginationResult<EnrollmentDTO>()
                    {
                        ListResult = listEnrollmentsDto,
                        TotalRecords = enrollments.TotalRecords,
                        TotalPages = enrollments.TotalPages,
                        Pagination = enrollments.Pagination
                    }
                });
        }

        public async Task<IActionResult> GetEnrollmentsEnabledByCourseIdAsync(GetEnrollmentsByCourseDTORequest getEnrollmentsByCourseDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == getEnrollmentsByCourseDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {getEnrollmentsByCourseDTORequest.CourseId} not found.");
            }

            if (getEnrollmentsByCourseDTORequest.Pagination is null)
            {
                return ApiResponseHelper.BadRequest("Pagination is required.");
            }

            if (getEnrollmentsByCourseDTORequest.Pagination.Filter is null)
            {
                return ApiResponseHelper.BadRequest("Filter is required.");
            }

            var enrollments = await _unitOfWork.EnrollmentRepository.GetEnrollmentsEnabledByCourseIdAsync(getEnrollmentsByCourseDTORequest.CourseId, getEnrollmentsByCourseDTORequest.Pagination);

            if (!enrollments.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists enrollments for this courseId.");
            }

            IList<EnrollmentDTO> listEnrollmentsDto = new List<EnrollmentDTO>();
            listEnrollmentsDto = enrollments.ListResult.Select(s => s.ToDTO()).ToList();

            return ApiResponseHelper.Success(
                new OnBoardingTeacherEnrollmentDTOResponse()
                {
                    PaginationResult = new PaginationResult<EnrollmentDTO>()
                    {
                        ListResult = listEnrollmentsDto,
                        TotalRecords = enrollments.TotalRecords,
                        TotalPages = enrollments.TotalPages,
                        Pagination = enrollments.Pagination
                    }
                });
        }

        public async Task<IActionResult> GetSubjectByCourseIdAsync(GetSubjectsByCourseDTORequest getSubjectsByCourseDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == getSubjectsByCourseDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {getSubjectsByCourseDTORequest.CourseId} not found.");
            }

            var paginationResult = await _unitOfWork.SubjectRepository.GetSubjectsByCourseIdAsync(getSubjectsByCourseDTORequest.CourseId, getSubjectsByCourseDTORequest.Pagination);

            if (!paginationResult.ListResult.Any())
            {
                return ApiResponseHelper.NotFound($"Don´t exists subjects for this courseId.");
            }

            IList<SubjectDTO> listSubjectDto = new List<SubjectDTO>();
            listSubjectDto = paginationResult.ListResult.Select(s => s.ToDTO()).ToList();

            return ApiResponseHelper.Success(
                new OnBoardingTeacherSubjectDTOResponse()
                {
                    PaginationResult = new PaginationResult<SubjectDTO>()
                    {
                        ListResult = listSubjectDto,
                        TotalRecords = paginationResult.TotalRecords,
                        TotalPages = paginationResult.TotalPages,
                        Pagination = paginationResult.Pagination
                    }
                });
        }

        public async Task<IActionResult> AddSubjectByCourseAsync(SetSubjectByCourseStudentDTORequest setSubjectByCourseStudentDTORequest)
        {
            var course = await _unitOfWork.CourseRepository.AnyAsync(w => w.Id == setSubjectByCourseStudentDTORequest.CourseId);

            if (!course)
            {
                return ApiResponseHelper.NotFound($"Course with Id {setSubjectByCourseStudentDTORequest.CourseId} not found.");
            }

            Subject subject = setSubjectByCourseStudentDTORequest.SubjectDTO.ToEntity();

            try
            {
                await _unitOfWork.SubjectRepository.CreateAsync(subject);

                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to add subject to course", ex);
            }

            return ApiResponseHelper.Create(true);
        }

        public async Task<IActionResult> SetSubjectByCourseAsync(SetSubjectByCourseStudentDTORequest setSubjectByCourseStudentDTORequest)
        {
            if (setSubjectByCourseStudentDTORequest.SubjectDTO.Id is null)
            {
                return ApiResponseHelper.BadRequest("SubjectId is required.");
            }

            if (setSubjectByCourseStudentDTORequest.SubjectDTO.ListScheduleds?.ScheduledDate is null)
            {
                return ApiResponseHelper.BadRequest("ListScheduleds is required.");
            }

            var subject = await _unitOfWork.SubjectRepository.GetByIdAsync(setSubjectByCourseStudentDTORequest.SubjectDTO.Id.Value);

            if (subject is null)
            {
                return ApiResponseHelper.NotFound($"Subject with Id {setSubjectByCourseStudentDTORequest.SubjectDTO.Id} not found.");
            }

            subject.Link = setSubjectByCourseStudentDTORequest.SubjectDTO.Link ?? subject.Link;
            if (Enum.TryParse<SubjectTypeEnum>(setSubjectByCourseStudentDTORequest.SubjectDTO.Type, out var parsedType))
            {
                subject.Type = parsedType;
            }
            subject.Name = setSubjectByCourseStudentDTORequest.SubjectDTO.Name ?? subject.Name;
            subject.ListScheduled.Add(new Scheduled()
            {
                SubjectId = subject.Id,
                ScheduledDate = setSubjectByCourseStudentDTORequest.SubjectDTO.ListScheduleds.ScheduledDate.Value,
                Link = setSubjectByCourseStudentDTORequest.SubjectDTO.ListScheduleds.Link ?? string.Empty
            });

            bool result = await _unitOfWork.SubjectRepository.UpdateAsync(subject);

            try
            {
                await _unitOfWork.SaveChangesAsync();
                return ApiResponseHelper.NoContent();
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to update subject", ex);
            }
        }

        public async Task<IActionResult> DeleteSubjectById(Guid subjectId)
        {
            var subject = await _unitOfWork.SubjectRepository.GetByIdAsync(subjectId);

            if (subject is null)
            {
                return ApiResponseHelper.NotFound($"Subject with Id {subjectId} not found.");
            }

            bool result = await _unitOfWork.SubjectRepository.DeleteAsync(subject);

            try
            {
                if (result)
                {
                    await _unitOfWork.SaveChangesAsync();
                    return ApiResponseHelper.NoContent();
                }

                throw new ArgumentException("Failed to delete subject");
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                throw new Exception("Failed to delete subject", ex);
            }
        }

        #endregion Public Methods
    }
}