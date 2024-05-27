using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Zdravko_Distributed.Models.DTO;
using Zdravko_Distributed.Models.Entities;

namespace Zdravko_Distributed.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CustomerController : ControllerBase
	{
		private readonly ZapothecaryDBContext ctx;

		public CustomerController(ZapothecaryDBContext ctx)
		{
			this.ctx = ctx;
		}

		[HttpGet]
		public IActionResult GetAllCustomers()
		{
			var result = ctx.customers.ToList();
			return Ok(result);
		}

		[HttpGet]
		[Route("{id:int}")]
		public IActionResult GetCustomerById(int id)
		{
			var result = ctx.customers.Find(id);
			if (result == null)
			{
				return NotFound();
			}
			return Ok(result);
		}

		[HttpPost]
		public IActionResult AddCustomer(CustomerDTO customerDTO)
		{
			var customerEntity = new Customer()
			{
				CreatedOn = DateTime.Now,
				UpdatedOn = DateTime.Now,
				firstName = customerDTO.firstName,
				lastName = customerDTO.lastName,
				address = customerDTO.address,
				imgUrl = customerDTO.imgUrl,
				boughtCount = 0
			};
			ctx.customers.Add(customerEntity);
			ctx.SaveChanges();
			return Ok(customerEntity);
		}

		[HttpPut]
		[Route("{id:int}")]
		public IActionResult UpdateCustomer(int id, UpdateCustomerDTO updateCustomerDTO)
		{
			var customerEntity = ctx.customers.Find(id);
			if (customerEntity == null)
			{
				return NotFound();
			}
			customerEntity.firstName = updateCustomerDTO.firstName;
			customerEntity.lastName = updateCustomerDTO.lastName;
			customerEntity.address = updateCustomerDTO.address;
			customerEntity.imgUrl = updateCustomerDTO.imgUrl;
			customerEntity.UpdatedOn = DateTime.Now;

			ctx.SaveChanges();
			return Ok(customerEntity);
		}

		[HttpDelete]
		[Route("{id:int}")]
		public IActionResult DeleteCustomer(int id)
		{
			var result = ctx.customers.Find(id);
			if (result is null)
			{
				return NotFound();
			}
			ctx.customers.Remove(result);
			ctx.SaveChanges();
			return Ok("Deleted");
		}
	}
}
