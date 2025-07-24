using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
using vitalapi.Models;
namespace vitalapi.Services
{
    public class EspecialistaService
    {
        private readonly vitalcontext _context;
        private readonly IMapper _mapper;

        public EspecialistaService(vitalcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EspecialistaDto>> GetAllAsync()
        {
            var items = await _context.Especialistas.ToListAsync();
            return _mapper.Map<IEnumerable<EspecialistaDto>>(items);
        }

        public async Task<EspecialistaDto> GetByIdAsync(int id)
        {
            var item = await _context.Especialistas.FindAsync(id);
            return _mapper.Map<EspecialistaDto>(item);
        }

        public async Task<EspecialistaDto> CreateAsync(CreateEspecialistaDto dto)
        {
            var entity = _mapper.Map<Especialista>(dto);
            _context.Especialistas.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<EspecialistaDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateEspecialistaDto dto)
        {
            var entity = await _context.Especialistas.FindAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Especialistas.FindAsync(id);
            if (entity == null) return false;

            _context.Especialistas.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
