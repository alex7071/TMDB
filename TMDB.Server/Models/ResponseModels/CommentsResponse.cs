using TMDB.Server.Models.Entities;

namespace TMDB.Server.Models.ResponseModels;

public class CommentsResponse
{
    public List<Comment> Comments { get; set; }
}