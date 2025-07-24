namespace vitalapi.DTO_S
{
    public class EspecialistaDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Especialidade { get; set; }
        public string Email { get; set; }
        public string Descricao { get; set; }
        public string CRP { get; set; }
        public string Biografia { get; set; }
        public double ValorConsulta { get; set; }
    }
    public class CreateEspecialistaDto
    {
        public string Nome { get; set; }
        public string Especialidade { get; set; }
        public string Email { get; set; }
        public string Descricao { get; set; }
        public string CRP { get; set; }
        public string Biografia { get; set; }
        public double ValorConsulta { get; set; }
    }
    public class UpdateEspecialistaDto
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double ValorConsulta { get; set; }
    }
}
