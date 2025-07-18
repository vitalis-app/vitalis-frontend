using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.Models;

namespace vitalapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentoController : ControllerBase
    {
        private readonly vitalcontext _context;

        public AgendamentoController(vitalcontext vitalcontext)
        {
            _context = vitalcontext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agendamento>>> GetAgendamento()
        {
            return await _context.Agendamentos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Agendamento>> GetAgendamento(int id)
        {
            var agendamento = await _context.Agendamentos.FindAsync(id);

            if (agendamento == null)
            {
                return NotFound();
            }

            return agendamento;
        }
        [HttpPost]
        public async Task<ActionResult<Agendamento>> Postagendamento(Agendamento agendamento)
        {
            _context.Agendamentos.Add(agendamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAgendamento), new { id = agendamento.ID }, agendamento);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssinatura(int id, Agendamento agendamento)
        {
            if (id != agendamento.ID)
            {
                return BadRequest();
            }

            _context.Entry(agendamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgendamentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgendamento(int id)
        {
            var agendamento = await _context.Assinaturas.FindAsync(id);
            if (agendamento == null)
            {
                return NotFound();
            }

            _context.Agendamentos.Remove(agendamento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AgendamentosExists(int id)
        {
            return _context.Agendamentos.Any(e => e.ID == id);
        }

    }
}
