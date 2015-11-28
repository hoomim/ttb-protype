using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation.Attributes;
using TrainTicketsBooking.Models.Validators;

namespace TrainTicketsBooking.Models
{
    /// <summary>
    /// 订单视图模型
    /// </summary>
    [Validator(typeof(OrderValidator))]
    public class OrderModel
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 出发站编号
        /// </summary>
        public int? From { get; set; }

        /// <summary>
        /// 到达站编号
        /// </summary>
        public int? To { get; set; }

        /// <summary>
        /// 乘车人姓名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 身份证号码
        /// </summary>
        public string UserIdCardNo { get; set; }

        /// <summary>
        /// 手机号码
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 订单状态
        /// </summary>
        public string OrderStatus { get; set; }

        #region Nested Fields

        /// <summary>
        /// 出发站名称
        /// </summary>
        public string FromStation { get; set; }

        /// <summary>
        /// 到达站名称
        /// </summary>
        public string ToStation { get; set; }

        #endregion
    }
}
