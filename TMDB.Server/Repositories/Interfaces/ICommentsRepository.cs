using TMDB.Server.Models.Entities;

namespace TMDB.Server.Repositories.Interfaces;

public interface ICommentsRepository : IBaseRepository<Comment>
{
    void Add(Comment comment);
    List<Comment> GetByMovieId(int movieId);
}