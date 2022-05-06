

module.exports = class{

    static get_notice = () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT no, tittle, content, dateTime FROM notice', (err, result)=>{
    
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
                resolve(result);
    
            })
        })
    }

    static write_notice = (tittle, content) => {
        return new Promise((resolve, reject)=>{
            pool.query('INSERT INTO notice(tittle, content, dateTime) VALUES(?,?)', [tittle, content],
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