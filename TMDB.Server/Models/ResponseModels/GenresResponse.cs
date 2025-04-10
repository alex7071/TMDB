using Newtonsoft.Json;

namespace TMDB.Server.Models.ResponseModels;

public class GenresResponse
{
    [JsonProperty("genres")]
    public List<GenreModel> Genres { get; set; }
}