namespace vitalapi.Services;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.DTO_S;
using vitalapi.Models;




public class AgendamentoService
{
    private readonly vitalcontext _context;
    private readonly IMapper _mapper;

    public AgendamentoService(vitalcontext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AgendamentoDto>> GetAllAsync()
    {
        var items = await _context.Agendamentos.ToListAsync();
        return _mapper.Map<IEnumerable<AgendamentoDto>>(items);
    }

    public async Task<AgendamentoDto> GetByIdAsync(int id)
    {
        var item = await _context.Agendamentos.FindAsync(id);
        return _mapper.Map<AgendamentoDto>(item);
    }

    public async Task<AgendamentoDto> CreateAsync(CreateAgendamentoDto dto)
    {
        var entity = _mapper.Map<Agendamento>(dto);
        _context.Agendamentos.Add(entity);
        await _context.SaveChangesAsync();
        return _mapper.Map<AgendamentoDto>(entity);
    }

    public async Task<bool> UpdateAsync(int id, UpdateAgendamentoDto dto)
    {
        var entity = await _context.Agendamentos.FindAsync(id);
        if (entity == null) return false;

        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _context.Agendamentos.FindAsync(id);
        if (entity == null) return false;

        _context.Agendamentos.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }
}
