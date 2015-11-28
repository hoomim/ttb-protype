using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Core.Domain;
using TrainTicketsBooking.Core.Enum;

namespace TrainTicketsBooking.Framework.Services
{
    public interface IOrderService
    {
        /// <summary>
        /// 获取指定编号的订单
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Order RetrieveOrder(int id);

        /// <summary>
        /// 创建一个订单
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        int PlaceOrder(Order order);

        /// <summary>
        /// 处理订单
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        int ProcessingOrder(Order order, OrderStatus status = OrderStatus.Success);

        /// <summary>
        /// 创建一个订单进入处理队列
        /// </summary>
        /// <param name="order"></param>
        void CreateInQueue(Order order);
    }
}
