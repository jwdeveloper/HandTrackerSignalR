using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Game.Shared.Dto.Entitis
{
    public class User : IEntity
    {
        public Guid RoomId { get; set; }

        public Vector3 Color = new Vector3(255, 255, 255);
        public string ConnectionId { get; set; }


    }
}
