using Newtonsoft.Json;

namespace TMDB.Server.Models;

public class MovieModel
{
    [JsonProperty("adult")]
    public bool Adult { get; set;  }
    [JsonProperty("backdrop_path")]
    public string BackdropPath { get; set; }
    [JsonProperty("genre_ids")]
    public List<int> GenreIds { get; set; }
    [JsonProperty("id")]
    public int Id { get; set;  }
    [JsonProperty("original_language")]
    public string OriginalLanguage { get; set; }
    [JsonProperty("original_title")]
    public string OriginalTitle { get; set; }
    [JsonProperty("overview")]
    public string Overview { get; set; }
    [JsonProperty("popularity")]
    public double Popularity { get; set; }
    [JsonProperty("poster_path")]
    public string PosterPath { get; set;  }

    public string FullPosterPath220x330
    {
        get => string.IsNullOrEmpty(PosterPath) ? string.Empty : "https://image.tmdb.org/t/p/w220_and_h330_face" + PosterPath;
    }
    [JsonProperty("release_date")]
    public DateTime? ReleaseDate { get; set; }
    [JsonProperty("title")]
    public string Title { get; set; }
    [JsonProperty("video")]
    public bool Video { get; set; }
    [JsonProperty("vote_average")]
    public double VoteAverage { get; set; }
    [JsonProperty("vote_count")]
    public double VoteCount { get; set; }
}