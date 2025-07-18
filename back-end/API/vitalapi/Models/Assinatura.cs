namespace vitalapi.Models
{
    public class Assinatura
    {
        public int ID { get; set; }
        public string DataInicio { get; set; }
        public string Vencimento { get; set; }
        public string Status { get; set; }
        public bool Pago { get; set; }
        
    }
}
