using Autofac;
using TrainTicketsBooking.Core.Configuration;

namespace TrainTicketsBooking.Framework.Engine.DependencyManagement
{
    public interface IDependencyRegistrar
    {
        void Register(ContainerBuilder builder, ITypeFinder typeFinder, WebAppEngineConfig config);

        int Order { get; }
    }
}
