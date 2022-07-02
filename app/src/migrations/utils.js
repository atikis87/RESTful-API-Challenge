export function execQuery(sql, db) {
    db.query(sql, function(err) {
        if (err) throw err;
    });
}
