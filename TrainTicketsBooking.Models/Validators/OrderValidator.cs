using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using FluentValidation;
using TrainTicketsBooking.Models;

namespace TrainTicketsBooking.Models.Validators
{
    public class OrderValidator: AbstractValidator<OrderModel>
    {
        public OrderValidator()
        {
            RuleFor(x => x.UserName).NotEmpty().WithMessage("请填写乘车人姓名");

            RuleFor(x => x.UserIdCardNo).NotEmpty().WithMessage("请填写乘车人身份证号");

            RuleFor(x => x.Phone).NotEmpty().WithMessage("请填写乘车人手机号码");
        }
    }
}