using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context ;
using vitalapi.Models;

namespace vitalapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisponibilidadeController : ControllerBase
    {
        private readonly vitalcontext _context;

        public DisponibilidadeController(vitalcontext context)
        {
            _context = context;
        }

        // GET: api/disponibilidade
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Disponibilidade>>> GetDisponibilidades()
        {
            return await _context.Disponibilidades.ToListAsync();
        }

        // GET: api/disponibilidade/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Disponibilidade>> GetDisponibilidade(int id)
        {
            var disponibilidade = await _context.Disponibilidades.FindAsync(id);
                
            if (disponibilidade == null)
            {
                return NotFound();
            }

            return disponibilidade;
        }

        // POST: api/disponibilidade
            [HttpPost]
            public async Task<ActionResult<Disponibilidade>> PostDisponibilidade(Disponibilidade disponibilidade)
            {
                _context.Disponibilidades.Add(disponibilidade);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetDisponibilidade), new { id = disponibilidade.Id }, disponibilidade);
            }

        // PUT: api/disponibilidade/5   
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDisponibilidade(int id, Disponibilidade disponibilidade)
        {
            if (id != disponibilidade.Id)
            {
                return BadRequest();
            }

            _context.Entry(disponibilidade).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DisponibilidadeExists(id))
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

        // DELETE: api/disponibilidade/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDisponibilidade(int id)
        {
            var disponibilidade = await _context.Disponibilidades.FindAsync(id);
            if (disponibilidade == null)
            {
                return NotFound();
            }

            _context.Disponibilidades.Remove(disponibilidade);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DisponibilidadeExists(int id)
        {
            return _context.Disponibilidades.Any(e => e.Id == id);
        }
    }
}
