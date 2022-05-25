

module.exports = class{

    static getList = (type) => {
        return new Promise((resolve, reject) => {
            pool.query("select no, type, contents, time from town where type=?", [type],
            function(err, result){
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
                resolve(result);
    
            })
        })
    }
  
}