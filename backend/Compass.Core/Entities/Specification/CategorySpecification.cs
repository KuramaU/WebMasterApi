using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Entities.Specification
{
    public static class Categories
    {
        public class GetByName : Specification<Category>
        {
            public GetByName(string name)
            {
                Query
                    .Where(c => c.Name == name);
                    
            }
        }
    }
}
