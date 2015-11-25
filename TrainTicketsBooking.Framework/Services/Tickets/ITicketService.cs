using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Core.Domain;

namespace TrainTicketsBooking.Framework.Services
{
    public interface ITicketService
    {
        /// <summary>
        /// 获取当前可用车票数量
        /// </summary>
        /// <param name="ticket"></param>
        /// <returns></returns>
        int GetAvailableTicketsCount(Ticket ticket);
    }
}
