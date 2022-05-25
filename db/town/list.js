

module.exports = class{

    static getList = () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT no, type, contents, time FROM town order by time DESC', 
            (err, result)=>{
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