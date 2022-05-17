

module.exports = class{

    static getDelete = (postId) => {
        return pool.query("delete from post where id = ?",[postId])
    }
}