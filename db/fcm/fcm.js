

module.exports = class{

    static  write_fcm = (id, fcm) => {
        return new Promise((resolve, reject)=>{
            pool.query("INSERT INTO fcmInfo(id, fcmNo) VALUES(?,?)", [id, fcm],
            (err, rows, fields)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     console.log(err)
                     return
                }
            
                resolve()
            });
        })
    }

    static get_fcm = (id) => {
        return new Promise((resolve, reject)=>{
            pool.query("select fcmNo from fcmInfo where id = ? ", [id],
            (err, result, fields)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     console.log(err)
                     return
                }
            
                resolve(result)
            });
        })
    }
}