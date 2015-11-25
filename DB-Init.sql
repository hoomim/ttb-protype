create database ticketsbooking default character set = utf8;

CREATE TABLE `station` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL COMMENT '车站名称',
  `Code` varchar(45) DEFAULT NULL COMMENT '车站代码',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='车站信息表';

INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('北京西', 'BEIJINGXI', '1');
INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('保定东', 'BAODINGDONG', '2');
INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('石家庄', 'SHIJIAZHUANG', '3');
INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('郑州东', 'ZHENGZJOUDONG', '4');
INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('武汉', 'WUHAN', '5');
INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('长沙南', 'CHANGSHANAN', '6');
INSERT INTO `ticketsbooking`.`station` (`Name`, `Code`, `Order`) VALUES ('广州南', 'GUANGZHOUONAN', '7');

CREATE TABLE `order` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `From` int(11) DEFAULT NULL COMMENT '起始站',
  `To` int(11) DEFAULT NULL COMMENT '到达站',
  `UserName` varchar(45) DEFAULT NULL COMMENT '订票用户名称',
  `UserIdCardNo` varchar(45) DEFAULT NULL COMMENT '订票用户身份证号码',
  `Phone` varchar(45) DEFAULT NULL COMMENT '手机号码',
  `CreatedOn` datetime DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `FROM_STATION_idx` (`From`),
  KEY `TO_STATION_idx` (`To`),
  CONSTRAINT `FROM_STATION` FOREIGN KEY (`From`) REFERENCES `station` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `TO_STATION` FOREIGN KEY (`To`) REFERENCES `station` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车票订单信息表';
