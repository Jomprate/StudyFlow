﻿using StudyFlow.BLL.DTOS.Entities;
using StudyFlow.DAL.Entities;
using System.ComponentModel.DataAnnotations;

namespace StudyFlow.BLL.DTOS.User
{
    public class GetUserDTO
    {
        public Guid Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string? Email { get; set; }

        [RegularExpression(@"^\d{7}(\d{3})?$",
            ErrorMessage = "The PhoneNumber must be 7 or 10 digits.")]
        public string? PhoneNumber { get; set; }

        public Country Country { get; set; } = null!;
        public string? ProfilePicture { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsOnline { get; set; }
        public List<ProfileDTO> listProfile { get; set; } = new List<ProfileDTO>();
    }
}