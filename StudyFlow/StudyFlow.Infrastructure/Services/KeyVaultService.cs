using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.Infrastructure.Services
{
    public class KeyVaultService : IKeyVaultService
    {
        private readonly SecretClient _secretClient;

        public KeyVaultService(string keyVaultUri)
        {
            _secretClient = new SecretClient(new Uri(keyVaultUri), new DefaultAzureCredential());
        }

        public async Task<string> GetSecretAsync(string secretName)
        {
            try
            {
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