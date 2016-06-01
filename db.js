var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',  
  database : 'disasterforecast'
});
 

exports.queryFunc = function(querys,callback){ 
  connection.query(querys, function(err, rows, fields) {
   if (!err){ 
      callback(rows);	  
   }
   else
     console.log('Error while performing Query.');
    
   connection = mysql.createConnection({
      host     : '127.0.0.1',
      user     : 'root',
      password : '',  
      database : 'disasterforecast'
   });
  });
}




