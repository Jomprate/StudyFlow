namespace StudyFlow.DAL.Entities
{
    public class EntityAuditBase
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public virtual void OnAuditEntity()
        {
            if (CreatedAt == DateTime.MinValue)
            {
                CreatedAt = DateTime.Now;
            }

            UpdatedAt = DateTime.Now;
        }
    }
}