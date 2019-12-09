using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;
using Matchmaker.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Matchmaker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MatchmakerContext _context;

        public CategoriesController(MatchmakerContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [AllowAnonymous]
        [HttpGet]
        public Task<List<CategoryDto>> GetCategories()
        {
            var categories = _context.Categories.Select(c => new CategoryDto()
            {
                Id = c.CategoryId,
                Name = c.Name
            }).ToListAsync();
                             
            return categories;
        }

        // GET: api/Categories/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(string id)
        {
            var category = await _context.Categories.Select(c => new CategoryDto()
            {
                Id = c.CategoryId,
                Name = c.Name
            }).SingleOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(Roles = Role.Admin + "," + Role.SuperAdmin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(string id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(Roles = Role.Admin + "," + Role.SuperAdmin)]
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> PostCategory(Category category)
        {
            category.CategoryId = Guid.NewGuid().ToString();
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var categoryDto = new CategoryDto()
            {
                Id = category.CategoryId,
                Name = category.Name
            };

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, categoryDto);
        }

        // DELETE: api/Categories/5
        [Authorize(Roles = Role.Admin + "," + Role.SuperAdmin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(string id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }

        private bool CategoryExists(string id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
