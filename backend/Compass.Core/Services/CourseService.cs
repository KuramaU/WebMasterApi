using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Entities.Specification;
using Compass.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Services
{
    public class CourseService : ICourseService
    {
        private readonly IRepository<Course> _courseRepository;
        private readonly IMapper _mapper;

        public CourseService(IRepository<Course> courseRepo, IMapper mapper)
        {
            _courseRepository = courseRepo;
            _mapper = mapper;
        }
        public async Task<ServiceResponse> GetAll()
        {
            var result = await _courseRepository.GetListBySpec(new Courses.GetAll());
            var data = _mapper.Map<List<CourseDto>>(result);
            return new ServiceResponse
            {
                Message = "All courses loaded were loaded",
                Success = true,
                Payload = data
            };
        }

        public async Task<CourseDto?> Get(int id)
        {
            if (id < 0)
                return null;
            var course = await _courseRepository.GetByID(id);
            return _mapper.Map<CourseDto>(course);
        }


        public async Task<ServiceResponse> GetByCategory(int id)
        {
            var result = await _courseRepository.GetListBySpec(new Courses.ByCategory(id));
            var data= _mapper.Map<List<CourseDto>>(result);
            return new ServiceResponse
            {
                Message = "All courses were loaded",
                Success = true,
                Payload = data
            };
        }

        public async Task<ServiceResponse> Create(CourseDto model)
        {
            var spec = await _courseRepository.GetListBySpec(new Courses.GetByTitle(model.Title));
            if (spec.Count() == 0)
            {
                await _courseRepository.Insert(_mapper.Map<Course>(model));
                await _courseRepository.Save();
                return new ServiceResponse
                {
                    Success = true,
                    Message = "A course was successfully created"
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "This course already exists"
                };
            }
        }
        public async Task<ServiceResponse> Delete(int id)
        {
            Course course = await _courseRepository.GetByID(id);
            await _courseRepository.Delete(course);
            await _courseRepository.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "The course was deleted"
            };
        }
        public async Task<ServiceResponse> Update(CourseDto model)
        {
            await _courseRepository.Update(_mapper.Map<Course>(model));
            await _courseRepository.Save();
            return new ServiceResponse
            {
                Success = true,
                Message = "The course was successfully updated"
            };
        }
    }
}
