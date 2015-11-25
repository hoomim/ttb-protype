using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;
using TrainTicketsBooking.Core.Domain;
using TrainTicketsBooking.Models;
using System.Linq.Expressions;

namespace TrainTicketsBooking.Web
{
    public static class MappingExtensions
    {
        #region Order

        public static OrderModel ToModel(this Order entity)
        {
            return Mapper.Map<Order, OrderModel>(entity);
        }

        public static Order ToEntity(this OrderModel model)
        {
            return Mapper.Map<OrderModel, Order>(model);
        }

        public static Order ToEntity(this OrderModel model, Order destination)
        {
            return Mapper.Map(model, destination);
        }

        #endregion
    }
}