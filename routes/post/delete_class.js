

module.exports = class{

    static getDelete = (postId) => {
        return new Promise((resolve, reject) => {
            pool.query("delete from post where id = ?",[postId],  (err, result)=>{
    
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
            
                resolve();
    
            })
        })
    }
}