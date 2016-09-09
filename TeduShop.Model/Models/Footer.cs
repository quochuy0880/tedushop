using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeduShop.Model.Models
{
    [Table("Footers")] //Get table in database
    public class Footer
    {
        [Key]
        [MaxLength(50)] //NHO KIEU STRING CAN PHAI CO MAXLENGTH DE GIOI HAN DO DAI CHUOI
        public string ID { set; get; }

        [Required]//Doi voi kieu string cung nen co Required
        public string Content { set; get; }
    }
}