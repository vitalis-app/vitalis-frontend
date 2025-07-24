namespace vitalapi.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Genero { get; set; }
        public string FotoPerfil { get; set; }
        public string PlanoId { get; set; }
        public bool Ativo { get; set; }
        public DateTime DataCriacao { get; set; }
        
    }
}
