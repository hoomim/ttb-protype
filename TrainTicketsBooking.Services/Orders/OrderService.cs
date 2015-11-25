using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Framework.Data;
using TrainTicketsBooking.Framework.Services;
using TrainTicketsBooking.Core.Domain;
using TrainTicketsBooking.Services;


namespace TrainTicketsBooking.Services
{
    public partial class OrderService : IOrderService
    {
        #region Fields

        private readonly object lockObj = new object();

        private readonly IRepository<Order> repository;

        private readonly ITicketService ticketService;

        #endregion

        public OrderService(IRepository<Order> repository,
            ITicketService ticketService)
        {
            this.repository = repository;
            this.ticketService = ticketService;
        }

        public virtual int Create(Order order)
        {
            int result = 0;

            lock (lockObj)
            {
                //查询余票
                int availableTicketsCount = this.ticketService.GetAvailableTicketsCount(new Ticket { From = order.From.GetValueOrDefault(0), To = order.To.GetValueOrDefault(0) });

                if (availableTicketsCount < 1)
                {
                    throw new Exception("创建订单失败，没有足够的余票");
                }

                var obj = this.repository.Insert(order);

                result = Convert.ToInt32(obj);

                return result;
            }
        }
    }
}
