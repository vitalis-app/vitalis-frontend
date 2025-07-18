using Microsoft.EntityFrameworkCore;
using vitalapi.Models;

namespace vitalapi.Context
{
    public class vitalcontext : DbContext
    {
        internal object Assinatura;

        public vitalcontext(DbContextOptions<vitalcontext> options) : base(options) { }

        public DbSet<Disponibilidade> Disponibilidades { get; set; }
        public DbSet<Assinatura> Assinaturas { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Especialista> Especialistas { get; set; }
        public DbSet<Plano> Planos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        // outras DbSets...
    }
}
