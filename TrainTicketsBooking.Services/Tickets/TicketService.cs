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


namespace TrainTicketsBooking.Services
{
    public partial class TicketService : ITicketService
    {
        #region Fields

        private readonly IRepository<Order> repository;

        #endregion

        public TicketService(IRepository<Order> repository)
        {
            this.repository = repository;
        }

        public virtual int GetAvailableTicketsCount(Ticket ticket)
        {
            //假设火车共100座位
            int TICKETSCOUNT = 100;

            //查询起始站冲突的订单座位
            Sql sql = Sql.Builder.Append("SELECT COUNT(Id) FROM `order` WHERE `From` < @0 AND `To` > @1 AND OrderStatus = @2", ticket.To, ticket.From, OrderStatus.Success.ToString());

            return TICKETSCOUNT - this.repository.ExecuteScalar<int>(sql.SQL, sql.Arguments);
        }
    }
}
