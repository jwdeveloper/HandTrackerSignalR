using Game.Server.Data;
using Game.Shared.Dto.Entitis;
using Game.Shared.Dto.Lobby;
using Game.Shared.Dto.Repo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Numerics;

namespace Game.Server.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly IRepo<User> usersRepo;

        public LobbyHub(IRepo<User> usersRepo)
        {
            this.usersRepo = usersRepo;
        }

        public async Task OnDraw(string ondrawEvent)
        {
            if (ondrawEvent == null)
                return; 

            await Clients.Others.SendAsync("OnDrawEvent", ondrawEvent);
        }

        public async Task OnClear()
        {
            await Clients.Others.SendAsync("OnClearEvent");
        }
    }
}
