namespace Zdravko_Distributed.Models.DTO
{
	public class BuyDrugDTO
	{
		public required int drugID { get; set; }
		public required int apothecaryID { get; set; }
		public required int customerID { get; set; }

		public required int amount { get; set; }
	}
}
