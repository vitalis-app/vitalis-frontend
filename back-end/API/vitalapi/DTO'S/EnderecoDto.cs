namespace vitalapi.DTO_S
{
    public class EnderecoDto
    {
        public int Id { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Cep { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Complemento { get; set; }
        public string Pais { get; set; }
    }
    public class CreateEnderecoDto
    {
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Cep { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Complemento { get; set; }
        public string Pais { get; set; }
    }
    public class UpdateEnderecoDto
    {
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
    }
}
