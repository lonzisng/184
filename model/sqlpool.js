const mysql = require("mysql");

module.exports.sqlpool = (sql,arr,callback)=>{
    "use strict"
    let pools={
        config:{
            host:"localhost",
            user:"root",
            password:"w12345",
            port:3306,
            database:"xsj"
            // host:"172.16.6.31",
            // user:"root",
            // password:"w12345",
            // port:3306,
            // database:"xsj"
        },
        qurey:(sql,arr,callback)=>{
            let pool=mysql.createPool(pools.config);
            pool.getConnection((err,connect)=>{
                if(!err){
                    connect.query(sql,arr,callback);
                    connect.release(); 
                }
            })
        }
    }
    pools.qurey(sql,arr,callback);
}