using StudyFlow.BLL.DTOS.Announce;
using StudyFlow.DAL.Entities.Helper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudyFlow.BLL.Interfaces
{
    public interface IAnnounceService
    {
        // Obtener todos los anuncios con paginación
        Task<PaginationResult<GetAnnounceDTO>> GetAllAnnouncesAsync(Pagination pagination);

        // Obtener todos los anuncios sin paginación
        Task<IEnumerable<GetAnnounceDTO>> GetAllAnnouncesAsync();

        // Obtener anuncios por UserId con paginación
        Task<PaginationResult<GetAnnounceDTO>> GetAnnouncesByUserIdAsync(Guid userId, Pagination pagination);

        // Obtener un anuncio específico con detalles por ID
        Task<GetAnnounceDTO> GetAnnounceWithDetailsAsync(Guid id);

        // Obtener anuncios que contienen enlaces a YouTube
        Task<IEnumerable<GetAnnounceDTO>> GetAnnouncesWithYouTubeVideosAsync();

        // Obtener anuncios que contienen enlaces a Google Drive
        Task<IEnumerable<GetAnnounceDTO>> GetAnnouncesWithGoogleDriveLinksAsync();

        // Crear un nuevo anuncio
        Task<Guid> CreateAnnounceAsync(AddAnnounceDTO announceDTO);

        // Actualizar un anuncio existente
        Task<bool> UpdateAnnounceAsync(Guid id, AddAnnounceDTO announceDTO);

        // Eliminar un anuncio por ID
        Task<bool> DeleteAnnounceAsync(Guid id);

        // Obtener anuncios por CourseId sin paginación
        Task<IEnumerable<GetAnnounceDTO>> GetAnnouncesByCourseIdAsync(Guid courseId);

        // Obtener anuncios por CourseId con paginación
        Task<PaginationResult<GetAnnounceDTO>> GetAnnouncesByCourseIdAsync(Guid courseId, Pagination pagination);
    }
}