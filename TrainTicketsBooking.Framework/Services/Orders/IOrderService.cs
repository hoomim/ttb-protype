using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Core.Domain;

namespace TrainTicketsBooking.Framework.Services
{
    public interface IOrderService
    {
        /// <summary>
        /// 创建一个订单
        /// </summary>
        /// <returns></returns>
        int Create(Order order);
    }
}
