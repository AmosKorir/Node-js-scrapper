var express = require('express');
var app = express();
var cheerio = require("cheerio");
var request = require("request");
var admin = require('firebase');
var http=require('http');
var admin = require("firebase");
initfibase_db();
var db=admin.database()





function mainfunction(){
    request("https://www.1960tips.com/", function(error, response, html) {
   var $=cheerio.load(html);
   var array=[];
   var count=0;
     
    $('#tabletomoro>tbody>tr').each(function(i, element){
        if (count!=0){
            array.push({
        time:$(element).children().eq(0).text(),
        league:$(element).children().eq(2).text(),
        teams:$(element).children().eq(3).text(),
        prediction:$(element).children().eq(5).text()
        })}
        count++;
    } );
    array.splice(-1,1);
    upload(array);

});
}



app.get('/', mainfunction)

var server = app.listen(8090, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

function initfibase_db(){
    var serviceAccount = require("./nowfirebase-firebase-adminsdk-ogmpq-b0903bfe23.json");
    admin.initializeApp({
      databaseURL:'https://nowfirebase.firebaseio.com/'
  });
  log("Firebase init");
 }

function upload(params){
   var ref=db.ref('prediction/'+yyyymmdd()); 
  var m=0;
  for(;m<params.length;){
      var setter=ref.push();
      if(params[m].time.trim()==="View More >"){
          m=10000;           
      }else{
          setter.set(params[m]);          
      }  
  m++;
  }
log("data uploaded");
//setTimeout(exitfun,15000,"exit");
}

function log(params){
  console.log(params);
}

function exitfun(){
 creaprocess.exit(1);
}

function yyyymmdd() {
  var x = new Date();
  var y = x.getFullYear().toString();
  var m = (x.getMonth() + 1).toString();
  var d = (x.getDate()+1).toString();
  (d.length == 1) && (d = '0' + d);
  (m.length == 1) && (m = '0' + m);
  var yyyymmdd = y +"-" +m +"-"+ d;
  return yyyymmdd;
}