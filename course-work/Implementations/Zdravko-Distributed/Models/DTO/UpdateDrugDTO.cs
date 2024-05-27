namespace Zdravko_Distributed.Models.DTO
{
	public class UpdateDrugDTO
	{
		public required string name { get; set; }
		public required double price { get; set; }

		public string imgUrl { get; set; }
	}
}
