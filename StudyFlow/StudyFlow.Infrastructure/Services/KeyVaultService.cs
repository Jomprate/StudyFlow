﻿using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Extensions.Configuration;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.Infrastructure.Services
{
    public class KeyVaultService : IKeyVaultService
    {
        private readonly SecretClient _secretClient;
        private readonly bool _isDevelopment = true;
        private readonly IConfiguration _configuration;

        public KeyVaultService(IConfiguration configuration, bool isDevelopment)
        {
            _configuration = configuration;
            _isDevelopment = isDevelopment;

            if (!_isDevelopment)
            {
                string keyVaultUri = _configuration["AzureKeyVault:KeyVaultUri"];
                _secretClient = new SecretClient(new Uri(keyVaultUri), new DefaultAzureCredential());
            }
        }

        public async Task<string> GetSecretAsync(string secretName)
        {
            try
            {
                if (_isDevelopment)
                {
                    return _configuration[$"Development:{secretName}"];
                }
                KeyVaultSecret secret = await _secretClient.GetSecretAsync(secretName);
                return secret.Value;
            }
            catch
            {
                throw;
            }
        }
    }
}