using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TMDB.Server.Models.Entities;
using TMDB.Server.Models.Identity;
using TMDB.Server.Models.ResponseModels;
using TMDB.Server.Repositories.Interfaces;

namespace TMDB.Server.Controllers;

/// <summary>
/// User controller
/// </summary>
[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly ICommentsRepository _commentsRepository;
    private readonly UserManager<ApplicationUser> _userManager;
    
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="commentsRepository"></param>
    /// <param name="userManager"></param>
    public UserController(ICommentsRepository commentsRepository, UserManager<ApplicationUser> userManager)
    {
        _commentsRepository = commentsRepository;
        _userManager = userManager;
    }

    /// <summary>
    /// Get loggin in user name (email)
    /// </summary>
    /// <returns>string</returns>
    [HttpGet]
    public string GetUserName()
    {
        return HttpContext.User.Identity.Name;
    }

    /// <summary>
    /// Add a comment on a movie
    /// </summary>
    /// <param name="request"></param>
    /// <returns>SuccessResponse</returns>
    [HttpPost]
    public async Task<SuccessResponse> PostComment([FromBody]CommentRequest request)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(HttpContext.User.Identity?.Name ?? string.Empty);
            _commentsRepository.Add(new Comment { Text = request.Comment, User = user, MovieId = request.MovieId });
            return new SuccessResponse { Success = true };
        }
        catch (Exception ex)
        {
            return new SuccessResponse { Success = false, Message = ex.Message };
        }
    }
}

public class CommentRequest
{
    [JsonProperty("comment")]
    public string Comment { get; set;  }
    [JsonProperty("movieId")]
    public int MovieId { get; set; }
}