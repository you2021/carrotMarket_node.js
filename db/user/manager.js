

module.exports = class{

    static  knowManager = (ui_id) => {
        return new Promise((resolve, reject) => {
            pool.query("select manager from user_info where ui_id = ?", [ui_id],
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