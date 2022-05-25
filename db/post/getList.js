

module.exports = class{
    
    static getList = (city) => {
        return new Promise((resolve, reject) => {
            
            pool.query("SELECT id, user_id, tittle, image, comment, category, price, created_dt, city FROM post where city = ? order by created_dt DESC", 
            [city], 
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

    static get_city = (id) => {
        return new Promise((resolve, reject) => {
            pool.query(`select city from user_info where ui_id=?`, [id],
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