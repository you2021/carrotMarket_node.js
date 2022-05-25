

module.exports = class{
    
    static get_favorite = () => {
        return new Promise((resolve, reject)=>{
            pool.query("select ps.id, ps.user_id, ps.tittle, ps.image, ps.comment, ps.category, ps.price, ps.created_dt, ps.city from TESTDB.favorite as fv left join TESTDB.post as ps ON ps.id = fv.postId " ,
            (err, result, fields)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     return
                }
                resolve(result)
            });
        })
    }
    
}