

module.exports = class{

    static login_query = (id, pass) => {
        return new Promise((resolve, reject)=>{
          pool.query('select ui_name from user_info where ui_id = ? and ui_pw=? ',[id, pass],
            (err, result) =>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     return
                }
                resolve(result);
            });
        })
      }
      
    static getUpdateUserInfoCity = (ui_id, city) => {
        return new Promise((resolve, reject) => {
            pool.query("update user_info set city=? where ui_id= ? ", [ui_id, city],
            (err, result) => {
    
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