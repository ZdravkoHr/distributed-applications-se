namespace Zdravko_Distributed.Models.Entities
{
	public class Apothecary:BaseEntity
	{
		public required string firstName { get; set; }
		public required string lastName { get; set; }

	    public DateTime startDate { get; set; }
		public int soldCount { get; set; }
	}
}
