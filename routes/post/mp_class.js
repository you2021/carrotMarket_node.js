

module.exports = class{
    
    static my_post = (id) => {
        return new Promise((resolve, reject)=>{
            pool.query("select id, user_id, tittle, image, comment, category, price, created_dt, city from post where user_id=? order by created_dt DESC" , [id],
            (err, result)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     return
                }
                resolve(result)
            });
        })
    }

    static getDetail = (num) => {
        return new Promise((resolve, reject) => {
            
            pool.query("SELECT id, user_id, tittle, image, comment, category, price, created_dt, city FROM post where id = ? ", [num], 
            (err, result) => {
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