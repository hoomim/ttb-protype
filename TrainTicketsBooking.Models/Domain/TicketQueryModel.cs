using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainTicketsBooking.Models
{
    /// <summary>
    /// 车票查询视图模型
    /// </summary>
    public class TicketQueryModel
    {
        /// <summary>
        /// 出发站编号
        /// </summary>
        public int? FromStationId { get; set; }

        /// <summary>
        /// 到达站编号
        /// </summary>
        public int? ToStationId { get; set; }

        /// <summary>
        /// 可用车票数量
        /// </summary>
        public int AvailableTicketsCount { get; set; }

        /// <summary>
        /// 能订票与否
        /// </summary>
        public bool CanBookingTickets
        {
            //余票数量大于0时允许订票
            get { return this.AvailableTicketsCount > 0; }
        }
    }
}
