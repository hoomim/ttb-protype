using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainTicketsBooking.Core.Domain
{
    /// <summary>
    /// 车票
    /// </summary>
    public partial class Ticket
    {
        /// <summary>
        /// 始发站编号
        /// </summary>
        public int From { get; set; }

        /// <summary>
        /// 始发站名称
        /// </summary>
        public string FromStation { get; set; }

        /// <summary>
        /// 到达站编号
        /// </summary>
        public int To { get; set; }

        /// <summary>
        /// 达到站名称
        /// </summary>
        public int ToStation { get; set; }
    }
}
