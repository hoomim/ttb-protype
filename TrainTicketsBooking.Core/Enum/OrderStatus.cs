using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainTicketsBooking.Core.Enum
{
    public enum OrderStatus : int
    {
        /// <summary>
        /// 处理中
        /// </summary>
        Pendding = 1,

        /// <summary>
        /// 已完成
        /// </summary>
        Success = 2,

        /// <summary>
        /// 已失败
        /// </summary>
        Failed = 0
    }
}
