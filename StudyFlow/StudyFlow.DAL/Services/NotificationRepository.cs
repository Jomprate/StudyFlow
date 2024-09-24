﻿using Microsoft.EntityFrameworkCore;
using StudyFlow.DAL.Data;
using StudyFlow.DAL.Entities;
using StudyFlow.DAL.Entities.Helper;
using StudyFlow.DAL.Enumeration;
using StudyFlow.DAL.Interfaces;

namespace StudyFlow.DAL.Services
{
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        private readonly DataContext _dataContext;

        public NotificationRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Notification>> GetNotificationByIdAsync(Guid id)
        {
            return await _dataContext.Notifications
                .Where(u => u.Id == id)
                .ToArrayAsync();
        }
    }
}