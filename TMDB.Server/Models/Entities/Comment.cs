using System.Text.Json.Serialization;
using TMDB.Server.Models.Identity;

namespace TMDB.Server.Models.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Text { get; set; }
    [JsonIgnore]
    public ApplicationUser User { get; set; }
    public string UserName => User.UserName ?? string.Empty;
    public int MovieId { get; set; }
}