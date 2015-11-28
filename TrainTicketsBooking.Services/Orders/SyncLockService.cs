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
    public partial class SyncLockService : ISyncLockService
    {
        #region Constants

        private readonly static string ORDER_PROCESSING_LOCKE = "TTB_ORDERPROCESSING_LOCK";

        #endregion

        #region Fields

        private readonly IRedisClientsManager clientsManager;

        #endregion

        public SyncLockService(IRedisClientsManager clientsManager)
        {
            this.clientsManager = clientsManager;
        }

        /// <summary>
        /// 这里使用Redis同步所机制实现获取分布式锁
        /// </summary>
        /// <returns></returns>
        public virtual IDisposable AcquireLock()
        {
            using (var client = this.clientsManager.GetClient())
            {
                return client.AcquireLock(ORDER_PROCESSING_LOCKE, TimeSpan.FromMilliseconds(500));
            }
        }
    }
}
