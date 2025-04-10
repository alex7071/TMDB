using Microsoft.EntityFrameworkCore;
using TMDB.Server.Models.Entities;

namespace TMDB.Server.Identity.Interfaces;

public interface IDbContext
{
    DbSet<Comment> Comments { get; set; }
    int SaveChanges();

    DbSet<TEntity> Set<TEntity>()
        where TEntity : class;
}