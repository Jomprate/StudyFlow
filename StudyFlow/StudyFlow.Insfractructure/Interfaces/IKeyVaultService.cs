﻿namespace StudyFlow.Insfractructure.Interfaces
{
    public interface IKeyVaultService
    {
        Task<string> GetSecretAsync(string secretName);
    }
}