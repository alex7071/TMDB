using Newtonsoft.Json;

namespace TMDB.Server.Models;

public class ImageModel
{
    private const string ImageBaseUrl = "https://image.tmdb.org/t/p/w200";
    [JsonProperty("aspect_ratio")]
    public double AspectRatio { get; set; }
    [JsonProperty("height")]
    public int Height { get; set; }
    [JsonProperty("file_path")]
    public string FilePath { get; set; }
    public string FileUrl => $"{ImageBaseUrl}{FilePath}";
    [JsonProperty("width")]
    public int Width { get; set; }
}