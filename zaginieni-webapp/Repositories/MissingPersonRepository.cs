using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Exceptions;
using zaginieni_webapp.Interfaces;
using zaginieni_webapp.Models;
using zaginieni_webapp.Extensions;
using System.Security.Claims;
using Newtonsoft.Json;
using Refit;

namespace zaginieni_webapp.Repositories
{
    public class MissingPersonRepository : IMissingPersonRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;

        public MissingPersonRepository(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment hostEnvironment, UserManager<User> userManager, IUserRepository userRepository)
        {
            _context = context;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
            _userManager = userManager;
            _userRepository = userRepository;
            photoService = new PhotoService(accountName, accountKey);
        }

        PhotoService photoService;
        string accountName = "storageaccountname";      
        string accountKey = "key";

        //entity has been modified, we don't change anything in the database
        public void UpdateEntityMissingPerson(MissingPerson missingPerson)
        {
            _context.Entry(missingPerson).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        //ADD
        public async Task<MissingPerson> ReportMissingPersonAsync(MissingPerson missingPerson)
        {
             _context.MissingPeople.Add(missingPerson);
             await _context.SaveChangesAsync();

            return missingPerson;
        }

        //GET ALL
        public async Task<IEnumerable<MissingPersonDto>> GetMissingPeopleAsync()
        {
            return await _context.MissingPeople
                .ProjectTo<MissingPersonDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        //GET BY ID
        public async Task<MissingPerson> GetMissingPersonAsync(int id)
        {
            return await _context.MissingPeople
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        //UPDATE
        public async Task<UpdateMissingPersonDto> UpdateMissingPersonAsync(UpdateMissingPersonDto personUpdateDto, int id)
        {
            var missingPerson = await _context.MissingPeople.FindAsync(id);

            if (missingPerson == null)
            {
                throw new NotFoundException("Nie znaleziono osoby zaginionej o danym id.");
            }

            _mapper.Map(personUpdateDto, missingPerson);
            _context.MissingPeople.Update(missingPerson);

            return personUpdateDto;
        }

        //DELETE
        public async Task<MissingPerson> DeleteMissingPersonAsync(int id)
        {
            var missingPerson = await _context.MissingPeople.FindAsync(id);

            if (missingPerson == null)
            {
                throw new NotFoundException("Nie znaleziono osoby zaginionej o danym id.");
            }

            _context.MissingPeople.Remove(missingPerson);
            await _context.SaveChangesAsync();

            return missingPerson;
        }
        public async Task<MissingPerson> AcceptMissingPersonAsync(int id)
        {
            var missingPerson = await _context.MissingPeople.FindAsync(id);

            if (missingPerson == null)
            {
                throw new NotFoundException("Nie znaleziono osoby zaginionej o podanym id.");
            }

            if (missingPerson.Status == "reported")
            {
                missingPerson.Status = "accepted";
            }
            else
            {
                throw new BadRequestException("Zgłoszenie osoby zaginionej o podanym id zostało już odrzucone lub zaakceptowane.");
            }

            await _context.SaveChangesAsync();
            return missingPerson;
        }

        public async Task<MissingPerson> RejectMissingPersonAsync(int id)
        {
            var missingPerson = await _context.MissingPeople.FindAsync(id);

            if (missingPerson == null)
            {
                throw new NotFoundException("Nie znaleziono osoby zaginionej o podanym id.");
            } 

            if (missingPerson.Status == "reported")
            {
                missingPerson.Status = "rejected";
            }
            else
            {
                throw new BadRequestException("Zgłoszenie osoby zaginionej o podanym id zostało już odrzucone lub zaakceptowane.");
            }

            await _context.SaveChangesAsync();
            return missingPerson;
        }

        //report person with photo

        public async Task<MissingPerson> ReportMissingPersonAsyncPhoto(MissingPerson missingPerson, IFormFile file)
        {

            await _context.MissingPeople.AddAsync(missingPerson);
            await _context.SaveChangesAsync();

            if (file != null)
            {
                string ContainerName = "container";            
                string fileName = Path.GetFileName(file.FileName);
                Stream imageStream = file.OpenReadStream();
                
                var result = photoService.UploadBlobAsync(fileName, ContainerName, (IFormFile)file);
                
                if (result != null)
                {
                    PhotoMissingPerson photoMissingPerson = new PhotoMissingPerson();
                    try
                    {
                        photoMissingPerson.MissingPersonId = missingPerson.Id;
                        photoMissingPerson.PhotoUrl = result.Result.Uri.ToString();                 
                        photoMissingPerson.PhotoFileName = result.Result.Name;                      
                        photoMissingPerson.PhotoFileType = result.Result.Name.Split('.').Last();    
                    }
                    catch
                    {
                        throw new BadRequestException("Nie udało się dodać zdjęcia.");
                    }
                    await _context.PhotosMissingPerson.AddAsync(photoMissingPerson);

                    await _context.SaveChangesAsync();
                }
                
            }
            return missingPerson;
        }
    }
}
