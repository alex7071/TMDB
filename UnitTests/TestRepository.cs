using Moq;
using Moq.EntityFrameworkCore;
using TMDB.Server.Identity.Interfaces;
using TMDB.Server.Models.Entities;
using TMDB.Server.Models.Identity;
using TMDB.Server.Repositories;

namespace UnitTests;

[TestFixture]
public class Tests
{
    private CommentsRepository _repository;
    private Mock<IDbContext> _dbContext;


    [SetUp]
    public void Setup()
    {
        _dbContext = new Mock<IDbContext>();
        
        var dbSet = new List<Comment>
        {
            new Comment
            {
                Id = 1, Text = "new comment",
                User = new ApplicationUser { Id = Guid.NewGuid().ToString(), Email = "test@test.com" }, MovieId = 1
            },
            new Comment
            {
                Id = 2, Text = "another comment",
                User = new ApplicationUser { Id = Guid.NewGuid().ToString(), Email = "test@test.com" }, MovieId = 2
            }
        };
        _dbContext.Setup(r => r.Comments).ReturnsDbSet(dbSet);
        _dbContext.Setup(r => r.Set<Comment>()).ReturnsDbSet(dbSet);
        _repository = new CommentsRepository(_dbContext.Object);
    }

    [Test]
    public void Test_that_repository_retrieves_all_comments()
    {
        var comments = _repository.GetAll();
        Assert.That(comments.Count, Is.EqualTo(2));
    }

    [Test]
    public void Test_that_getByMovieId_returns_correct_comment()
    {
        var commentByMovieId = _repository.GetByMovieId(1);
        Assert.That(commentByMovieId.FirstOrDefault().MovieId, Is.EqualTo(1));
    }

    [Test]
    public void Test_that_Add_calls_SaveChanges()
    {
        _repository.Add(new Comment { Text = "Test" });
        _dbContext.Setup(r => r.SaveChanges()).Verifiable(Times.Once);
    }
}
