using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
namespace vitalapi.Services
{
    public class PlanoService
    {
        private readonly vitalcontext _context;
        private readonly IMapper _mapper;

        public PlanoService(vitalcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PlanoDto>> GetAllAsync()
        {
            var items = await _context.Planos.ToListAsync();
            return _mapper.Map<IEnumerable<PlanoDto>>(items);
        }

        public async Task<PlanoDto> GetByIdAsync(int id)
        {
            var item = await _context.Planos.FindAsync(id);
            return _mapper.Map<PlanoDto>(item);
        }

        public async Task<PlanoDto> CreateAsync(CreatePlanoDto dto)
        {
            var entity = _mapper.Map<PlanoDto>(dto);
            _context.Planos.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<PlanoDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdatePlanoDto dto)
        {
            var entity = await _context.Planos.FindAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Planos.FindAsync(id);
            if (entity == null) return false;

            _context.Planos.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
