using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Shared.Dto.Repo
{
    public interface IRepo<T>
    {
        public List<T> Query { get;} 
        public T Get(Guid guid);
        public T Insert(T item);
        public void Delete(Guid guid);
        public T Update(Guid guid, T item);
        public T GetByName(string name);
    }
}
