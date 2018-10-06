var cheerio = require("cheerio");
var request = require("request");
var admin = require('firebase');

request("", function(error, response, html) {
  //console.log(html);
  var $=cheerio.load(html);
  var array=[];
  
  

      var count=0;
     
    $('#tabletoday>tbody>tr').each(function(i, element){
        if (count!=0){
            array.push({
        time:$(element).children().eq(0).text(),
        legue:$(element).children().eq(2).text(),
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

      
    });
    
    log("Firebase init");
     upload(array);


}
function upload(params){
    var db=admin.database();
    var ref=db.ref('prediction');
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
  setTimeout(exitfun,1500,"exit");
}

function log(params){
    console.log(params);
}

function exitfun(){
    process.exit(1);
}