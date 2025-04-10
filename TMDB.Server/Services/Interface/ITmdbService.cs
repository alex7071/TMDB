using TMDB.Server.Models.ResponseModels;

namespace TMDB.Server.Services.Interface;

public interface ITmdbService
{
    MovieRatedResponse GetTopRated(int page);
    MovieDetailsResponse GetMovieDetails(int id);
    MovieRatedResponse GetNowPlaying(int page);
    GenresResponse GetGenres();
    SearchResponse? GetSearch(string query, int page);
    SearchResponse GetByGenres(string genres, int page);
}