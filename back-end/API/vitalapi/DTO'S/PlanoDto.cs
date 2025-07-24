namespace vitalapi.DTO_S
{
    public class PlanoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Preco { get; set; }
        public string Tipo { get; set; }
        public string Funcionalidades { get; set; }
    }
    public class CreatePlanoDto
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Preco { get; set; }
        public string Tipo { get; set; }
        public string Funcionalidades { get; set; }
    }
    public class UpdatePlanoDto
    {
        public string Descricao { get; set; }
        public double Preco { get; set; }
    }
}
