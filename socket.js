
module.exports = (io)=>{

    const router = require('express').Router();
    let my_id = null, your_id =null

    io.on('connection', (request) => { 
        /* … */
       
        let room_ = null
        request.on("init", (room)=>{
            room_ = room
            request.join(room_)
            chat_room(room_, my_id, your_id)
        })

        request.on('chatting', (msg, id_)=>{
            console.log("e")
            io.to(room_).emit("chatting", {msg, id:id_, room: room_})
            chat_user(room_, my_id, msg)
        })

    });

    router.post("/",async(req, res)=> {
        const cookieJson = JSON.parse(req.cookies.key)
        my_id = cookieJson.id
        your_id = req.body.your_id

        console.log(`${my_id} : ${your_id}`)
        
        if(my_id == null) return res.status(200).send({status:"failed", code:"2222"}) 
        res.status(200).send({status:"success", code:"2222"})
    } )


    return router

}

let chat_room = (room, my_id, your_id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO chat_room(room, my_id, your_id) VALUES("${room}","${my_id}","${your_id}")`,
        function(err, rows, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve()
        });
    })
}

let chat_user = (room, my_id_, content) => {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO chat_user(room, id, comment) VALUES("${room}","${my_id_}","${content}")`,
        function(err, rows, fields){
            if(err){ 
                 `err : ${console.log(err)} `;
                 reject(err)
                 return
            }
            resolve()
        });
    })
}