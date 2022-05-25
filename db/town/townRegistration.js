

module.exports = class{

    static write = (type, contents) => {
        return new Promise((resolve, reject)=>{
            pool.query("INSERT INTO town(type, contents) VALUES(?,?)", [type, contents],
            function(err, rows, fields){
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
}