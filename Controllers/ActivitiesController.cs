using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;
using Matchmaker.Dtos;
using Microsoft.AspNetCore.Cors;

namespace Matchmaker.Controllers
{
    [Route("api/[controller]")]
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
        public IEnumerable<ActivityDto> GetActivities()
        {
            var activities = from a in _context.Activities
                             select new ActivityDto()
                             {
                                 Id = a.ActivityId,
                                 Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                                 Gender = a.Gender,
                                 Price = a.Price,
                                 Users = a.UserActivities != null ? a.UserActivities.Count() : 0,
                                 NumberOfParticipants = a.NumberOfParticipants,
                                 PlayerLevel = a.PlayerLevel,
                                 Playground = a.Playground.NameOfPlace,
                                 SportsCenter = new SportsCenterDto()
                                 {
                                     Id = a.Playground.SportsCenter.SportsCenterId,
                                     Name = a.Playground.SportsCenter.Name,
                                     Address = a.Playground.SportsCenter.Address
                                 },
                                 Category = a.Category.Name
                             };
            var orderedActivities = activities.ToList().OrderBy(activity => activity.Date);

            return orderedActivities;
        }

        // GET: api/Activities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetActivity(string id)
        {
            var activity = await _context.Activities.Select(a => new ActivityDto()
            {
                Id = a.ActivityId,
                Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = a.Gender,
                Price = a.Price,
                Users = a.UserActivities != null ? a.UserActivities.Count() : 0,
                NumberOfParticipants = a.NumberOfParticipants,
                PlayerLevel = a.PlayerLevel,
                Playground = a.Playground.NameOfPlace,
                SportsCenter = new SportsCenterDto()
                {
                    Id = a.Playground.SportsCenter.SportsCenterId,
                    Name = a.Playground.SportsCenter.Name,
                    Address = a.Playground.SportsCenter.Address
                },
                Category = a.Category.Name
            }).SingleOrDefaultAsync(a => a.Id == id);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
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
        public async Task<ActionResult<ActivityDto>> PostActivity(Activity activity)
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

            var sportsCenterDto = new SportsCenterDto()
            {
                Id = activity.Playground.SportsCenter.SportsCenterId,
                Name = activity.Playground.SportsCenter.Name,
                Address = activity.Playground.SportsCenter.Address
            };

            var activityDto = new ActivityDto()
            {
                Id = activity.ActivityId,
                Date = activity.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = activity.Gender,
                Price = activity.Price,
                Users = activity.UserActivities != null ? activity.UserActivities.Count() : 0,
                NumberOfParticipants = activity.NumberOfParticipants,
                PlayerLevel = activity.PlayerLevel,
                Playground = activity.Playground.NameOfPlace,
                SportsCenter = sportsCenterDto,
                Category = activity.Category.Name
            };
            return CreatedAtAction(nameof(GetActivity), new { id = activity.ActivityId }, activityDto);
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
