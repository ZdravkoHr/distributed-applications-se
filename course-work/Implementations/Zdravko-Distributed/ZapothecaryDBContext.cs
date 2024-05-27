using Microsoft.EntityFrameworkCore;
using Zdravko_Distributed.Models.Entities;

namespace Zdravko_Distributed
{
	public class ZapothecaryDBContext : DbContext
	{
		public ZapothecaryDBContext(DbContextOptions<ZapothecaryDBContext> options) : base(options)
		{
		}

		public DbSet<Apothecary> apothecaries { get; set; }
		public DbSet<Customer> customers { get; set; }
		public DbSet<Drug> drugs { get; set; }
	}
}
