const User = require('./models/User');
const Role = require('./models/Role');

class authController {
    async registration(req, res) {
        try {

        } catch (e) {

        }
    }
    async login(req, res) {
        try {

        } catch (e) {
            
        }
    }
    async getUsers(req, res) {
        try {
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('./database.db');

            db.serialize(function () {
                db.all("select * from users ", function (err, users) {
                    console.log(users, err);
                    res.send(users);
                });
            });
            // console.log(res)
            // const userRole = new Role();
            // const adminRole = new Role({value:"ADMIN"});
            // await userRole.save();
            // await adminRole.save();
            // res.send("ok1");
            // res.json("server work");
        } catch (e) {

        }
    }
}
module.exports = new authController();