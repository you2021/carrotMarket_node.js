

module.exports = class{

    static getUpdateUserInfo = (ui_id, ui_pw, ui_name) => {
        return new Promise((resolve, reject) => {
            pool.query("update user_info set ui_pw=?, ui_name=? where ui_id= ? ", [ui_id, ui_pw, ui_name],
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

    static getUpdateUserInfoCity = (ui_id, city) => {
        return new Promise((resolve, reject) => {
            pool.query("update user_info set city=? where ui_id= ? ", [ui_id, city],
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