using System;
using System.ComponentModel.DataAnnotations;

namespace TeduShop.Model.Abstract
{
    //Day goi la lop ke thua khi class nao can su dung chung voi table Products
    public abstract class Auditable : IAuditable
    {
        public DateTime? CreDate { set; get; }

        [MaxLength(256)]
        public string CreBy { set; get; }

        public DateTime? UpdatedDate { set; get; }

        [MaxLength(256)]
        public string UpdatedBy { set; get; }
        [MaxLength(256)]
        public string MetaKeyword { set; get; }
        [MaxLength(256)]
        public string MetaDescription { set; get; }
        public bool Status { set; get; }
    }
}