using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainTicketsBooking.Framework.Data
{
    public interface ITransaction : IDisposable
    {
        void Complete();
    }
}
