using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Zdravko_Distributed.Models.DTO;
using Zdravko_Distributed.Models.Entities;

namespace Zdravko_Distributed.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DrugController: ControllerBase
	{
		private readonly ZapothecaryDBContext ctx;

		public DrugController(ZapothecaryDBContext ctx)
		{
			this.ctx = ctx;
		}

		[HttpGet]
		public IActionResult GetAllDrugs()
		{
			var result = ctx.drugs.ToList();
			return Ok(result);
		}


		[HttpGet]
		[Route("{id:int}")]
		public IActionResult GetDrugById(int id)
		{
			var result = ctx.drugs.Find(id);
			if (result == null)
			{
				return NotFound();
			}
			return Ok(result);
		}

		[HttpPost]
		public IActionResult AddDrug(DrugDTO drugITO)
		{
			var drugEntity = new Drug()
			{
				CreatedOn = DateTime.Now,
				UpdatedOn = DateTime.Now,
				name = drugITO.name,
				price = drugITO.price,
				imgUrl = drugITO.imgUrl,
				boughtTimes = 0
			};
			ctx.drugs.Add(drugEntity);
			ctx.SaveChanges();
			return Ok(drugEntity);
		}

		[HttpPut]
		[Route("{id:int}")]
		public IActionResult UpdateDrug(int id, UpdateDrugDTO updateDrugDTO)
		{
			var drugEntity = ctx.drugs.Find(id);
			if (drugEntity == null)
			{
				return NotFound();
			}
			drugEntity.name = updateDrugDTO.name;
			drugEntity.price = updateDrugDTO.price;
			drugEntity.imgUrl = updateDrugDTO.imgUrl;
			drugEntity.UpdatedOn = DateTime.Now;

			ctx.SaveChanges();
			return Ok(drugEntity);
		}

		[HttpDelete]
		[Route("{id:int}")]
		public IActionResult DeleteDrug(int id)
		{
			var drugEntity = ctx.drugs.Find(id);
			if (drugEntity is null)
			{
				return NotFound();
			}
			ctx.drugs.Remove(drugEntity);
			ctx.SaveChanges();
			return Ok("Deleted");
		}


		[HttpPost]
		[Route("buy")]
		public IActionResult BuyDrug(BuyDrugDTO buyDrugDTO)
		{
			var drugEntity = ctx.drugs.Find(buyDrugDTO.drugID);
			var apothecaryEntity = ctx.apothecaries.Find(buyDrugDTO.apothecaryID);
			var customerEntity = ctx.customers.Find(buyDrugDTO.customerID);

			if (drugEntity is null || apothecaryEntity is null || customerEntity is null)
			{
				return NotFound();
			}

			drugEntity.boughtTimes += buyDrugDTO.amount;
			apothecaryEntity.soldCount += buyDrugDTO.amount;
			customerEntity.boughtCount += buyDrugDTO.amount;
			ctx.SaveChanges();
			return Ok("Bought");
		}
	}
}
