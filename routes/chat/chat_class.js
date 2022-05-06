

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
}