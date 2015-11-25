using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Core.Domain;

namespace TrainTicketsBooking.Framework.Services
{
    public interface IStationService
    {
        /// <summary>
        /// 获取线路车站列表
        /// </summary>
        /// <returns></returns>
        IList<Station> GetLineStations();
    }
}
