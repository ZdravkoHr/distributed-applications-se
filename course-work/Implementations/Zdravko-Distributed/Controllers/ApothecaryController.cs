using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Zdravko_Distributed.Models.DTO;
using Zdravko_Distributed.Models.Entities;

namespace Zdravko_Distributed.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ApothecaryController : ControllerBase
	{
		private readonly ZapothecaryDBContext ctx;

		public ApothecaryController(ZapothecaryDBContext ctx)
		{
			this.ctx = ctx;
		}

		[HttpGet]
		public IActionResult GetAllApothecaries()
		{
			var result = ctx.apothecaries.ToList();
			return Ok(result);
		}

		[HttpGet]
		[Route("{id:int}")]
		public IActionResult GetApothecaryById(int id)
		{
			var result = ctx.apothecaries.Find(id);
			if (result == null)
			{
				return NotFound();
			}
			return Ok(result);
		}

		[HttpPost]
		public IActionResult AddApothecary(ApothecaryDTO apothecaryDTO)
		{
			var apothecaryEntity = new Apothecary()
			{
				CreatedOn = DateTime.Now,
				UpdatedOn = DateTime.Now,
				firstName = apothecaryDTO.firstName,
				lastName = apothecaryDTO.lastName,
				startDate = apothecaryDTO.startDate,
				imgUrl = apothecaryDTO.imgUrl,
				soldCount = 0
			};
			ctx.apothecaries.Add(apothecaryEntity);
			ctx.SaveChanges();
			return Ok(apothecaryEntity);
		}

		[HttpPut]
		[Route("{id:int}")]
		public IActionResult UpdateApothecary(int id, UpdateApothecaryDTO updateApothecaryDTO)
		{
			var apothecaryEntity = ctx.apothecaries.Find(id);
			if (apothecaryEntity == null)
			{
				return NotFound();
			}
			apothecaryEntity.firstName = updateApothecaryDTO.firstName;
			apothecaryEntity.lastName = updateApothecaryDTO.lastName;
			apothecaryEntity.imgUrl = updateApothecaryDTO.imgUrl;
			apothecaryEntity.UpdatedOn = DateTime.Now;

			ctx.SaveChanges();
			return Ok(apothecaryEntity);
		}

		[HttpDelete]
		[Route("{id:int}")]
		public IActionResult DeleteApothecary(int id)
		{
			var result = ctx.apothecaries.Find(id);
			if (result is null)
			{
				return NotFound();
			}
			ctx.apothecaries.Remove(result);
			ctx.SaveChanges();
			return Ok("Deleted");
		}
	}
}
