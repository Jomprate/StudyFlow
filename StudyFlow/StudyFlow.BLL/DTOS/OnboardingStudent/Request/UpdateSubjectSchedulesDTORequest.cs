using StudyFlow.BLL.DTOS.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.OnBoardingTeacher.Request
{
    public class UpdateSubjectSchedulesDTORequest
    {
        [Required]
        public Guid? SubjectId { get; set; }

        public List<ScheduledDTO> ListScheduleds { get; set; } = new List<ScheduledDTO>();
    }
}