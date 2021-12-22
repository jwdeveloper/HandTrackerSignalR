using Game.Server.Hubs;
using Game.Shared.Dto.Entitis;
using Game.Shared.Dto.Repo;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IRepo<User>, BaseRepo<User>>();
builder.Services.AddSingleton<IRepo<Room>, BaseRepo<Room>>();
builder.Services.AddServerSideBlazor();
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Paint online",
        Version = "1.0.0",
        Description = "Paint online API"
    });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
                   builder => builder.AllowAnyOrigin()
                         .AllowAnyMethod()
                         .AllowAnyHeader()
                         .AllowCredentials()
                         .WithOrigins("http://localhost:5500"));


    options.AddPolicy("signalr",
        builder => builder
        .AllowAnyMethod()
        .AllowAnyHeader()

        .AllowCredentials()
        .SetIsOriginAllowed(hostName => true));
});
var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseCors("signalr");
app.MapBlazorHub();
app.MapHub<LobbyHub>("/lobby");
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json","Swagger demo");
});
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();
