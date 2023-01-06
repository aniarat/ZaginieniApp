using zaginieni_webapp.Entities;
using zaginieni_webapp.Models;

namespace zaginieni_webapp.Interfaces
{
    public interface IMissingPersonRepository
    {
        void UpdateEntityMissingPerson(MissingPerson missingPerson);
        Task<bool> SaveAllAsync();
        Task<MissingPerson> ReportMissingPersonAsync(MissingPerson missingPerson);
        Task<MissingPerson> DeleteMissingPersonAsync(int id);
        Task<UpdateMissingPersonDto> UpdateMissingPersonAsync(UpdateMissingPersonDto personUpdateDto, int id);
        Task<IEnumerable<MissingPersonDto>> GetMissingPeopleAsync();
        Task<MissingPerson> GetMissingPersonAsync(int id);
        Task<MissingPerson> ReportMissingPersonAsyncPhoto(MissingPerson missingPerson, IFormFile file);
        Task<MissingPerson> AcceptMissingPersonAsync(int id);
        Task<MissingPerson> RejectMissingPersonAsync(int id);

    }
}
