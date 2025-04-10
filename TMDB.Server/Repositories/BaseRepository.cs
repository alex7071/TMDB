using TMDB.Server.Identity.Interfaces;
using TMDB.Server.Repositories.Interfaces;

namespace TMDB.Server.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected IDbContext _dbContext;
    
    public BaseRepository(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<T> GetAll()
    {
        return _dbContext.Set<T>().ToList();
    }
}