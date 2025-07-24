namespace vitalapi.DTO_S
{
    public class DisponibilidadeDto
    {
        public int Id { get; set; }
        public string HorarioInicio { get; set; }
        public string HorarioFim { get; set; }
        public string DiaSemana { get; set; }
    }
    public class CreateDisponibilidadeDto
    {
        public string HorarioInicio { get; set; }
        public string HorarioFim { get; set; }
        public string DiaSemana { get; set; }
    }
    public class UpdateDisponibilidadeDto
    {
        public string HorarioInicio { get; set; }
        public string HorarioFim { get; set; }
    }

}
