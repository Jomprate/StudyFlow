using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudyFlow.Infrastructure.Interfaces;

namespace StudyFlow.Infrastructure.Services
{
    public class LocalStorageService : IStorageService
    {
        private string _storagePath;
        private string _imgContainer;
        private IConfiguration _configuration;

        public LocalStorageService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task ConfigureBlobStorage(IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            var keyVaultService = serviceProvider.GetService<IKeyVaultService>();

            if (keyVaultService == null)
            {
                throw new InvalidOperationException("IKeyVaultService is not registered in the service collection.");
            }

            _imgContainer = await keyVaultService.GetSecretAsync("ImageContainer");
            _storagePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, _imgContainer);
        }

        public async Task<bool> DeleteAsync(string blobname)
        {
            string filePath = Path.Combine(_storagePath, blobname);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<string> DownloadAsync(string blobName)
        {
            string filePath = Path.Combine(_storagePath, blobName);
            if (File.Exists(filePath))
            {
                byte[] fileBytes = await File.ReadAllBytesAsync(filePath);
                string base64String = Convert.ToBase64String(fileBytes);
                return base64String;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> UploadAsync(string base64String, string blobName)
        {
            string filePath = Path.Combine(_storagePath, blobName);
            byte[] fileBytes = Convert.FromBase64String(base64String);

            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }

            await File.WriteAllBytesAsync(filePath, fileBytes);
            return true;
        }
    }
}