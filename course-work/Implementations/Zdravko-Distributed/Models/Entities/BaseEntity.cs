namespace Zdravko_Distributed.Models.Entities
{
	public class BaseEntity
	{
		public int Id { get; set; }

		public string imgUrl { get; set; }
		public DateTime? CreatedOn { get; set; }
		public DateTime? UpdatedOn { get; set; }
	}
}
