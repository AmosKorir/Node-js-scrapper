var cheerio = require("cheerio");
var request = require("request");
var admin = require('firebase');

request("https://www.1960tips.com/", function(error, response, html) {
  
  var $=cheerio.load(html);
  var array=[];
  
  

      var count=0;
     
    $('#tabletoday>tbody>tr').each(function(i, element){
        if (count!=0){
            array.push({
        time:$(element).children().eq(0).text(),
        league:$(element).children().eq(2).text(),
        teams:$(element).children().eq(3).text(),
        prediction:$(element).children().eq(5).text()
        })}
        count++;
    } )
    array.splice(-1,1);
  
  
  
   initfibase_db(array);
     
 

})

function initfibase_db(array){
      var admin = require("firebase");
      var serviceAccount = require("./nowfirebase-firebase-adminsdk-ogmpq-b0903bfe23.json");
      admin.initializeApp({
        databaseURL:'https://nowfirebase.firebaseio.com/'
    });
  
    log("Firebase init");
     upload(array);


}
function upload(params){
    var db=admin.database();
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
  setTimeout(exitfun,15000,"exit");
}

function log(params){
    console.log(params);
}

function exitfun(){
    process.exit(1);
}

function yyyymmdd() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y +"-" +m +"-"+ d;
    return yyyymmdd;
}