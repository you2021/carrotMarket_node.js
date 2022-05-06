

module.exports = class{
    
    static write_favorite = (postId, check, userId) => {
        return new Promise((resolve, reject)=>{
            pool.query("INSERT INTO favorite(postId, check_in, userId) VALUES(?,?,?)", [postId, check, userId],
            (err, rows, fields)=>{
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

    static favorite_check = (id, postId) => {
        return new Promise((resolve, reject)=>{
            pool.query("select check_in from favorite where userId=? and postId=?",[id, postId],
            (err, result)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     console.log(err)
                     return
                }
                console.log(result)
              
                resolve(result)
            });
        })
    }

    static favorite_delete = (postId) => {
        return new Promise((resolve, reject)=>{
            pool.query("DELETE FROM favorite where postId=? ", [postId],
            (err, rows, fields)=>{
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