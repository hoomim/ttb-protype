using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using AutoMapper;

using TrainTicketsBooking.Core.Domain;
using TrainTicketsBooking.Models;
using TrainTicketsBooking.Framework.Engine;

namespace TrainTicketsBooking.Web.StartupTask
{
    public class AutoMapperStartupTask : IStartupTask
    {
        public void Execute()
        {
            Mapper.CreateMap<OrderModel, Order>();
            Mapper.CreateMap<Order, OrderModel>();
        }

        public int Order
        {
            get { return 0; }
        }
    }
}