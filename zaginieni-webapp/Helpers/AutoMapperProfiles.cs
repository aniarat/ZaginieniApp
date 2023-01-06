using AutoMapper;
using zaginieni_webapp.Entities;
using zaginieni_webapp.Models;

namespace zaginieni_webapp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();

            CreateMap<User, MemberDto>();

            CreateMap<MemberDto, User>();


            CreateMap<RegisterUserDto, User>();

            CreateMap<MissingPerson, MissingPersonDto>();
            //    .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
            //        src.Photos.FirstOrDefault(x => x.IsMain).Url)) ;
            CreateMap<MissingPersonDto, MissingPerson>();

            //CreateMap<Photo, PhotoDto>();

            CreateMap<UpdateMissingPersonDto, MissingPerson>();

            CreateMap<SeenPlaceDto, SeenPlace>();
        }
    }
}
