namespace zaginieni_webapp.Interfaces
{
    public interface ISeenPlaceRepository
    {
        Task<SeenPlace> ReportSeenPlaceAsync(SeenPlace seenPlace, int id);
        Task<SeenPlace> GetSeenPlaceAsync(int personId);
        Task<IEnumerable<SeenPlace>> GetAllSeenPlacesAsync();
        Task<SeenPlace> AcceptReportedSeenPlaceAsync(int id);
        Task<SeenPlace> RejectReportedSeenPlaceAsync(int id);
        Task<SeenPlace> DeleteSeenPlaceAsync(int id);
    }
}
