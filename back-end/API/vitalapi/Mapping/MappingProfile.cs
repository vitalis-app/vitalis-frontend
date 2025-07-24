using AutoMapper;
using vitalapi.DTO_S;
using vitalapi.Models;

namespace vitalapi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<AgendamentoDto, Agendamento>();
            CreateMap<AssinaturaDto, Assinatura>();
            CreateMap<DisponibilidadeDto,Disponibilidade>();
            CreateMap<EnderecoDto,Endereco>();
            CreateMap<EspecialistaDto, Especialista>();
            CreateMap<PlanoDto,Plano>();    
            CreateMap<UsuarioDto, Usuario>();
        }

    }
}
