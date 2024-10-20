﻿using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyFlow.Infrastructure.Interfaces
{
    public interface IStorageService
    {
        Task ConfigureBlobStorage(IServiceCollection services);

        Task<bool> UploadAsync(string base64String, string blobName);

        Task<string> DownloadAsync(string blobName);

        Task<bool> DeleteAsync(string blobname);
    }
}