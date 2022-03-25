module.exports = (io)=>{
    io.on('connection', (request) => { 
        /* … */
        console.log("connection")
        let room_ = null, user_id_ = null
        request.on("init", (room, user_id)=>{
            room_ = room
            user_id_ = user_id
            request.join(room)
        })
        request.on('chatting', (msg)=>{
            console.log("e")
            io.to(room_).emit("chatting", {msg, user_id:user_id_})
        })

    });

}