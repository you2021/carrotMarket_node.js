

module.exports = class{

    static getchat_room = (id) => {
        return new Promise((resolve, reject) => {
            pool.query("select roomKey, my_id, your_id, dateTime from chat_room where my_id = ? or your_id =?",[id,id], (err, result)=>{
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
                resolve(result);
            })
        })
    }

    static getchat_user = (room) => {
        return new Promise((resolve, reject) => {
            pool.query("select room, id, comment, dateTime from chat_user where room = ? order by dateTime asc", [room],
                    (err, result)=>{
    
                if(err){
                    `err : ${console.log(err)}`
                    reject(err)
                    return
                }
                resolve(result);
    
            })
        })
    }

    static chat_room = (room, my_id, your_id) => {
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO chat_room(roomKey, my_id, your_id) VALUES(?,?,?)`,[room,my_id,your_id],
            (err, rows, fields)=>{
                if(err){ 
                     `err : ${console.log(err)} `;
                     reject(err)
                     return
                }
                resolve()
            });
        })
    }

    static chat_user = (room, my_id_, content) => {
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO chat_user(room, id, comment) VALUES(?,?,?)`,[room, my_id_, content],
            (err, rows, fields)=>{
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

