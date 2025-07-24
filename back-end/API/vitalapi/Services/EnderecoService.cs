using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
using vitalapi.Models;
namespace vitalapi.Services
{
    public class EnderecoService
    {
        private readonly vitalcontext _context;
        private readonly IMapper _mapper;

        public EnderecoService(vitalcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EnderecoDto>> GetAllAsync()
        {
            var items = await _context.Enderecos.ToListAsync();
            return _mapper.Map<IEnumerable<EnderecoDto>>(items);
        }

        public async Task<EnderecoDto> GetByIdAsync(int id)
        {
            var item = await _context.Enderecos.FindAsync(id);
            return _mapper.Map<EnderecoDto>(item);
        }

        public async Task<EnderecoDto> CreateAsync(CreateEnderecoDto dto)
        {
            var entity = _mapper.Map<Endereco>(dto);
            _context.Enderecos.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<EnderecoDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateEnderecoDto dto)
        {
            var entity = await _context.Enderecos.FindAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Enderecos.FindAsync(id);
            if (entity == null) return false;

            _context.Enderecos.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
