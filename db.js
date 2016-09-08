var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',  
  database : 'disasterforecast'
});
 
connection.connect(function(err, callback) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});


exports.queryFunc = function(querys,callback){ 

  connection.query(querys, function(err, rows, fields) {
   if (!err){ 
      callback(rows);	  
   }
   else
     console.log('Error while performing Query ' + err);
      
      connection.end(function(err) {
        if(err) {
            console.log(err.message);
        }
      });
      connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',  
        database : 'disasterforecast'
      });
      connection.connect(function(err, callback) {
          if (err) {
              console.error('error connecting: ' + err.stack);
              return;
          }
      });
  });
}




