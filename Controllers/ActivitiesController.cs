using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;
using Matchmaker.Dtos;
using System.Security.Claims;
using Matchmaker.Data;

namespace Matchmaker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly MatchmakerContext _context;
        private readonly IAuthRepository _repo;
        public ActivitiesController(MatchmakerContext context, IAuthRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Activities
        [AllowAnonymous]
        [HttpGet]
        public async Task<List<ActivityDto>> GetActivities()
        {
            var activities = await _context.Activities.Select(a => new ActivityDto()
            {
                Id = a.ActivityId,
                Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = a.Gender,
                Price = a.Price,
                Users = a.RegisteredParticipants,
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
            }).ToListAsync();
            var orderedActivities = activities.OrderBy(activity => activity.Date).ToList();

            return orderedActivities;
        }

        // GET: api/Activities/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetActivity(string id)
        {
            var activity = await _context.Activities.Select(a => new ActivityDto()
            {
                Id = a.ActivityId,
                Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = a.Gender,
                Price = a.Price,
                Users = a.RegisteredParticipants,
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

            return Ok(activity);
        }
        [Authorize]
        [HttpGet("user")]
        public async Task<IEnumerable<ActivityDto>> GetUsersActivitiesAsync()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _repo.GetCurrentUser(email);

            var activities = await _context.Activities.Where(a => a.UserActivities.Any(u => u.UserId == user.UserId)).Select(a => new ActivityDto()
            {
                Id = a.ActivityId,
                Date = a.Date.Subtract(new DateTime(1970, 1, 1, 0, 0, 0)).TotalSeconds,
                Gender = a.Gender,
                Price = a.Price,
                Users = a.RegisteredParticipants,
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
            }).ToListAsync();
            var orderedActivities = activities.OrderBy(activity => activity.Date);

            return orderedActivities;
        }

        [Authorize]
        [HttpPost("register/{id}")]
        public async Task<IActionResult> RegisterToActivity(string id)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _repo.GetCurrentUser(email);
            var activity = await _context.Activities.FindAsync(id);
            
            if (activity is null)
            {
                return BadRequest();
            }
            if (activity.UserActivities is null)
            {
                activity.UserActivities = new List<UserActivity>();
            }

            activity.UserActivities.Add(new UserActivity { Activity = activity, User = user });
            activity.RegisteredParticipants++;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: api/Activities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(Roles = Role.Admin + "," + Role.SuperAdmin)]
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
        [Authorize(Roles = Role.Admin + "," + Role.SuperAdmin)]
        [HttpPost]
        public async Task<ActionResult<ActivityDto>> PostActivity(AddActivityDto addActivityDto)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _repo.GetCurrentUser(email);

            var activity = new Activity()
            {
                ActivityId = Guid.NewGuid().ToString(),
                Date = addActivityDto.Date,
                Gender = addActivityDto.Gender,
                Price = addActivityDto.Price,
                NumberOfParticipants = addActivityDto.NumberOfParticipants,
                RegisteredParticipants = 0,
                PlayerLevel = addActivityDto.PlayerLevel,
                PlaygroundId = addActivityDto.PlaygroundId,
                CategoryId = addActivityDto.CategoryId,
                AdminId = user.UserId
            };
            
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
                Users = activity.RegisteredParticipants,
                NumberOfParticipants = activity.NumberOfParticipants,
                PlayerLevel = activity.PlayerLevel,
                Playground = activity.Playground.NameOfPlace,
                SportsCenter = sportsCenterDto,
                Category = activity.Category.Name
            };
            return CreatedAtAction(nameof(GetActivity), new { id = activity.ActivityId }, activityDto);
        }

        // DELETE: api/Activities/5
        [Authorize(Roles = Role.Admin + "," + Role.SuperAdmin)]
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
