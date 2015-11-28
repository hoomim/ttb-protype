using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Framework.Data;
using TrainTicketsBooking.Framework.Services;
using TrainTicketsBooking.Core.Domain;
using TrainTicketsBooking.Core.Enum;
using TrainTicketsBooking.Services;


namespace TrainTicketsBooking.Services
{
    public partial class OrderService : IOrderService
    {
        #region Fields

        private readonly object lockObj = new object();

        private readonly IRepository<Order> repository;

        private readonly ITicketService ticketService;

        private readonly IOrderQueuedService orderQueuedService;

        private readonly ISyncLockService syncLockService;

        #endregion

        public OrderService(IRepository<Order> repository,
            ITicketService ticketService,
            IOrderQueuedService orderQueuedService,
            ISyncLockService syncLockService)
        {
            this.repository = repository;
            this.ticketService = ticketService;
            this.orderQueuedService = orderQueuedService;
            this.syncLockService = syncLockService;
        }

        public virtual Order RetrieveOrder(int id)
        {
            return this.repository.FirstOrDefault("WHERE Id = @0", id);
        }

        public virtual int PlaceOrder(Order order)
        {
            int result = 0;

            //using (this.syncLockService.AcquireLock())
            //{
            //    //查询余票
            //    int availableTicketsCount = this.ticketService.GetAvailableTicketsCount(new Ticket { From = order.From.GetValueOrDefault(0), To = order.To.GetValueOrDefault(0) });

            //    if (availableTicketsCount < 1)
            //    {
            //        throw new Exception("创建订单失败，没有足够的余票");
            //    }

            //    var obj = this.repository.Insert(order);

            //    result = Convert.ToInt32(obj);

            //    return result;
            //}

            order.OrderStatus = OrderStatus.Pendding.ToString();

            var obj = this.repository.Insert(order);

            result = Convert.ToInt32(obj);

            return result;
        }

        public virtual int ProcessingOrder(Order order, OrderStatus status = OrderStatus.Success)
        {
            return this.repository.Update("SET OrderStatus = @0 WHERE Id = @1", OrderStatus.Success.ToString(), order.Id);
        }

        public virtual void CreateInQueue(Order order)
        {
            this.orderQueuedService.EnQueue(order);
        }
    }
}
