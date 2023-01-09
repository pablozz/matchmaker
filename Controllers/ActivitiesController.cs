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
            var activities = await _context.Activities.Where(a => a.Date > DateTime.Now)
                .Select(a => ActivityDto.FromActivity(a))
                .OrderBy(activity => activity.Date)
                .ToListAsync();

            return activities;
        }

        // GET: api/Activities/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetActivity(string id)
        {
            var activity = await _context.Activities.Select(a => ActivityDto.FromActivity(a))
                .SingleOrDefaultAsync(a => a.Id == id);

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

            var activities = await _context.Activities.Where(a =>
                    a.UserActivities.Any(u => u.UserId == user.UserId) && a.Date >= DateTime.Now)
                .Select(a => ActivityDto.FromActivity(a))
                .OrderBy(activity => activity.Date)
                .ToListAsync();

            return activities;
        }
        [Authorize]
        [HttpGet("created")]
        public async Task<IEnumerable<ActivityDto>> GetCreatedActivities()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _repo.GetCurrentUser(email);

            var activities = await _context.Activities.Where(a => a.AdminId == user.UserId && a.Date >= DateTime.Now)
                .Select(a => ActivityDto.FromActivity(a))
                .OrderBy(activity => activity.Date)
                .ToListAsync();

            return activities;
        } 

        [Authorize]
        [HttpGet("user/history")]
        public async Task<IEnumerable<ActivityDto>> GetUserActivitiesHistory()
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            var user = await _repo.GetCurrentUser(email);
            var activities = await _context.Activities.Where(a =>
                    a.UserActivities.Any(u => u.UserId == user.UserId) && a.Date < DateTime.Now)
                .Select(a => ActivityDto.FromActivity(a))
                .OrderBy(activity => activity.Date)
                .ToListAsync();

            return activities;
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
            if (activity.RegisteredParticipants >= activity.NumberOfParticipants)
            {
                return Forbid();
            }

            if (activity.UserActivities is null)
            {
                activity.UserActivities = new List<UserActivity>();
            }


            bool alreadyRegistered = activity.UserActivities.Any(ua => ua.UserId == user.UserId && ua.ActivityId == id);

            if (alreadyRegistered) return StatusCode(403, "User is already registered to this activity");
            activity.UserActivities.Add(new UserActivity { Activity = activity, User = user });
            activity.RegisteredParticipants++;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("unregister/{id}")]
        public async Task<IActionResult> UnregisterFromActivity(string id)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _repo.GetCurrentUser(email);

            var activity = await _context.Activities.Include(a => a.UserActivities).SingleAsync(a => a.ActivityId == id);
            if (activity is null)
            {
                return BadRequest("Activity with such an id does not exist.");
            }
            bool alreadyRegistered = activity.UserActivities.Any(ua => ua.UserId == user.UserId && ua.ActivityId == id);

            if (!alreadyRegistered) return BadRequest("User is not registered to this activity");
            
            user.UserActivities.Remove(activity.UserActivities.Single(ua => ua.UserId == user.UserId));
            activity.RegisteredParticipants--;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: api/Activities/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(string id, UpdateActivityDto updatedActivity)
        {
            if (id != updatedActivity.ActivityId)
            {
                return BadRequest();
            }
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var activity = await _context.Activities.FindAsync(id);

            if (activity.RegisteredParticipants > 0 || activity.AdminId != userId)
            {
                return StatusCode(403);
            }

            activity.Date = updatedActivity.Date;
            activity.Gender = updatedActivity.Gender;
            activity.Price = updatedActivity.Price;
            activity.NumberOfParticipants = updatedActivity.NumberOfParticipants;
            activity.PlayerLevel = updatedActivity.PlayerLevel;

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

                throw;
            }

            return NoContent();
        }

        // POST: api/Activities
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ActivityDto>> PostActivity(AddActivityDto addActivityDto)
        {
            var email = HttpContext.User.FindFirstValue(ClaimTypes.Email);

            var user = await _repo.GetCurrentUser(email);

            if(!_context.Playgrounds.Any(p => p.PlaygroundId == addActivityDto.PlaygroundId))
            {
                return BadRequest("Playground with specified ID not found");
            }
            if (!_context.Categories.Any(c => c.CategoryId == addActivityDto.CategoryId))
            {
                return BadRequest("Category with specified ID not found");
            }
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

            var activityDto = ActivityDto.FromActivity(activity);
            return CreatedAtAction(nameof(GetActivity), new { id = activity.ActivityId }, activityDto);
        }

        // DELETE: api/Activities/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Activity>> DeleteActivity(string id)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }
            if (activity.RegisteredParticipants > 0 || userId != activity.AdminId)
            {
                return StatusCode(403);
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
