using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

using Autofac;
using Autofac.Builder;
using Autofac.Core;
//using Autofac.Integration.Mvc;

using TrainTicketsBooking.Framework.Engine.DependencyManagement;
using TrainTicketsBooking.Core.Configuration;
using TrainTicketsBooking.Framework.Engine;
//using TrainTicketsBooking.Framework.Caching;
//using DigitalSignage.Services;
using TrainTicketsBooking.Framework.Data;

namespace TrainTicketsBooking.Web
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public virtual void Register(ContainerBuilder builder, ITypeFinder typeFinder, WebAppEngineConfig config)
        {

            

            //register data repository assembly
            if (!string.IsNullOrWhiteSpace(config.Data))
            {
                var dataAssembly = Assembly.Load(config.Data);
                //builder = new ContainerBuilder();
                builder.RegisterGeneric(dataAssembly.GetType(config.DataType)).As(typeof(IRepository<>)).InstancePerLifetimeScope();
                //builder.Update(container);
            }

            //register serives assembly
            if (!string.IsNullOrWhiteSpace(config.Service))
            {
                var serviceAssembly = Assembly.Load(config.Service);
                //builder = new ContainerBuilder();
                builder.RegisterAssemblyTypes(serviceAssembly).Where(t => t.Name.EndsWith("Service")).AsImplementedInterfaces().InstancePerLifetimeScope();
                //builder.Update(container);
            }

        }

        public int Order
        {
            get { return 1; }
        }
    }

    public class SettingsSource : IRegistrationSource
    {
        static readonly MethodInfo BuildMethod = typeof(SettingsSource).GetMethod(
            "BuildRegistration",
            BindingFlags.Static | BindingFlags.NonPublic);

        public IEnumerable<IComponentRegistration> RegistrationsFor(
                Service service,
                Func<Service, IEnumerable<IComponentRegistration>> registrations)
        {
            var ts = service as TypedService;
            if (ts != null && typeof(ISettings).IsAssignableFrom(ts.ServiceType))
            {
                var buildMethod = BuildMethod.MakeGenericMethod(ts.ServiceType);
                yield return (IComponentRegistration)buildMethod.Invoke(null, null);
            }
        }

        //static IComponentRegistration BuildRegistration<TSettings>() where TSettings : ISettings, new()
        //{
        //    return RegistrationBuilder
        //        .ForDelegate((c, p) =>
        //        {
        //            //although it's better to connect to your database and execute the following SQL:
        //            //DELETE FROM [Setting] WHERE [StoreId] > 0
        //            return c.Resolve<ISettingService>().LoadSetting<TSettings>();
        //        })
        //        .InstancePerLifetimeScope()
        //        .CreateRegistration();
        //}

        public bool IsAdapterForIndividualComponents { get { return false; } }
    }
}
