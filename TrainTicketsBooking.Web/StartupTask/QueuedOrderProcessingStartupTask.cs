using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading;

using AutoMapper;

using TrainTicketsBooking.Core.Domain;
using TrainTicketsBooking.Models;
using TrainTicketsBooking.Framework.Engine;
using TrainTicketsBooking.Framework.Services;


namespace TrainTicketsBooking.Web.StartupTask
{
    public class QueuedOrderProcessingStartupTask : IStartupTask
    {

        public void Execute()
        {
            #region Resolve Services

            IOrderQueuedService orderQueuedService = EngineContext.Current.Resolve<IOrderQueuedService>();
            IOrderService orderService = EngineContext.Current.Resolve<IOrderService>();
            ITicketService ticketService = EngineContext.Current.Resolve<ITicketService>();
            ISyncLockService syncLockService = EngineContext.Current.Resolve<ISyncLockService>();

            #endregion

            ThreadPool.QueueUserWorkItem(o =>
            {
                while (true)
                {
                    if (orderQueuedService.GetQueueCount()>0)
                    {
                        //队列中Value仅存了Id
                        var order = orderQueuedService.DeQueue();

                        //通过Id获取Order实体待处理
                        order = orderService.RetrieveOrder(order == null ? 0 : order.Id);

                        if (order != null)
                        {
                            //获取分布式同步锁
                            using (syncLockService.AcquireLock())
                            {
                                //查询余票
                                int availableTicketsCount = ticketService.GetAvailableTicketsCount(new Ticket { From = order.From.GetValueOrDefault(0), To = order.To.GetValueOrDefault(0) });

                                if (availableTicketsCount < 1)
                                {
                                    //标记订单失败
                                    orderService.ProcessingOrder(order, Core.Enum.OrderStatus.Failed);

                                    throw new Exception("创建订单失败，没有足够的余票");
                                }

                                orderService.ProcessingOrder(order);
                            }
                        }
                        else
                        {
                            Thread.Sleep(200);
                        }
                    }
                    else
                    {
                        Thread.Sleep(200);
                    }
                }
            });
        }

        public int Order
        {
            get { return 0; }
        }
    }
}