using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vitalapi.Context;
using vitalapi.Models;

namespace vitalapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private readonly vitalcontext _context;

        public EnderecoController(vitalcontext context)
        {
            _context = context;
        }

        // GET: api/disponibilidade
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Endereco>>> GetEnderecos()
        {
            return await _context.Enderecos.ToListAsync();
        }

        // GET: api/disponibilidade/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Endereco>> GetEnderecos(int id)
        {
            var endereco = await _context.Enderecos.FindAsync(id);

            if (endereco == null)
            {
                return NotFound();
            }

            return endereco;
        }

        // POST: api/disponibilidade
        [HttpPost]
        public async Task<ActionResult<Endereco>> PostEndereco(Endereco endereco)
        {
            _context.Enderecos.Add(endereco);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEnderecos), new { id = endereco.Id }, endereco);
        }

        // PUT: api/disponibilidade/5   
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnderecos(int id, Endereco endereco)
        {
            if (id != endereco.Id)
            {
                return BadRequest();
            }

            _context.Entry(endereco).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnderecoExists(id))
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
        public async Task<IActionResult> DeleteEndereco(int id)
        {
            var endereco = await _context.Enderecos.FindAsync(id);
            if (endereco == null)
            {
                return NotFound();
            }

            _context.Enderecos.Remove(endereco);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EnderecoExists(int id)
        {
            return _context.Enderecos.Any(e => e.Id == id);
        }
    }
}
