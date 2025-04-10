using Newtonsoft.Json;

namespace TMDB.Server.Models;

public class GenreModel
{
    [JsonProperty("id")]
    public int Id { get; set; }
    [JsonProperty("name")]
    public string Name { get; set; }
}