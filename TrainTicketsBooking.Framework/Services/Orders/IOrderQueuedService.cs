using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Core.Domain;

namespace TrainTicketsBooking.Framework.Services
{
    public interface IOrderQueuedService
    {
        /// <summary>
        /// 添加一个订单进入队列
        /// </summary>
        /// <param name="order"></param>
        void EnQueue(Order order);

        /// <summary>
        /// 取出一个队列订单
        /// </summary>
        /// <returns></returns>
        Order DeQueue();

        /// <summary>
        /// 获取队列长度
        /// </summary>
        /// <returns></returns>
        long GetQueueCount();
    }
}
