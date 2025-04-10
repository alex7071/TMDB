using System.Globalization;
using Newtonsoft.Json;

namespace TMDB.Server.Models.ResponseModels;

public class MovieDetailsResponse
{
    private const string ImageBaseUrl = "https://image.tmdb.org/t/p/original";
    [JsonProperty("adult")]
    public bool Adult { get; set; }
    [JsonProperty("backdrop_path")]
    public string BackdropPath { get; set; }
    public string BackdropUrl => string.IsNullOrEmpty(BackdropPath) ? string.Empty : $"{ImageBaseUrl}{BackdropPath}";
    [JsonProperty("genres")]
    public List<GenreModel> Genres { get; set; }
    [JsonProperty("id")]
    public int Id { get; set; }
    [JsonProperty("original_title")]
    public string OriginalTitle { get; set; }
    [JsonProperty("original_language")]
    public string OriginalCode { get; set; }
    public string OriginalLanguage => CultureInfo.GetCultures(CultureTypes.SpecificCultures).FirstOrDefault(c => c.TwoLetterISOLanguageName == OriginalCode)?.EnglishName ?? string.Empty;
    [JsonProperty("overview")]
    public string Overview { get; set; }
    [JsonProperty("tagline")]
    public string Tagline { get; set; }
    [JsonProperty("poster_path")]
    public string PosterPath { get; set; }
    public string PosterUrl => $"{ImageBaseUrl}{PosterPath}";

    [JsonProperty("release_date")]
    public string ReleaseDate { get; set; }
    [JsonProperty("images")]
    public ImageTypesModel Images { get; set; }
    [JsonProperty("credits")]
    public CreditsModel Credits { get; set; }
}

public class ImageTypesModel
{
    [JsonProperty("backdrops")]
    public List<ImageModel> Backdrops { get; set; }
    [JsonProperty("logos")]
    public List<ImageModel> Logos { get; set; }
    [JsonProperty("posters")]
    public List<ImageModel> Posters { get; set; }
}

public class CreditsModel
{
    [JsonProperty("cast")]
    public List<CastModel> Cast { get; set; }
}