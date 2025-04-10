using DotNet.RestApi.Client;
using TMDB.Server.Services;
using TMDB.Server.Services.Interface;
using Microsoft.EntityFrameworkCore;
using TMDB.Server.Identity;
using TMDB.Server.Identity.Interfaces;
using TMDB.Server.Models.Identity;
using TMDB.Server.Repositories;
using TMDB.Server.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("IdentityDataContextConnection") ?? throw new InvalidOperationException("Connection string 'IdentityDataContextConnection' not found.");;

builder.Services.AddDbContext<IDbContext, IdentityDataContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 7;
    options.Password.RequiredUniqueChars = 0;
}).AddEntityFrameworkStores<IdentityDataContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

// Add services to the container.

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddHttpClient<RestApiClient>(c =>
{
    c.DefaultRequestHeaders.Add("Authorization", new []{ "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODU1NDM2MzZkM2JjMDVlMDY3MTczMWJhMGRiZmY3YiIsIm5iZiI6MTc0Mzc1OTI2OS40NTgsInN1YiI6IjY3ZWZhN2E1OTMxY2UxNzRhMmQ5MzZhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fnu15AJFqmqvuHenazFS-lx0FYeNNrB6342OG9xu95A" });
});
builder.Services.AddScoped<ITmdbService, TmdbService>();
builder.Services.AddTransient<ICommentsRepository, CommentsRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();


app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapIdentityApi<ApplicationUser>();

app.Run();
