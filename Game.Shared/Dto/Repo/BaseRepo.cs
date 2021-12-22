using Game.Shared.Dto.Entitis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Shared.Dto.Repo
{
    public class BaseRepo<T> : IRepo<T> where T : IEntity
    {
        public List<T> Query => _data;

        private List<T> _data;

        public BaseRepo()
        {
            _data = new List<T>();
        }

        public void Delete(Guid guid)
        {
            var entity = Get(guid);
            if (entity is null)
                return;

            Query.Remove(entity);
        }

        public T Get(Guid guid)
        {
            return Query.SingleOrDefault(t => t.Id == guid);
        }

        public T Insert(T item)
        {
            var entity = Get(item.Id);
            if (entity is not null)
                return entity;

            Query.Add(item);
            return item;
        }

        public T Update(Guid guid, T item)
        {
            Delete(guid);
            item.Id = guid;
           return Insert(item);
        }

        public T GetByName(string name)
        {
            return Query.SingleOrDefault(t => t.Name == name);
        }
    }
}
