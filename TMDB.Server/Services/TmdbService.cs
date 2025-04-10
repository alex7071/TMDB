using DotNet.RestApi.Client;
using TMDB.Server.Models.ResponseModels;
using TMDB.Server.Services.Interface;

namespace TMDB.Server.Services;

public class TmdbService : ITmdbService
{
    private readonly IConfiguration _configuration;
    private readonly RestApiClient _apiClient;
    private const string TopRated = "/3/movie/top_rated?include_adult=false&include_video=false&language=en-US&page={0}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200";
    private const string NowPlaying = "/3/movie/now_playing?include_adult=false&include_video=false&language=en-US&page={0}";
    private const string MovieDetails = "/3/movie/{0}?append_to_response=images,credits";
    private const string Genres = "/3/genre/movie/list";
    private const string Search = "/3/search/movie?query={0}&page={1}";
    private const string DiscoverByGenre = "/3/discover/movie?with_genres={0}&page={1}";
        
    public TmdbService(IConfiguration configuration, RestApiClient apiClient)
    {
        _configuration = configuration;
        _apiClient = apiClient;
    }

    /// <summary>
    /// Get paginated top rated movies
    /// </summary>
    /// <param name="page">page to return (int)</param>
    /// <returns>MovieRatedResponse</returns>
    public MovieRatedResponse GetTopRated(int page)
    {
        Uri uri = new Uri(_configuration.GetSection("TmdbApi")["Url"] + string.Format(TopRated, page));
        var response = _apiClient.SendJsonRequest(HttpMethod.Get, uri, null)
            .GetAwaiter().GetResult();
        return response.DeseriaseJsonResponse<MovieRatedResponse>();
    }

    /// <summary>
    /// Get details of a movie. Id is provided either in any result returning movies
    /// e.g. GetTopRated, Search
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public MovieDetailsResponse GetMovieDetails(int id)
    {
        Uri uri = new Uri(_configuration.GetSection("TmdbApi")["Url"] + string.Format(MovieDetails, id));
        var response = _apiClient.SendJsonRequest(HttpMethod.Get, uri, null)
            .GetAwaiter().GetResult();
        return response.DeseriaseJsonResponse<MovieDetailsResponse>();
    }

    /// <summary>
    /// Search by title
    /// </summary>
    /// <param name="query">string to query the search</param>
    /// <returns></returns>
    public SearchResponse? GetSearch(string query, int page)
    {
        if (string.IsNullOrEmpty(query))
        {
            return null;
        }
        Uri uri = new Uri(_configuration.GetSection("TmdbApi")["Url"] + string.Format(Search, query, page));
        var response = _apiClient.SendJsonRequest(HttpMethod.Get, uri, null)
            .GetAwaiter().GetResult();
        return response.DeseriaseJsonResponse<SearchResponse>();
    }

    /// <summary>
    /// Search by genres
    /// </summary>
    /// <param name="genres">comma separated values of genres</param>
    /// <returns>SearchResponse</returns>
    public SearchResponse GetByGenres(string genres, int page)
    {
        Uri uri = new Uri(_configuration.GetSection("TmdbApi")["Url"] + string.Format(DiscoverByGenre, genres, page));
        var response = _apiClient.SendJsonRequest(HttpMethod.Get, uri, null)
            .GetAwaiter().GetResult();
        return response.DeseriaseJsonResponse<SearchResponse>();
    }

    /// <summary>
    /// Get most recent movies - playing in theatres 
    /// </summary>
    /// <param name="page"></param>
    /// <returns></returns>
    public MovieRatedResponse GetNowPlaying(int page)
    {
        Uri uri = new Uri(_configuration.GetSection("TmdbApi")["Url"] + string.Format(NowPlaying, page));
        var response = _apiClient.SendJsonRequest(HttpMethod.Get, uri, null)
            .GetAwaiter().GetResult();
        return response.DeseriaseJsonResponse<MovieRatedResponse>();
    }

    /// <summary>
    /// Get collection of genres
    /// </summary>
    /// <returns>GenresResponse</returns>
    public GenresResponse GetGenres()
    {
        Uri uri = new Uri(_configuration.GetSection("TmdbApi")["Url"] + Genres);
        var response = _apiClient.SendJsonRequest(HttpMethod.Get, uri, null)
            .GetAwaiter().GetResult();
        return response.DeseriaseJsonResponse<GenresResponse>();
    }
}