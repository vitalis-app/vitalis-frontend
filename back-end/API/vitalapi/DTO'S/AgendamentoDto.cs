namespace vitalapi.DTO_S
{
    public class AgendamentoDto
    {
        public int ID { get; set; }
        public string DataHora { get; set; }
        public string Status { get; set; }
        public string ValorPago { get; set; }
    }
    public class CreateAgendamentoDto
    {
        public string DataHora { get; set; }
        public string Status { get; set; }
        public string ValorPago { get; set; }
    }
    public class UpdateAgendamentoDto
    {
        public string Status { get; set; }
        public string ValorPago { get; set; }
    }
}
