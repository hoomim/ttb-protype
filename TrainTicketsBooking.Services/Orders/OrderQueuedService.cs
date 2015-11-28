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

using ServiceStack.Redis;


namespace TrainTicketsBooking.Services
{
    public partial class OrderQueuedService : IOrderQueuedService
    {
        #region Constants

        private readonly static string ORDERQUEUENAME = "TTB_ORDER_QUEUE";

        #endregion

        #region Fields

        private readonly IRedisClientsManager clientsManager;

        #endregion

        public OrderQueuedService(IRedisClientsManager clientsManager)
        {
            this.clientsManager = clientsManager;
        }

        public virtual void EnQueue(Order order)
        {
            //Insert into order queue table

            //Insert into redis queue
            //Queue.Add("TRAINTICKETSBOOKING_ORDERQUEUE", order)

            using (var client = this.clientsManager.GetClient())
            {
                client.AddItemToList(ORDERQUEUENAME, string.Format("{0}", order.Id));
            }
        }

        public virtual Order DeQueue()
        {
            using (var client = this.clientsManager.GetClient())
            {
                int orderId = 0;

                string orderKey = client.PopItemFromList(ORDERQUEUENAME);

                if (Int32.TryParse(orderKey, out orderId))
                {
                    return new Order { Id = orderId };
                }

                return null;
            }
        }

        public virtual long GetQueueCount()
        {
            using (var client = this.clientsManager.GetClient())
            {
                return client.GetListCount(ORDERQUEUENAME);
            }
        }
    }
}
