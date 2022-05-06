

module.exports = class{
    
    static write_post = (id, tittle, image, comment, category, price, city) => {
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO post(user_id, tittle, image, comment, category, price, city) VALUES(?,?,?,?,?,?,?)`, [id, tittle, image, comment, category, price, city],
            (err, rows)=>{
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