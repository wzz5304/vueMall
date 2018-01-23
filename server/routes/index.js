var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $conf = require('../conf/conf');
// 使用连接池
var pool = mysql.createPool($conf.mysql);
router.use(express.static('public'));
// 查询商品列表
router.get('/list', function(req, res, next) {
  var sortNum = req.param('sort'); // 获取前台传过来的sort值
  var secContent = req.param('secContent');
  var page = parseInt(req.param('page')); // 获取前台传过来的page(第几页)值
  var pageSize = parseInt(req.param('pageSize')); // 获取前台传过来的pageSize(每页多少条)值
  var priceLevel = req.param('priceLevel'); // 获取前台传过来的priceLevel(价格区间)值
  var pageNum = (page-1)*pageSize;
  var priceGt = ''; //定义价格区间
  var priceLte = ''; //定义价格区间
  if(pageNum>=0){ //用于后台接口测试
    pageNum = pageNum;
  }else{
    pageNum = 0;
  }
  if(pageSize){ //用于后台接口测试
    pageSize = pageSize;
  }else{
    pageSize = 5;
  }
  switch (priceLevel) {
    case '0':
      priceGt = 0;
      priceLte = 500;
      break;
    case '1':
      priceGt = 500;
      priceLte = 1000;
      break;
    case '2':
      priceGt = 1000;
      priceLte = 2000;
      break;
    case '3':
      priceGt = 2000;
      priceLte = 5000;
      break;
    case '4':
      priceGt = 5000;
      priceLte = 10000;
      break;
    case 'all':
      priceGt = 0;
      priceLte = 999999;
      break;
    default:
      priceGt = '';
      priceLte = '';
      break;
  }
  if(pool) {
    var sort = '';
    if (sortNum === '1') {
      sort = 'asc';
    }else if(sortNum === '0') {
      sort = 'desc';
    }else{
      sort = 'desc';
    }
  if(priceLevel == 'all' && sortNum=='') {
    var sql = `select * from goods order by id asc limit ${pageNum},${pageSize}`;
  } else{
    var sql = `select * from goods where productPrice>${priceGt} and productPrice<=${priceLte} order by productPrice ${sort} limit ${pageNum},${pageSize}`;
  }
    pool.query(sql,(err, result) => {
      if (err) {
        // res.send(err.message);
        res.json({
          status:'-1',
          msg:err.message,
          pageNum:pageNum
        });
      } else {
        // res.send( JSON.stringify(result));
        res.json({
          status:'1',
          msg:'',
          sort:sort,
          pageNum:pageNum,
          data:{
            count:result.length,
            list:result
          }
        });
      }
    });
    console.log('succee');
  }else{
    console.log('err');
  }
});

// 搜索框接口
router.get('/searchData', (req, res, next) => {
  var secContent = req.param('secContent');
  var page = parseInt(req.param('page')); // 获取前台传过来的page(第几页)值
  var pageSize = parseInt(req.param('pageSize')); // 获取前台传过来的pageSize(每页多少条)值
  var pageNum = (page-1)*pageSize;
  var sql = `select * from goods where productName LIKE '%${secContent}%' or productDetails LIKE '%${secContent}%'`;
  pool.query(sql, (err, result) => {
    if(err) {
      res.json({
        status:'-1',
        msg:err.message
      });
    } else {
      res.json({
        status:'1',
        msg:'',
        result:result
      });
    }
  });

});
// 加入购物车
router.get('/addCart', function (req, res) {
  var productId = parseInt(req.param('productId')); // 获取前台传过来的productId值
  var productNum = parseInt(req.param('productNum')); // 获取前台传过来的productId值
  // var username = '123456@qq.com';
  if(pool) {
    var sql = `select * from goods where productId=${productId}`;
    pool.query(sql,(err, result) => {
        if (err) {
          res.json({
            status:'-1', // 数据库连接错误
            msg:err.message,
            result:''
          });
        } else {
          /*res.json({
            status:'0',
            msg:'',
            data:{
              list:result
            }
          });*/
          let userId = req.cookies.userId;
          let proId = result[0].productId; 
          let proName = result[0].productName;
          let proPrice = result[0].productPrice;
          let checked = '1';
          // let proNum = 1;
          let proImg = result[0].productImg;
          let totalMoney = proPrice*productNum;
          let mSql =`select * from cartlist where productId=${productId}`;
          pool.query(mSql, (err,result) => {
            if (err) {
              res.json({
                status:'-1',
                msg:err.message,
                result:''
              });
            } else{
              if(result.length === 0) {
                let sql = `insert into cartlist(userId,productId,productName,productPrice,checked,productNum,productImg,totalPrice) values('${userId}','${proId}','${proName}','${proPrice}','${checked}','${productNum}','${proImg}','${totalMoney}')`;
                pool.query(sql,(err,result) => {
                  if (err) {
                    res.json({
                    status:'0',
                    msg:err.message,
                    result:''
                  });
                  }else{
                    res.json({
                      status:'1',
                      msg:'添加购物车成功!',
                      result:result
                    });
                  }
                });
              } else{
                let proNum = result[0].productNum + productNum;
                let proPrice = result[0].productPrice;
                let cId = result[0].cartId;
                let totalMoney = proNum*proPrice;
                let sql = `update cartlist set productNum=${proNum},totalPrice=${totalMoney} where cartId=${cId}`;
                pool.query(sql, (err,result) => {
                  if(err) {
                    res.json({
                      status:'0',
                      msg:err.message,
                      result:''
                    });
                  } else{
                    res.json({
                      status:'1',
                      msg:'添加购物车成功!',
                      result:''
                    });
                  }
                });
              }
            }
          });
        }
    });
  }
});

//查看商品详情
router.get('/getDetails', (req,res,next) => {
  let productId = parseInt(req.param('productId')); // 获取前台传过来的productId值
  let sql = `select * from goods where productId=${productId}`;
  pool.query(sql, (err, result) => {
    if(err) {
      res.json({
        status:'0',
        msg:err.message
      });
    } else {
      res.json({
        status:'1',
        msg:'',
        result:result
      });
    }
  });
})
module.exports = router;