using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Shared.Dto.Entitis
{
    public abstract class IEntity
    {
        public Guid Id { get; set; }= Guid.NewGuid();

        public string Name { get; set; }
    }
}
