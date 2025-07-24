namespace vitalapi.Models
{
    public class Disponibilidade
    {
        public int Id { get; set; }
        public string HorarioInicio { get; set; }
        public string HorarioFim { get; set; }
        public string DiaSemana { get; set; } // Ex: "Segunda", "Terça", etc.

    }
}
