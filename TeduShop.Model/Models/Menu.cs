using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeduShop.Model.Models
{
    [Table("Menus")]
    public class Menu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]//Tu dong tang ID
        public int ID { set; get; }
        [Required]
        [MaxLength(50)]
        public string Name { set; get; }
        [Required]
        [MaxLength(256)]
        public string URL { set; get; }
        public int? DisplayOrder { set; get; } //It can give null
        [Required]
        public int GroupID { set; get; }

        [ForeignKey("GroupID")] //Khoa ngoai tro den truong MenuGroup
        public virtual MenuGroup MenuGroup { set; get; }
        [MaxLength(10)]
        public string Target { set; get; }
        [Required]
        public bool Static { set; get; }
    }
}