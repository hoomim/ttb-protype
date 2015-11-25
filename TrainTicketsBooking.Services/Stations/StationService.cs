using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TrainTicketsBooking.Framework.Data;
using TrainTicketsBooking.Framework.Services;
using TrainTicketsBooking.Core.Domain;


namespace TrainTicketsBooking.Services
{
    public partial class StationService : IStationService
    {
        #region Fields

        private readonly IRepository<Station> repository;

        #endregion

        public StationService(IRepository<Station> repository)
        {
            this.repository = repository;
        }

        public virtual IList<Station> GetLineStations()
        {
            return this.repository.Fetch("");
        }
    }
}
