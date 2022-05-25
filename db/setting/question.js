

module.exports = class{

    static get_question = () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT no, user_id, tittle, content, dateTime FROM question', (err, result)=>{
    
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
                resolve(result);
    
            })
        })
    }

    static write_question = (user_id, tittle, content) => {
        return new Promise((resolve, reject)=>{
            pool.query('INSERT INTO question(user_id, tittle, content, dateTime) VALUES(?,?,?)',
            [user_id,tittle, content],
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