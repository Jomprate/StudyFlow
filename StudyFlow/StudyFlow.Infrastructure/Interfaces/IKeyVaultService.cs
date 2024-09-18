namespace StudyFlow.Infrastructure.Interfaces
{
    public interface IKeyVaultService
    {
        Task<string> GetSecretAsync(string secretName);
    }
}