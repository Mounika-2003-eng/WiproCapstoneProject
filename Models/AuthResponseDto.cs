namespace ShopeForHomeAPI.Models
{
    public class AuthResponseDto
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
    }

}
