namespace StudyFlow.BLL.DTOS.Authenticate.Request
{
    public class ResetPasswordRequestDTO
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string Token { get; set; }
    }
}