using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using TrainTicketsBooking.Framework.Controllers;
using TrainTicketsBooking.Framework.Caching;
using TrainTicketsBooking.Framework.Services;
using TrainTicketsBooking.Models;
using TrainTicketsBooking.Core.Domain;
using System.Threading.Tasks;

namespace TrainTicketsBooking.Web.Controllers
{
    public class HomeController : BaseController
    {
        #region Field

        private readonly IStationService stationService;

        private readonly ITicketService ticketService;

        private readonly IOrderService orderService;

        #endregion

        public HomeController(IStationService stationService,
            ITicketService ticketService,
            IOrderService orderService)
        {
            this.stationService = stationService;
            this.ticketService = ticketService;
            this.orderService = orderService;
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var stations = this.stationService.GetLineStations();

            var stationsList = from s in stations
                                   select new SelectListItem
                                   {
                                       Text = s.Name,
                                       Value = s.Id.ToString()
                                   };

            ViewData["FromStationId"] = stationsList;

            ViewData["ToStationId"] =  stationsList;
            
            base.OnActionExecuting(filterContext);
        }

        public ActionResult Index()
        {
            var model = new TicketQueryModel();

            return View(model);
        }

        [HttpPost]
        public ActionResult Index(TicketQueryModel model)
        {
            try
            {
                //需要前端验证
                if (!model.FromStationId.HasValue || !model.ToStationId.HasValue)
                {
                    throw new Exception("你还没选择出发站或者到达站");
                }

                //需要前端验证
                if (model.FromStationId >= model.ToStationId)
                {
                    throw new Exception("到达站不能在出发站之前");
                }

                Ticket queryTicket = new Ticket { From = model.FromStationId.GetValueOrDefault(0), To = model.ToStationId.GetValueOrDefault(0) };

                model.AvailableTicketsCount = this.ticketService.GetAvailableTicketsCount(queryTicket);

            }
            catch (Exception ex)
            {
                ErrorNotification(ex.Message);
            }
            return View(model);
        }


        public ActionResult Order(OrderModel model)
        {
            try
            {
                if (!model.From.HasValue || model.From < 1 || !model.To.HasValue || model.To < 1)
                {
                    throw new Exception("未知的出发站或者到达站");
                }

                var stations = this.stationService.GetLineStations();

                model.FromStation = stations.FirstOrDefault(s => s.Id == model.From).Name;
                model.ToStation = stations.FirstOrDefault(s => s.Id == model.To).Name;
            }
            catch (Exception ex)
            {
                ErrorNotification(ex.Message);
            }

            ModelState.Clear();

            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Order(OrderModel model, string action)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var order = model.ToEntity();
                    order.CreatedOn = DateTime.Now;

                    int result = this.orderService.Create(order);

                    if (Convert.ToInt32(result) > 0)
                    {
                        return RedirectToAction("Payment");
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorNotification(ex.Message);
            }

            return View(model);
        }

        public ActionResult Payment()
        {
            return View();
        }
    }
}
