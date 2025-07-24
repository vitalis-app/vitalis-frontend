using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
using vitalapi.Models;
namespace vitalapi.Services
{
    public class DisponibilidadeService
    {
        private readonly vitalcontext _context;
        private readonly IMapper _mapper;

        public DisponibilidadeService(vitalcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DisponibilidadeDto>> GetAllAsync()
        {
            var items = await _context.Disponibilidades.ToListAsync();
            return _mapper.Map<IEnumerable<DisponibilidadeDto>>(items);
        }

        public async Task<DisponibilidadeDto> GetByIdAsync(int id)
        {
            var item = await _context.Disponibilidades.FindAsync(id);
            return _mapper.Map<DisponibilidadeDto>(item);
        }

        public async Task<DisponibilidadeDto> CreateAsync(CreateDisponibilidadeDto dto)
        {
            var entity = _mapper.Map<Disponibilidade>(dto);
            _context.Disponibilidades.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DisponibilidadeDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateDisponibilidadeDto dto)
        {
            var entity = await _context.Disponibilidades.FindAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Disponibilidades.FindAsync(id);
            if (entity == null) return false;

            _context.Disponibilidades.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
