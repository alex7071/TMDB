namespace TMDB.Server.Repositories.Interfaces;

public interface IBaseRepository<T> where T : class
{
    List<T> GetAll();
}