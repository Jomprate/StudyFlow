﻿using System.ComponentModel.DataAnnotations;

namespace StudyFlow.DAL.Entities
{
    public class Announce : EntityAuditBase
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string HtmlContent { get; set; } = null!;

        public string? ProfilePicture { get; set; }

        public List<string> YouTubeVideos { get; set; } = new List<string>();

        public List<string> GoogleDriveLinks { get; set; } = new List<string>();

        public List<string> AlternateLinks { get; set; } = new List<string>();

        public Guid CourseId { get; set; }

        public Course Course { get; set; } = null!;

        public Guid UserId { get; set; }

        public User User { get; set; } = null!;

        public bool IsDeleted { get; set; } = false;
    }
}