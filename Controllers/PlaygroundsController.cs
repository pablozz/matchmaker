using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;

namespace Matchmaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaygroundsController : ControllerBase
    {
        private readonly MatchmakerContext _context;

        public PlaygroundsController(MatchmakerContext context)
        {
            _context = context;
        }

        // GET: api/Playgrounds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Playground>>> GetPlaygrounds()
        {
            return await _context.Playgrounds.ToListAsync();
        }

        // GET: api/Playgrounds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Playground>> GetPlayground(int id)
        {
            var playground = await _context.Playgrounds.FindAsync(id);

            if (playground == null)
            {
                return NotFound();
            }

            return playground;
        }

        // PUT: api/Playgrounds/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayground(int id, Playground playground)
        {
            if (id != playground.PlaygroundId)
            {
                return BadRequest();
            }

            _context.Entry(playground).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaygroundExists(id))
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

        // POST: api/Playgrounds
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Playground>> PostPlayground(Playground playground)
        {
            _context.Playgrounds.Add(playground);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayground", new { id = playground.PlaygroundId }, playground);
        }

        // DELETE: api/Playgrounds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Playground>> DeletePlayground(int id)
        {
            var playground = await _context.Playgrounds.FindAsync(id);
            if (playground == null)
            {
                return NotFound();
            }

            _context.Playgrounds.Remove(playground);
            await _context.SaveChangesAsync();

            return playground;
        }

        private bool PlaygroundExists(int id)
        {
            return _context.Playgrounds.Any(e => e.PlaygroundId == id);
        }
    }
}
