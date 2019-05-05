const db = require("./sqlPool");

module.exports = {
    getuserList(callback) {
        let sql = "SELECT id,face_pic AS pic,tag FROM article WHERE state=1;";
        db.sqlpool(sql, [], callback);
    },
    getsplbList(callback) {
        let sql = "SELECT * FROM splb where state = 1;";
        db.sqlpool(sql, [], callback);
    },
    articleList(id, callback) {
        let sql = `SELECT  * FROM COMMENT JOIN article ON article.id=comment.article_id WHERE  article.state=1 AND comment.state=1 and article.id = ?;`;
        db.sqlpool(sql, [id], callback);
    }
}