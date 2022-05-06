

module.exports = class{

    static answer = (no) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT no, content, dateTime FROM answer where no = ?",[no],
             (err, result)=>{
    
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
                console.log(result)
                resolve(result);
    
            })
        })
    }

    static write_answer = (no,content) => {
        return new Promise((resolve, reject)=>{
            pool.query('INSERT INTO answer(no, content, dateTime) VALUES(?,?)', [no, content],
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