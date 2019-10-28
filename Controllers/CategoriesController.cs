using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Matchmaker.Models;
using Microsoft.AspNetCore.Cors;

namespace Matchmaker.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("_myAllowAllOrigins")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MatchmakerContext _context;

        public CategoriesController(MatchmakerContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public IQueryable<CategoryDTO> GetCategories()
        {
            var categories = from c in _context.Categories
                             select new CategoryDTO()
                             {
                                 Id = c.CategoryId,
                                 Name = c.Name
                             };
            return categories;
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(string id)
        {
            var category = await _context.Categories.Select(c => new CategoryDTO()
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
        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> PostCategory(Category category)
        {
            category.CategoryId = Guid.NewGuid().ToString();
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var categoryDTO = new CategoryDTO()
            {
                Id = category.CategoryId,
                Name = category.Name
            };

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, categoryDTO);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
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
