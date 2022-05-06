

module.exports = class{
    
    static Update = (comment, dateTime, category, price, tittle, postId) => {
        return new Promise((resolve, reject) => {
            pool.query("update post set comment= ?, created_dt=?, category=?, price=?,tittle=? where id = ?", 
            [comment, dateTime, category, price, tittle, postId],
            (err, result)=>{
    
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