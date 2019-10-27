using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;
using Microsoft.AspNetCore.Cors;


namespace Matchmaker.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("_myAllowAllOrigins")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly MatchmakerContext _context;

        public ActivitiesController(MatchmakerContext context)
        {
            _context = context;
        }

        // GET: api/Activities
        [HttpGet]
        public IQueryable<ActivityDTO> GetActivities()
        {
            var activities = from a in _context.Activities
                             select new ActivityDTO()
                             {
                                 Id = a.ActivityId,
                                 Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                                 Gender = a.Gender,
                                 Price = a.Price,
                                 Users = a.Users.Count(),
                                 NumberOfParticipants = a.NumberOfParticipants,
                                 PlayerLevel = a.PlayerLevel,
                                 Playground = a.Playground.NameOfPlace,
                                 SportsCenter = new SportsCenterDTO()
                                 {
                                     Name = a.Playground.SportsCenter.Name,
                                     Address = a.Playground.SportsCenter.Address
                                 },
                                 Category = a.Category.Name
                             };
            return activities;
        }

        // GET: api/Activities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            var activity = await _context.Activities.Select(a => new ActivityDTO()
            {
                Id = a.ActivityId,
                Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = a.Gender,
                Price = a.Price,
                Users = a.Users.Count(),
                NumberOfParticipants = a.NumberOfParticipants,
                PlayerLevel = a.PlayerLevel,
                Playground = a.Playground.NameOfPlace,
                SportsCenter = new SportsCenterDTO()
                {
                    Name = a.Playground.SportsCenter.Name,
                    Address = a.Playground.SportsCenter.Address
                },
                Category = a.Category.Name
            }).SingleOrDefaultAsync(a => a.Id == id);

            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        // PUT: api/Activities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(string id, Activity activity)
        {
            if (id != activity.ActivityId)
            {
                return BadRequest();
            }

            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
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

        // POST: api/Activities
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(Activity activity)
        {
            activity.ActivityId = Guid.NewGuid().ToString();
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            _context.Entry(activity)
              .Reference(a => a.Playground)
              .Query()
              .Include(p => p.SportsCenter)
              .Load();
            _context.Entry(activity).Reference(a => a.Category).Load();

            var sportsCenterDTO = new SportsCenterDTO()
            {
                Name = activity.Playground.SportsCenter.Name,
                Address = activity.Playground.SportsCenter.Address
            };

            var activityDTO = new ActivityDTO()
            {
                Id = activity.ActivityId,
                Date = activity.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = activity.Gender,
                Price = activity.Price,
                Users = activity.Users != null ? activity.Users.Count() : 0,
                NumberOfParticipants = activity.NumberOfParticipants,
                PlayerLevel = activity.PlayerLevel,
                Playground = activity.Playground.NameOfPlace,
                SportsCenter = sportsCenterDTO,
                Category = activity.Category.Name
            };
            return CreatedAtAction(nameof(GetActivity), new { id = activity.ActivityId }, activityDTO);
        }

        // DELETE: api/Activities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Activity>> DeleteActivity(string id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return activity;
        }

        private bool ActivityExists(string id)
        {
            return _context.Activities.Any(e => e.ActivityId == id);
        }
    }
}
