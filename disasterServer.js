var express = require('express')
var db = require('./db');
var app = express()
var bodyParser = require('body-parser')

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
// Add headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});  
app.post('/filterCondition', function (req, res) { 
  var intYear = parseInt(req.body.year)
  var condition = checkClassYear(req.body.condition,intYear)

  var query = "SELECT * from "+condition+" where Year = '"+req.body.year+"' and Month = '"+req.body.month+"'";  
  var fullrr = []; 
  db.queryFunc(query,function(rows){ 
    for(var i=0; i<=rows.length-1; i++){ 
      rows[i].type = req.body.condition
	    fullrr.push(rows[i]);
    }  
    res.send(JSON.stringify(fullrr))  
  });

})
 

app.post('/filterChartsPie', function (req, res) {
  var intYear = parseInt(req.body.year)
  var condition = checkClassYear(req.body.condition,intYear)
 
    var query = "SELECT Month,Value from "+condition+" where Year = '"+req.body.year+"' and District = '"+req.body.district+"'";  
    var fullrr = []; 
    db.queryFunc(query,function(rows){ 
      for(var i=0; i<=rows.length-1; i++){  
        fullrr.push({
          name : rows[i].Month,
          y : parseFloat(rows[i].Value)
        });
      }
      res.send(JSON.stringify(fullrr))   
    }) 
  })

  app.post('/filterChartsBar', function (req, res) {       
      var scaleNum = parseInt(req.body.scaleNum)
      var fullrr = {
        barData :[],
        xAxis :[]
      }
      if (scaleNum == 3) {
        scale1Func(req.body,function(scale1Obj,axisArr){
          fullrr.barData.push(scale1Obj);
          fullrr.xAxis = axisArr;
          scale2Func(req.body,function(scale2Obj){
            fullrr.barData.push(scale2Obj);
            scale3Func(req.body,function(scale3Obj){
              fullrr.barData.push(scale3Obj);
              res.send(JSON.stringify(fullrr)) 
            })
          })
        })
      }else if(scaleNum == 2){
        scale1Func(req.body,function(scale1Obj,axisArr){
          fullrr.barData.push(scale1Obj);
          fullrr.xAxis = axisArr;
          scale2Func(req.body,function(scale2Obj){
            fullrr.barData.push(scale2Obj);
            res.send(JSON.stringify(fullrr)) 
          })
        })
      }else if(scaleNum == 1){ 
        scale1Func(req.body,function(scale1Obj,axisArr){
          fullrr.barData.push(scale1Obj);
          fullrr.xAxis = axisArr;
          res.send(JSON.stringify(fullrr)) 
        })
      }
  })

    function scale1Func(reqBody,callback){
      var query ="";
      var con ="";
      var axisArr = []; 
      var fullrr ={
        data : [],
        id : reqBody.scale1
      }

      if (reqBody.XAxsis == "Months") {
        con = checkClassYear(reqBody.scale1,parseInt(reqBody.XAxsisAddition)) 
        query = "SELECT Month,Value from "+con+" where Year = '"+reqBody.XAxsisAddition+"' and District = '"+reqBody.district+"'";
        axisArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        db.queryFunc(query,function(rows){ 
          for(var i=0; i<=rows.length-1; i++){  
            fullrr.data.push({
              name : rows[i].Month,
              y : parseFloat(rows[i].Value)
            });
          }
          callback(fullrr,axisArr)   
        }) 
      }else if(reqBody.XAxsis == "Years"){
        con = checkClassMonth(reqBody.scale1) 
        query = "SELECT Year,Value from "+con+" where Month = '"+reqBody.XAxsisAddition+"' and District = '"+reqBody.district+"'";
        axisArr = ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"]
        db.queryFunc(query,function(rows){ 
          for(var i=0; i<=rows.length-1; i++){  
            fullrr.data.push({
              name : rows[i].Year,
              y : parseFloat(rows[i].Value)
            });
          }
          callback(fullrr,axisArr)   
        }) 
      }
    }

    function scale2Func(reqBody,callback){
      var query ="";
      var con ="";

      var fullrr ={
        data : [],
        id : reqBody.scale2
      }
      if (reqBody.XAxsis == "Months") {
        con = checkClassYear(reqBody.scale2,parseInt(reqBody.XAxsisAddition))
        query = "SELECT Month,Value from "+con+" where Year = '"+reqBody.XAxsisAddition+"' and District = '"+reqBody.district+"'";
        db.queryFunc(query,function(rows){ 
          for(var i=0; i<=rows.length-1; i++){  
            fullrr.data.push({
              name : rows[i].Month,
              y : parseFloat(rows[i].Value)
            });
          }
          callback(fullrr)   
        }) 
      }else if(reqBody.XAxsis == "Years"){
        con = checkClassMonth(reqBody.scale2)
        query = "SELECT Year,Value from "+con+" where Month = '"+reqBody.XAxsisAddition+"' and District = '"+reqBody.district+"'";
        db.queryFunc(query,function(rows){ 
          for(var i=0; i<=rows.length-1; i++){  
            fullrr.data.push({
              name : rows[i].Year,
              y : parseFloat(rows[i].Value)
            });
          }
          callback(fullrr)   
        }) 
      } 
    }

    function scale3Func(reqBody,callback){
      var query ="";
      var con ="";
      var fullrr ={
        data : [],
        id : reqBody.scale3
      }
      if (reqBody.XAxsis == "Months") {
        con = checkClassYear(reqBody.scale3,parseInt(reqBody.XAxsisAddition))
        query = "SELECT Month,Value from "+con+" where Year = '"+reqBody.XAxsisAddition+"' and District = '"+reqBody.district+"'";
        db.queryFunc(query,function(rows){ 
          for(var i=0; i<=rows.length-1; i++){  
            fullrr.data.push({
              name : rows[i].Month,
              y : parseFloat(rows[i].Value)
            });
          }
          callback(fullrr)   
        }) 
      }else if(reqBody.XAxsis == "Years"){
        con = checkClassMonth(reqBody.scale3)
        query = "SELECT Year,Value from "+con+" where Month = '"+reqBody.XAxsisAddition+"' and District = '"+reqBody.district+"'";
        db.queryFunc(query,function(rows){ 
          for(var i=0; i<=rows.length-1; i++){  
            fullrr.data.push({
              name : rows[i].Year,
              y : parseFloat(rows[i].Value)
            });
          }
          callback(fullrr)   
        }) 
      } 
    }

    function checkClassYear(classCondition,intYear){
      var condition = "";

      switch(classCondition){
        case "Rainfall" :
          if(intYear > 2015)
            condition = "rainfall_forcast";
          else 
            condition = "rainfall_past";
          break;
        case "Temparature" :
          if(intYear > 2015)
            condition = "tempurature_forcast";
          else
            condition = "tempurature_past";
          break;
        case "Wind" :
          if(intYear > 2015)
            condition = "wind_forcast";
          else
            condition = "wind_past";
          break;
        case "Humidity" :
          if(intYear > 2015)
            condition = "humidity_forcast";
          else
            condition = "humidity_past";
          break;

        default :
          console.log("no such condition")

        }

        return condition;
    }

    function checkClassMonth(classCondition){
      var condition = "";

      switch(classCondition){
        case "Rainfall" :
          condition = "rainfall_past";
          break;
        case "Temparature" :
          condition = "tempurature_past";
          break;
        case "Wind" :
          condition = "wind_past";
          break;
        case "Humidity" :
          condition = "humidity_past";
          break;

        default :
          console.log("no such condition")

        }
        return condition;
    }
 
 
 


 

  