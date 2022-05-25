const mysql2 = require('mysql2');
require('dotenv').config({path:'./.env.development'}) 
if(process.env.NODE_ENV == "production")
  require('dotenv').config({path:'./.env.production'}) 

let pool =  mysql2.createPool({

  host : process.env.db_host,
  user : process.env.db_user,
  password : process.env.db_passwd,
  database : process.env.db_database,
  connectionLimit : 1

});
global.pool = pool