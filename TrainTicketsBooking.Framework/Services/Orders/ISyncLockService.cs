using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Core.Domain;

namespace TrainTicketsBooking.Framework.Services
{
    public interface ISyncLockService
    {
        /// <summary>
        /// 获取分布式同步锁
        /// </summary>
        /// <returns></returns>
        IDisposable AcquireLock();
    }
}
