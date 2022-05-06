

module.exports = class{

    static write_join = (ui_id, ui_pw, ui_name, city) => {
        return new Promise((resolve, reject)=>{
            pool.query('INSERT INTO user_info(ui_id, ui_pw, ui_name, city) VALUES(?,?,?,?)',
            [ui_id, ui_pw, ui_name, city],
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
    
    static idCheck = (id) => {
        return new Promise((resolve, reject)=>{
            pool.query("select ui_id from user_info where ui_id = ? ", [id],
            (err, result)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     return
                }
                resolve(result);
            });
        })
      }
}