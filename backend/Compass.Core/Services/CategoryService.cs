using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Entities.Specification;
using Compass.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryService(IRepository<Category> categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetAll()
        {
            var result = await _categoryRepository.GetAll();
            var data = _mapper.Map<List<CategoryDto>>(result);
            return new ServiceResponse
            {
                Message = "All categories were loaded",
                Success = true,
                Payload = data
            };
        }

        public async Task<Category> GetById(object id)
        {
            return await _categoryRepository.GetByID(id);
        }

        public async Task<ServiceResponse> Create(CategoryDto model)
        {
            var spec = await _categoryRepository.GetListBySpec(new Categories.GetByName(model.Name));
            if (spec.Count() == 0)
            {
                await _categoryRepository.Insert(_mapper.Map<Category>(model));
                await _categoryRepository.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "A category was successfully created"
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "This category already exists"
                };
            }
        }
        public async Task<ServiceResponse> Delete(int id)
        {
            Category category = await _categoryRepository.GetByID(id);
            
            await _categoryRepository.Delete(category);
            await _categoryRepository.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "The category was successfully deleted"
            };
        }
        public async Task<ServiceResponse> Update(CategoryDto model)
        {
            await _categoryRepository.Update(_mapper.Map<Category>(model));
            await _categoryRepository.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "The category was successfully updated"
            };
        }
    }
}
