using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

using TrainTicketsBooking.Framework.Engine.DependencyManagement;
using TrainTicketsBooking.Core.Configuration;
using TrainTicketsBooking.Framework.Engine;

using Autofac;
using ServiceStack.Redis;

namespace TrainTicketsBooking.Services
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public virtual void Register(ContainerBuilder builder, ITypeFinder typeFinder, WebAppEngineConfig config)
        {
            //注册 PooledRedisClientManager
            builder.Register<IRedisClientsManager>(c =>
                new PooledRedisClientManager("127.0.0.1", "127.0.0.1")
                {
                    ConnectTimeout = 100,
                });
        }

        public int Order
        {
            get { return 1; }
        }
    }
}
