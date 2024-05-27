namespace Zdravko_Distributed.Models.Entities
{
		public class Drug : BaseEntity
		{
			public required string name { get; set; }
			public required double price { get; set; }

		    public int boughtTimes { get; set; }
		}
}
