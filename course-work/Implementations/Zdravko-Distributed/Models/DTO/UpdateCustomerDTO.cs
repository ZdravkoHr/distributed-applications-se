namespace Zdravko_Distributed.Models.DTO
{
	public class UpdateCustomerDTO
	{
		public required string firstName { get; set; }
		public required string lastName { get; set; }
		public string address { get; set; }

		public string imgUrl { get; set; }
	}
}
