
module.exports = (io)=>{

    const router = require('express').Router();
    const auth = require('./routes/auth')

    io.on('connection', (request) => { 
        /* … */
       
        let room_ = null, id_ = null
        request.on("init", (room)=>{
            room_ = `chat_p_${room}`
            request.join(room_)
        })

        request.on('chatting', (msg)=>{
            console.log("e")
            io.to(room_).emit("chatting", {msg, id:id_, room: room_})
        })

    });

    // router.post("/",async(req, res)=> {
    //     if(req.cookies.key == null)return res.status(401).send()
    //     const cookieJson = auth.decode_cookie(req.cookies.key)

    //     const my_id = JSON.parse(cookieJson.key).id
    //     const your_id = req.body.your_id
    //     const roomKey = req.body.roomKey

    //     if(my_id == null) return res.status(200).send({status:"failed", code:"2222"}) 
    //     try{
    //         await chat_room(roomKey, my_id, your_id)
    //         res.status(200).send({status:"success", code:"0000"})
    //     }catch(e){
    //         res.status(200).send({status:"failed", code:"1111"}) 
    //     }
    // } )

    // router.post("/user",async(req, res)=> {

    //     if(req.cookies.key == null)return res.status(401).send()
    //     const cookieJson = auth.decode_cookie(req.cookies.key)

    //     const my_id = JSON.parse(cookieJson.key).id
    //     const roomKey = req.body.roomKey
    //     const content = req.body.content
        
    //     const room = `chat_p_${roomKey}`
        
    //     if(my_id == null) return res.status(200).send({status:"failed", code:"2222"}) 
    //     try{
    //         await chat_user(room, my_id, content)
    //         res.status(200).send({status:"success", code:"0000"})
    //     }catch(e){
    //         console.log(e)
    //         res.status(200).send({status:"failed", code:"1111"}) 
    //     }
    // } )

    return router

}

let chat_room = (room, my_id, your_id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO chat_room(roomKey, my_id, your_id) VALUES(?,?,?)`,[room,my_id,your_id],
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
        connection.query(`INSERT INTO chat_user(room, id, comment) VALUES(?,?,?)`,[room, my_id_, content],
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