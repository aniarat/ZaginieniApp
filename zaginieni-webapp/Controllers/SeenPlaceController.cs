using AutoMapper;

namespace zaginieni_webapp.Controllers
{
    public class SeenPlaceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ISeenPlaceRepository _seenPlaceRepository;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly UserManager<User> _userManager;


        public SeenPlaceController(ISeenPlaceRepository seenPlaceRepository, IMapper mapper, IWebHostEnvironment hostEnvironment, ApplicationDbContext context)
        {
            _seenPlaceRepository = seenPlaceRepository;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
            _context = context;
        }

        [HttpPost("missing-people/{id}/seen-places")]
        [Authorize(Roles = "Member, Admin")]
        public async Task<ActionResult<SeenPlace>> ReportSeenPlace(SeenPlace seenPlace, int id)
        {
            return await _seenPlaceRepository.ReportSeenPlaceAsync(seenPlace, id);
        }

        [HttpGet("missing-people/{personId}/seen-places")]
        [AllowAnonymous]
        public async Task<ActionResult<SeenPlace>> GetSeenPlace(int personId)
        {
            return await _seenPlaceRepository.GetSeenPlaceAsync(personId);
        }

        [HttpGet("missing-people/seen-places")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<SeenPlace>>> GetAllSeenPlaces()
        {
            var seenPlaces = await _seenPlaceRepository.GetAllSeenPlacesAsync();
            return Ok(seenPlaces);
        }

        [HttpDelete("missing-people/seen-places/{id}")]
        [Authorize(Roles = "Member, Admin")]
        public async Task<ActionResult<SeenPlace>> DeleteSeenPlace(int id)
        {
            return await _seenPlaceRepository.DeleteSeenPlaceAsync(id);
        }

        [HttpPut("missing-people/{id}/seen-places-accepted")]
        public async Task<ActionResult<SeenPlace>> AcceptReportedSeenPlace(int id)
        {
            return await _seenPlaceRepository.AcceptReportedSeenPlaceAsync(id);
        }

        [HttpPut("missing-people/{id}/seen-places-rejected")]
        public async Task<ActionResult<SeenPlace>> RejectReportedSeenPlace(int id)
        {
            return await _seenPlaceRepository.RejectReportedSeenPlaceAsync(id);
        }
    }
}

    
