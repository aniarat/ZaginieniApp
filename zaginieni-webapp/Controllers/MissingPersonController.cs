using System.Security.Claims;
using AutoMapper;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Exceptions;
using zaginieni_webapp.Interfaces;
using zaginieni_webapp.Models;

namespace zaginieni_webapp.Controllers
{
    [Route("api")]
    [ApiController]
    public class MissingPersonController : ControllerBase
    {
        private readonly IMissingPersonRepository _missingPersonRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly ApplicationDbContext _context;

        public MissingPersonController(IMissingPersonRepository missingPersonRepository, IMapper mapper, IWebHostEnvironment hostEnvironment, ApplicationDbContext context)
        {
            _missingPersonRepository = missingPersonRepository;
            _mapper = mapper;
            photoService = new PhotoService(accountName, accountKey);
            _hostEnvironment = hostEnvironment;
            _context = context;
        }

        PhotoService photoService;
        string accountName = "storage-name";      // replace with your storage account Name here
        string accountKey = "key";

        [HttpPost("missing-people")]
        [Authorize(Roles = "Member, Admin")]
        public async Task<ActionResult<MissingPerson>> ReportMissingPerson(MissingPerson missingPerson)
        {
            return await _missingPersonRepository.ReportMissingPersonAsync(missingPerson);
        }

        [HttpPut("missing-people/{id}")]
        [Authorize(Roles = "Member, Admin")]
        public async Task<ActionResult<UpdateMissingPersonDto>> UpdateMissingPerson(UpdateMissingPersonDto personUpdateDto, int id)
        {
            var missingPerson = await _missingPersonRepository.UpdateMissingPersonAsync(personUpdateDto, id);

            if (await _missingPersonRepository.SaveAllAsync()) return missingPerson;

            return BadRequest("Nie udało się edytować zgłoszenia.");
        }

        [HttpDelete("missing-people/{id}")]
        [Authorize(Roles = "Member, Admin")]
        public async Task<ActionResult<MissingPerson>> DeleteMissingPerson(int id)
        {
            return await _missingPersonRepository.DeleteMissingPersonAsync(id);
        }

        //list of missing people
        [HttpGet("missing-people")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MissingPersonDto>>> GetMissingPeople()
        {
            var missingPeople = await _missingPersonRepository.GetMissingPeopleAsync();

            return Ok(missingPeople);
        }

        //specified missing person
        [HttpGet("missing-people/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MissingPerson>> GetMissingPerson(int id)
        {
            return await _missingPersonRepository.GetMissingPersonAsync(id);
        }

        //accept report of the missing person
        [HttpPut("missing-people-accepted/{id}")]
        public async Task<ActionResult<MissingPerson>> AcceptMissingPerson(int id)
        {
            return await _missingPersonRepository.AcceptMissingPersonAsync(id);
        }

        //reject report of the missing person
        [HttpPut("missing-people-rejected/{id}")]
        public async Task<ActionResult<MissingPerson>> RejectMissingPerson(int id)
        {
            return await _missingPersonRepository.RejectMissingPersonAsync(id);
        }

        [HttpPost("missing-people/{id}/photos")]
        [Authorize(Roles = "Member, Admin")]
        public async Task<ActionResult> UploadPhoto(IFormFile file, int id)
        {
            var missingPerson = await _missingPersonRepository.GetMissingPersonAsync(id);
            if (file != null)
            {
                string ContainerName = "files-container";            // replace with the container name. 
                string fileName = Path.GetFileName(file.FileName);
                Stream imageStream = file.OpenReadStream();
                var result = photoService.UploadBlobAsync(fileName, ContainerName, (IFormFile)file);
                if (result != null)
                {

                    PhotoMissingPerson photoMissingPerson = new PhotoMissingPerson();

                    try
                    {
                        photoMissingPerson.MissingPersonId = missingPerson.Id;                                 
                        photoMissingPerson.PhotoUrl = result.Result.Uri.ToString();                 // to insert the url of the blob to the database
                        photoMissingPerson.PhotoFileName = result.Result.Name;                      // to insert the media file name to the database
                        photoMissingPerson.PhotoFileType = result.Result.Name.Split('.').Last();    // to insert the media file type to the database
                    }
                    catch
                    {
                        throw new BadRequestException("Nie udało się dodać zdjęcia.");
                    }

                    _context.PhotosMissingPerson.Add(photoMissingPerson);
                    _context.SaveChanges();
                    return Ok(missingPerson);
                }
                return Ok(missingPerson);
            }
            return Ok(missingPerson);
        }

        [HttpGet("missing-people/{personId}/photos")]
        [AllowAnonymous]
        public async Task<ActionResult> DownloadPhoto(int personId)
        {
            MissingPerson missingPerson = _context.MissingPeople.Find(personId);

            if (missingPerson == null)
            {
                return NotFound("Nie znaleziono osoby o podanym id.");
            }

            PhotoMissingPerson photo = _context.PhotosMissingPerson.FirstOrDefault(x => x.MissingPersonId == missingPerson.Id);

            if(photo == null)
            {
                return NotFound("Nie znaleziono zdjęcia należącego do osoby o podanym id.");
            }

            return Ok(photo);  
        }

        [HttpDelete("missing-people/photos/{id}")]
        [Authorize(Roles = "Member, Admin")]
        public ActionResult DeletePhoto(int id)
        {
            PhotoMissingPerson photo = _context.PhotosMissingPerson.Find(id);
            _context.PhotosMissingPerson.Remove(photo);
            _context.SaveChanges();
            string BlobNameToDelete = photo.PhotoUrl.Split('/').Last();
            photoService.DeleteBlob(BlobNameToDelete, "files-container");         
            return Ok();
        }
    }
}
