using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
using vitalapi.Models;
namespace vitalapi.Services
{
    public class AssinaturaService
    {
        private readonly vitalcontext _context;
        private readonly IMapper _mapper;

        public AssinaturaService(vitalcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AssinaturaDto>> GetAllAsync()
        {
            var items = await _context.Assinaturas.ToListAsync();
            return _mapper.Map<IEnumerable<AssinaturaDto>>(items);
        }

        public async Task<AssinaturaDto> GetByIdAsync(int id)
        {
            var item = await _context.Assinaturas.FindAsync(id);
            return _mapper.Map<AssinaturaDto>(item);
        }

        public async Task<AssinaturaDto> CreateAsync(CreateAssinaturaDto dto)
        {
            var entity = _mapper.Map<Assinatura>(dto);
            _context.Assinaturas.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<AssinaturaDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateAssinaturaDto dto)
        {
            var entity = await _context.Assinaturas.FindAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Assinaturas.FindAsync(id);
            if (entity == null) return false;

            _context.Assinaturas.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
