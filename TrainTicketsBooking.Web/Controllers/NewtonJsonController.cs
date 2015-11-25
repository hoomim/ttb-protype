using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace TrainTicketsBooking.Web.Controllers
{
    public class NewtonJsonController : Controller
    {
        //
        // GET: /NewtonJson/

        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding,JsonRequestBehavior behavior)
        {
            return new TrainTicketsBooking.Web.NewtonJsonResult { Data = data, ContentType = contentType, ContentEncoding = contentEncoding, JsonRequestBehavior = behavior };
        }

    }
}
