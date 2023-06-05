using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Interfaces
{
    public interface ICategoryService
    {
        Task<ServiceResponse> GetAll();
        Task<Category> GetById(object id);
        Task<ServiceResponse> Create(CategoryDto model);
        Task<ServiceResponse> Delete(int id);
        Task<ServiceResponse> Update(CategoryDto model);
    }
}
