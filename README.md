﻿# ttb-protype
本项目是一个参考nopCommerce项目进行分层设计的火车票订票系统演示原型.

# 关于开发环境：
1、DB：mysql-5.6.21-winx64
2、IDE:Visual Studio 2013
3、KV：Redis-x64-2.8.2104（启动报错时注意显式标明maxheap）

# 关于部署调试：
1、执行数据库脚本“DB-Init.sql”
2、确保“TrainTicketsBooking.Web”项目配置文件数据库连接与本机一致.

# 关于参考第三方组件：
1、项目主要设计结构参考借鉴nopCommerce开源项目，包括EngineContext、TypeFinder等源文件的直接使用以及关于autofac、autofac.mvc、automapper、FluentValidation等开源组件的使用方式.
http://www.nopcommerce.com/

2、数据库访问组件基于petapoco项目基础上改造并集成.
http://www.toptensoftware.com/petapoco/license

3、前端CSS主题样式复制于基于bootstrap的seantheme.
http://www.seantheme.com/color-admin-v1.9/admin/html/index_v2.html
