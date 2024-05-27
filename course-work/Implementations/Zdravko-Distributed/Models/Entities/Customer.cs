namespace Zdravko_Distributed.Models.Entities
{
	public class Customer:BaseEntity
	{
		public required string firstName { get; set; }
		public required string lastName { get; set; }
		public string address { get; set; }

		public int boughtCount { get; set; }
	}
}
