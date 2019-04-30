const mysql = require("mysql");

module.exports.sqlpool = (sql,arr,callback)=>{
    "use strict"
    let pools={
        config:{
            host:"172.16.6.54",
            user:"root",
            password:"password",
            port:3306,
            database:"xsj"
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