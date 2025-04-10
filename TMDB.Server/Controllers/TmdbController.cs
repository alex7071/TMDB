using Microsoft.AspNetCore.Mvc;
using TMDB.Server.Models.ResponseModels;
using TMDB.Server.Repositories.Interfaces;
using TMDB.Server.Services.Interface;

namespace TMDB.Server.Controllers;

/// <summary>
/// Tmdb controller
/// </summary>
[ApiController]
[Route("[controller]/[action]")]
public class TmdbController : ControllerBase
{
    private readonly ITmdbService _tmdbService;
    private readonly ICommentsRepository _commentsRepository;

    public TmdbController(ITmdbService tmdbService, ICommentsRepository commentsRepository)
    {
        _tmdbService = tmdbService;
        _commentsRepository = commentsRepository;
    }

    /// <summary>
    /// Retrieve paginated top rated movies, with optional page (default = 1)
    /// 20 results per page
    /// </summary>
    /// <param name="page">page to retrieve</param>
    /// <returns>TopRatedResponse</returns>
    [HttpGet("{page}")]
    public MovieRatedResponse GetTopRated(int page = 1)
    {
        return _tmdbService.GetTopRated(page);
    }

    /// <summary>
    /// Retrieve paginated top rated movies, with optional page (default = 1)
    /// 20 results per page
    /// </summary>
    /// <param name="page">page to retrieve</param>
    /// <returns>TopRatedResponse</returns>
    [HttpGet("{page}")]
    public MovieRatedResponse GetNowPlaying(int page = 1)
    {
        return _tmdbService.GetNowPlaying(page);
    }

    /// <summary>
    /// Retrieve movie details
    /// </summary>
    /// <param name="id">Movie id</param>
    /// <returns>MovieDetailsModel</returns>
    [HttpGet("{id}")]
    public MovieDetailsResponse GetMovieDetails(int id)
    {
        return _tmdbService.GetMovieDetails(id);
    }

    /// <summary>
    /// Get genre list
    /// </summary>
    /// <returns>GenresResponse</returns>
    [HttpGet]
    public GenresResponse GetGenres()
    {
        return _tmdbService.GetGenres();
    }

    /// <summary>
    /// Search by title
    /// </summary>
    /// <param name="query"></param>
    /// <param name="page"></param>
    /// <returns>SearchResponse</returns>
    [HttpGet("{query}/{page}")]
    public SearchResponse? GetSearch(string query, int page = 1)
    {
        return _tmdbService.GetSearch(query, page);
    }

    /// <summary>
    /// Search by genres
    /// </summary>
    /// <param name="genres">comma separated values of genres</param>
    /// <returns>SearchResponse</returns>
    [HttpGet("{genres}/{page}")]
    public SearchResponse GetByGenres(string genres, int page = 1)
    {
        return _tmdbService.GetByGenres(genres, page);
    }
    
    /// <summary>
    /// Retrieves comments
    /// </summary>
    /// <returns>CommentsResponse</returns>
    [HttpGet("{movieId}")]
    public CommentsResponse GetComments(int movieId)
    {
        return new CommentsResponse { Comments = _commentsRepository.GetByMovieId(movieId) };
    }
}