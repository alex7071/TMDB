using Newtonsoft.Json;

namespace TMDB.Server.Models.ResponseModels;

public class PaginatedMovieResponse
{
    [JsonProperty("page")]
    public int Page { get; set;  }
    [JsonProperty("results")]
    public List<MovieModel> Results { get; set;  }
    [JsonProperty("total_pages")]
    public int TotalPages { get; set;  }
    [JsonProperty("total_results")]
    public int TotalResults { get; set;  }
}