using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;
using Matchmaker.Dtos;

namespace Matchmaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsCentersController : ControllerBase
    {
        private readonly MatchmakerContext _context;

        public SportsCentersController(MatchmakerContext context)
        {
            _context = context;
        }

        // GET: api/SportsCenters
        [HttpGet]
        public IQueryable<SportsCenterDto> GetSportsCenters()
        {
            var sportsCenters = from s in _context.SportsCenters
                             select new SportsCenterDto()
                             {
                                 Id = s.SportsCenterId,
                                 Name = s.Name,
                                 Address = s.Address
                             };
            return sportsCenters;
        }

        // GET: api/SportsCenters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SportsCenterDto>> GetSportsCenter(string id)
        {
            var sportsCenter = await _context.SportsCenters.Select(s => new SportsCenterDto()
            {
                Id = s.SportsCenterId,
                Name = s.Name,
                Address = s.Address
            }).SingleOrDefaultAsync(s => s.Id == id);

            if (sportsCenter == null)
            {
                return NotFound();
            }

            return sportsCenter;
        }

        // PUT: api/SportsCenters/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSportsCenter(string id, SportsCenter sportsCenter)
        {
            if (id != sportsCenter.SportsCenterId)
            {
                return BadRequest();
            }

            _context.Entry(sportsCenter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SportsCenterExists(id))
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

        // POST: api/SportsCenters
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SportsCenterDto>> PostSportsCenter(SportsCenter sportsCenter)
        {
            sportsCenter.SportsCenterId = Guid.NewGuid().ToString();
            _context.SportsCenters.Add(sportsCenter);
            await _context.SaveChangesAsync();

            var sportsCenterDto = new SportsCenterDto()
            {
                Id = sportsCenter.SportsCenterId,
                Name = sportsCenter.Name,
                Address = sportsCenter.Address
            };

            return CreatedAtAction("GetSportsCenter", new { id = sportsCenter.SportsCenterId }, sportsCenterDto);
        }

        // DELETE: api/SportsCenters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SportsCenter>> DeleteSportsCenter(string id)
        {
            var sportsCenter = await _context.SportsCenters.FindAsync(id);
            if (sportsCenter == null)
            {
                return NotFound();
            }

            _context.SportsCenters.Remove(sportsCenter);
            await _context.SaveChangesAsync();

            return sportsCenter;
        }

        private bool SportsCenterExists(string id)
        {
            return _context.SportsCenters.Any(e => e.SportsCenterId == id);
        }
    }
}
