-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-13 09:32:33
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `malldata`
--

-- --------------------------------------------------------

--
-- 表的结构 `addresslist`
--
drop table if exists addresslist
CREATE TABLE IF NOT EXISTS `addresslist` (
  `addressId` int(16) NOT NULL AUTO_INCREMENT,
  `userId` varchar(64) NOT NULL,
  `userName` varchar(64) NOT NULL,
  `streetName` varchar(256) NOT NULL,
  `postCode` int(32) NOT NULL,
  `tel` varchar(32) NOT NULL,
  `isDefault` tinyint(1) NOT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

--
-- 转存表中的数据 `addresslist`
--

INSERT INTO `addresslist` (`addressId`, `userId`, `userName`, `streetName`, `postCode`, `tel`, `isDefault`) VALUES
(10001, '123456', '吴大大', '深圳市龙岗区万科四季花城', 518116, '18842687533', 0),
(10002, '123456', '廖大大', '福建省三明市梅列区江滨号院', 366100, '18888886688', 0),
(10004, '123456', '李大大', '广东省深圳市龙岗区天安云谷', 518116, '18888886611', 1),
(10005, '123456', '李白', '广东省深圳市福田区篱笆旁', 88888888, '6666666', 0),
(10006, '18842687533', '吴大大', '广东省深圳市龙岗区四季花城', 5611000, '18842687555', 0),
(10008, '18842687533', '廖大大', '辽宁省大连市高新区因特摩尔1019', 116000, '88888888', 0),
(10009, '18842687533', '余大大', '辽宁省大连市高新区数码广场软景e居2013', 116000, '66666666', 1),
(10010, '18842687533', 'json', '四川省成都市天府软件园11栋20楼', 99999999, '99999999', 0);

-- --------------------------------------------------------

--
-- 表的结构 `cartlist`
--
drop table if exists cartlist
CREATE TABLE IF NOT EXISTS `cartlist` (
  `cartId` int(16) NOT NULL AUTO_INCREMENT,
  `userId` varchar(64) NOT NULL,
  `productId` int(32) NOT NULL,
  `productName` varchar(128) NOT NULL,
  `productPrice` int(32) NOT NULL,
  `checked` varchar(32) NOT NULL,
  `productNum` int(32) NOT NULL,
  `productImg` varchar(256) NOT NULL,
  `totalPrice` varchar(64) NOT NULL,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--
drop table if exists goods
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `productId` int(32) NOT NULL,
  `productName` varchar(128) NOT NULL,
  `productPrice` int(32) NOT NULL,
  `checked` varchar(32) NOT NULL DEFAULT '0',
  `productNum` int(32) NOT NULL,
  `productImg` varchar(256) NOT NULL,
  `sub_title` varchar(128) NOT NULL,
  `limit_num` int(16) NOT NULL,
  `desc` varchar(256) NOT NULL,
  `descImg` varchar(32) NOT NULL,
  `productDetails` varchar(126) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `productId`, `productName`, `productPrice`, `checked`, `productNum`, `productImg`, `sub_title`, `limit_num`, `desc`, `descImg`, `productDetails`) VALUES
(1, 10001, '小米6', 2499, '0', 0, 'mi6.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', 'xiaomi6.jpg', '小米6 全网通 4GB+64GB 亮黑色 移动联通电信4G手机 双卡双待 小米6变焦双'),
(2, 10002, '小米笔记本', 3999, '0', 0, 'note.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', 'xiaomi-matebook.jpg', '小米(MI)Air 13.3英寸全金属轻薄笔记本电脑(i5-7200U 8G 256G固态硬盘 全高清屏 背光键盘 Win10)银'),
(3, 10003, '小米音响', 199, '0', 0, '1.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '小米（MI）小钢炮蓝牙音箱2 迷你便携音响 户外蓝牙音响 免提通话（黑色）'),
(4, 10004, 'Leme1', 1999, '0', 0, '3.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '乐视（Letv） 无线头戴式 Leme蓝牙耳机2代 EB30 无线蓝牙4.1耳机包邮 红色'),
(5, 10005, '乐视盒子', 299, '0', 0, '5.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '乐视TV（Letv） 乐视盒子U4 Pro 3D 4K 四核高清电视硬盘播放器网络机顶盒 裸机版U4（不含影视会员）'),
(6, 10006, '小米插座', 99, '0', 0, '6.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '小米（MI）插排插线板 多功能接线板3/5孔插座拖线板米家6位排插企业办公定制LOGO刻字 米家插线板6位基础版-白色'),
(7, 10007, '小米耳机', 199, '0', 0, '7.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '小米（MI）耳机 小米活塞耳机 炫彩版 星空钛版耳机适用于红米NOTE华为系列 基础版-粉色'),
(8, 10008, '小米硬盘400G', 1999, '0', 0, '8.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '小米硬盘400G'),
(9, 10009, '小米智能电饭煲', 599, '0', 0, '9.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '米家（MIJIA）小米智能电饭煲 米家IH电饭煲 电磁环绕加热 4L容量 PFA粉体涂层'),
(10, 10010, '小米TV', 5999, '0', 0, '10.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '做高性能的好电视，让你的娱乐体验更畅快', 'xiaomi-tv.jpg', '小米（MI）小米电视4 L55M5-AB 55英寸 2GB+8GB 4.9mm超薄 4K超高清智能液晶平板电视机（黑色）'),
(11, 10011, 'Leme2', 1999, '0', 0, '4.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '乐视（Letv） 无线头戴式 Leme蓝牙耳机2代 EB30 无线蓝牙4.1耳机包邮 尊贵黑'),
(12, 10012, '数据线', 59, '0', 0, '15.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '品胜（PISEN）苹果数据线 8/7/6/5s手机充电线 1.2米 白色 适用于iphone5/5s/6/6s/Plus/7/8/X/iPad/Air/Pro'),
(13, 10013, '智能摄像头', 999, '0', 0, 'photo.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '萤石 EZVIZ C6升级版 摄像头 云台智能网络摄像机 语音交互 wifi远程监控防盗摄像头 家居无线摄像头ip camera 海康威视 旗下品牌'),
(14, 10014, '小米平衡车', 1999, '0', 0, 'pingheng.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '小米（MI） 定制版Ninebot 九号平衡车 智能代步电动体感车（白）'),
(15, 10015, '自拍杆', 34, '0', 0, 'zipai.jpg', '此仅为支付测试商品 拍下不会发货\n', 10, '', '', '荣耀自拍杆轻巧便携自拍即插即用手机通用AF11L（黑色）'),
(16, 10016, 'iphoneX', 8388, '0', 0, 'iphoneX.jpg', '【256G银9088！国行正品,京东配送】', 10, '', 'iphoneX.jpg', 'Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机');

-- --------------------------------------------------------

--
-- 表的结构 `orderlist`
--
drop table if exists orderlist
CREATE TABLE IF NOT EXISTS `orderlist` (
  `orderId` varchar(128) NOT NULL,
  `userId` varchar(64) NOT NULL,
  `productId` int(32) NOT NULL,
  `productName` varchar(128) NOT NULL,
  `productPrice` int(32) NOT NULL,
  `productNum` int(32) NOT NULL,
  `productImg` varchar(256) NOT NULL,
  `totalPrice` varchar(64) NOT NULL,
  `streetName` varchar(256) NOT NULL,
  `postName` varchar(32) NOT NULL,
  `postCode` varchar(32) NOT NULL,
  `tel` varchar(32) NOT NULL,
  `itemPrice` varchar(32) NOT NULL,
  `discount` varchar(32) NOT NULL COMMENT '折扣',
  `shipPrice` varchar(32) NOT NULL COMMENT '配送费',
  `freightRisk` varchar(32) NOT NULL COMMENT '运费险',
  `createDate` varchar(32) NOT NULL,
  `ifPay` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `orderlist`
--

INSERT INTO `orderlist` (`orderId`, `userId`, `productId`, `productName`, `productPrice`, `productNum`, `productImg`, `totalPrice`, `streetName`, `postName`, `postCode`, `tel`, `itemPrice`, `discount`, `shipPrice`, `freightRisk`, `createDate`, `ifPay`) VALUES
('6226201801101639364', '18842687533', 10002, '小米笔记本', 3999, 1, 'note.jpg', '3999', '辽宁省大连市高新区数码广场软景e居2013', '余大大', '116000', '66666666', '3999', '13.2', '0', '5', '2018-01-10 16:39:36', 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--
drop table if exists user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `userId` varchar(64) NOT NULL,
  `userName` varchar(64) NOT NULL,
  `userPwd` varchar(64) NOT NULL,
  `myPhoto` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `userId`, `userName`, `userPwd`, `myPhoto`) VALUES
(1, '123456', '冷色调16', 'qwer1234', 'user-avatar'),
(6, '18842687533', '李好', 'qwer1234', ''),
(8, '15506914894', '暖管~', 'qwer1234', ''),
(9, '18742590628', 'json', 'qwer1234', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
