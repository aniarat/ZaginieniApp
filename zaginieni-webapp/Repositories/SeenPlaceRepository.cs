using AutoMapper;
using zaginieni_webapp.Exceptions;

namespace zaginieni_webapp.Repositories
{
    public class SeenPlaceRepository : ISeenPlaceRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;


        //private readonly IPhotoService _photoService;

        //private readonly ILogger _logger;

        public SeenPlaceRepository(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment hostEnvironment, UserManager<User> userManager, IUserRepository userRepository)
        {
            _context = context;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
            _userManager = userManager;
            _userRepository = userRepository;
        }
        
        //ADD
        public async Task<SeenPlace> ReportSeenPlaceAsync(SeenPlace seenPlace, int id)
        {
            var missingPerson = await _context.MissingPeople.FindAsync(id);

            if (missingPerson == null)
            {
                throw new NotFoundException("Nie znaleziono osoby zaginionej o takim id.");
            }

            seenPlace.MissingPersonId = id;
            await _context.SeenPlaces.AddAsync(seenPlace);
            await _context.SaveChangesAsync();
            return seenPlace;
        }

        //GET BY PERSON ID
        public async Task<SeenPlace> GetSeenPlaceAsync(int personId)
        {
            var missingPerson = await _context.MissingPeople.FindAsync(personId);

            SeenPlace seenPlace = _context.SeenPlaces.FirstOrDefault(x => x.MissingPersonId == missingPerson.Id);

            if (missingPerson == null)
            {
                throw new NotFoundException("Nie znaleziono osoby zaginionej o takim id.");
            }

            return seenPlace;
        }

        //GET ALL
        public async Task<IEnumerable<SeenPlace>> GetAllSeenPlacesAsync()
        {
            return await _context.SeenPlaces
                .ToListAsync();
        }

        //ACCEPT
        public async Task<SeenPlace> AcceptReportedSeenPlaceAsync(int id)
        {
            //var missingPerson = await _context.MissingPeople.FindAsync(id);
            var seenPlace = await _context.SeenPlaces.FindAsync(id);

            if (seenPlace == null)
            {
                throw new NotFoundException("Nie znaleziono zgłoszonego miejsca o podanym id.");
            }

            //var seenPlace = _context.SeenPlaces.FirstOrDefault(x => x.MissingPersonId == missingPerson.Id);

            if (seenPlace.Status == "reported" || seenPlace.Status == "rejected")
            {
                seenPlace.Status = "accepted";
            }
            else
            {
                throw new BadRequestException("Zgłoszenie miejsca zobaczenia osoby zaginionej zostało już zaakceptowane.");
            }

            await _context.SaveChangesAsync();
            return seenPlace;
        }

        //REJECT
        public async Task<SeenPlace> RejectReportedSeenPlaceAsync(int id)
        {
            var seenPlace = await _context.SeenPlaces.FindAsync(id);

            if (seenPlace == null)
            {
                throw new NotFoundException("Nie znaleziono zgłoszenego miejsca o podanym id.");
            }

            if (seenPlace.Status == "reported" || seenPlace.Status == "accepted")
            {
                seenPlace.Status = "rejected";
            }
            else
            {
                throw new BadRequestException("Zgłoszenie osoby zaginionej o podanym id zostało już odrzucone.");
            }
            await _context.SaveChangesAsync();
            return seenPlace;
        }

        //DELETE
        public async Task<SeenPlace> DeleteSeenPlaceAsync(int id)
        {
            var seenPlace = await _context.SeenPlaces.FindAsync(id);

            if (seenPlace == null)
            {
                throw new NotFoundException("Nie znaleziono zgłoszenia miejsca o podanym id.");
            }

            _context.SeenPlaces.Remove(seenPlace);
            await _context.SaveChangesAsync();

            return seenPlace;
        }
    }
}
