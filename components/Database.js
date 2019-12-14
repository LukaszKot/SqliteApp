import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("kot_lukasz_4id2.db");
class Database {

    static createTables() {

        db.transaction(tx => {
            tx.executeSql("create table if not exists alarms (id integer primary key not null, time integer, isenabled int, days text)", [], (tx, result) => { console.log("table created") });
        });
    }

    static add(alarm) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql("INSERT INTO alarms (time, isenabled, days) values ('" + alarm.time + "', '" + (alarm.isEnabled ? 1 : 0) + "','" + encodeURI(JSON.stringify(alarm.days)) + "')", [],
                    (tx, response) => {
                        console.log("inserted")
                        resolve(response.insertId)
                    }, (error) => {
                        console.log("błąd")
                        reject();
                    });
            })
        })

    }

    static getAll() {
        var query = "SELECT * FROM alarms";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {

                var array = results.rows._array.map(x => {
                    return {
                        days: JSON.parse(decodeURI(x.days)),
                        id: x.id,
                        isEnabled: x.isenabled == 1,
                        time: x.time
                    }
                })
                resolve(array);

            }, function (tx, error) {

                reject(error);

            });
        }))
    }

    static remove(id) {
        console.log(id)
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM alarms WHERE (id='" + id + "');", [], (tx, result) => console.log("yep", result), (error) => { console.log("nope", error) }
            );
        });

    }

    static update(alarm) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE alarms SET time='" + alarm.time + "', isenabled='" + (alarm.isEnabled ? 1 : 0) + "', days='" + encodeURI(JSON.stringify(alarm.days)) + "' WHERE id='" + alarm.id + "'",
                [], (tx, result) => console.log("yep", result), (error) => { console.log("nope", error) }
            );
        });
    }

}

export default Database;
