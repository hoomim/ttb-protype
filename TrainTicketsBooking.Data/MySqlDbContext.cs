using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TrainTicketsBooking.Data
{
    public partial class MySqlDbContext : DbContext
    {
        public MySqlDbContext()
            : base("mysqlConn")
        {
            CommonConstruct();
        }

        public MySqlDbContext(string connectionStringName)
            : base(connectionStringName)
        {
            CommonConstruct();
        }

        partial void CommonConstruct();

        public interface IFactory
        {
            MySqlDbContext GetInstance();
        }

        public static IFactory Factory { get; set; }
        public static MySqlDbContext GetInstance()
        {
            if (_instance != null)
                return _instance;

            if (Factory != null)
                return Factory.GetInstance();
            else
                return new MySqlDbContext();
        }

        [ThreadStatic]
        static MySqlDbContext _instance;

        public override void OnBeginTransaction()
        {
            if (_instance == null)
                _instance = this;
        }

        public override void OnEndTransaction()
        {
            if (_instance == this)
                _instance = null;
        }
    }
}
