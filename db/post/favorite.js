

module.exports = class{
    
    static write_favorite = (postId, check, userId) => {
            return pool.query("INSERT INTO favorite(postId, check_in, userId) VALUES(?,?,?)", [postId, check, userId],)
    }

    static favorite_check = (id, postId) => {
        return pool.query("select check_in from favorite where userId=? and postId=?",[id, postId])
    }

    static favorite_delete = (postId) => {
        return pool.query("DELETE FROM favorite where postId=? ", [postId])
    }
}