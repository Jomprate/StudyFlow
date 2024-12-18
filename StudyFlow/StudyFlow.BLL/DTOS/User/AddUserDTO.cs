﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.DTOS.User
{
    public class AddUserDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string? Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$",
        ErrorMessage = "The password must be 8 to 16 characters long and contain at least one uppercase letter, one lowercase letter, and one number. Special characters are not allowed.")]
        public string? Password { get; set; }

        [RegularExpression(@"^\d{7}(\d{3})?$",
            ErrorMessage = "The PhoneNumber must be 7 or 10 digits.")]
        public string? PhoneNumber { get; set; }

        public int CountryId { get; set; }
        public string? ProfilePicture { get; set; }
        public int ProfileId { get; set; }
    }
}