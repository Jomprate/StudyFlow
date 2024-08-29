﻿using StudyFlow.BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDTO loginDTO);

        Task<bool> LogoutAsync();

        Task<bool> RecoverPasswordByEmailAsync(string email);

        Task<bool> ResetPasswordAsync(Guid idUser, string newPassword);
    }
}