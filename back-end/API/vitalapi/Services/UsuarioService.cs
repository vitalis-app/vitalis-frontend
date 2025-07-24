using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
using vitalapi.Models;
namespace vitalapi.Services
{
    public class UsuarioService
    {
        private readonly vitalcontext _context;
        private readonly IMapper _mapper;

        public UsuarioService(vitalcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UsuarioDto>> GetAllAsync()
        {
            var items = await _context.Usuarios.ToListAsync();
            return _mapper.Map<IEnumerable<UsuarioDto>>(items);
        }

        public async Task<UsuarioDto> GetByIdAsync(int id)
        {
            var item = await _context.Usuarios.FindAsync(id);
            return _mapper.Map<UsuarioDto>(item);
        }

        public async Task<UsuarioDto> CreateAsync(CreateUsuarioDto dto)
        {
            var entity = _mapper.Map<Usuario>(dto);
            _context.Usuarios.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<UsuarioDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateUsuarioDto dto)
        {
            var entity = await _context.Usuarios.FindAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Usuarios.FindAsync(id);
            if (entity == null) return false;

            _context.Usuarios.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
