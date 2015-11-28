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

                model = FillOrderModel(model);
            }
            catch (Exception ex)
            {
                ErrorNotification(ex.Message);
            }

            ModelState.Clear();

            return View(model);
        }

        [HttpPost]
        public ActionResult Order(OrderModel model, string action)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var order = model.ToEntity();
                    order.CreatedOn = DateTime.Now;

                    int result = this.orderService.PlaceOrder(order);

                    if (result > 0)
                    {
                        this.orderService.CreateInQueue(order);

                        return RedirectToAction("OrderStatus", new { id = result });
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

        public ActionResult OrderStatus(int? id)
        {
            var order = this.orderService.RetrieveOrder(id.GetValueOrDefault(0));

            if (order == null)
            {
                order = new Order { OrderStatus = "Unkown" };
            }

            var model = FillOrderModel(order.ToModel());

            return View(model);
        }

        /// <summary>
        /// 填充OrderModel相关字段属性，可数据库关联查询，这里简单处理
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        protected OrderModel FillOrderModel(OrderModel model)
        {
            var stations = this.stationService.GetLineStations();

            if (model.From.HasValue && model.To.HasValue)
            {
                model.FromStation = stations.FirstOrDefault(s => s.Id == model.From).Name;
                model.ToStation = stations.FirstOrDefault(s => s.Id == model.To).Name;
            }

            return model;
        }
    }
}
