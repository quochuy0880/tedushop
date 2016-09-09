using System;

namespace TeduShop.Model.Abstract
{
    public interface IAuditable //tach rieng de dung chung cac doi tuong
    {
        DateTime? CreDate { set; get; }
        string CreBy { set; get; }
        DateTime? UpdatedDate { set; get; }
        string UpdatedBy { set; get; }

        string MetaKeyword { set; get; }
        string MetaDescription { set; get; }
        bool Status { set; get; }
    }
}