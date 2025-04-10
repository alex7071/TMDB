using Microsoft.EntityFrameworkCore;
using TMDB.Server.Identity.Interfaces;
using TMDB.Server.Models.Entities;
using TMDB.Server.Repositories.Interfaces;

namespace TMDB.Server.Repositories;

public class CommentsRepository : BaseRepository<Comment>, ICommentsRepository
{
    protected IDbContext _dbContext;
    
    public CommentsRepository(IDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public void Add(Comment comment)
    {
        _dbContext.Comments.Add(comment);
        _dbContext.SaveChanges();
    }

    public List<Comment> GetByMovieId(int movieId)
    {
        return _dbContext.Comments.Include("User").Where(comment => comment.MovieId == movieId).OrderByDescending(c => c.Id).ToList();
    }
}