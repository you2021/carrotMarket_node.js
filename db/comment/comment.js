

module.exports = class{

    static  getCommentList = (postId) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT id, post_id, user_id, comment FROM comment where post_id = ?",[postId], (err, result)=>{
    
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
            
                resolve(result);
    
            })
        })
    }

    static write_comment = (postId, userId, comment) => {
        return new Promise((resolve, reject)=>{
            pool.query('INSERT INTO comment(post_id, user_id, comment) VALUES(?,?,?)', [postId, userId, comment],
            (err, result)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     return
                }
                resolve()
            });
        })
    }
}