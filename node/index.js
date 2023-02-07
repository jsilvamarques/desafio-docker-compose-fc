const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const connection = mysql.createConnection(config)

const listName = ['Jefferson', 'Junior', 'Rodrigo', 'Elisa', 'Everton', 'Carla', "Kyara"]
listName.forEach(user => {
    connection.query(`INSERT INTO people(name) values ('${user}');`)
})

const sqlGet = `SELECT * from people`
connection.query(sqlGet)

var users = {}
connection.query(sqlGet,function(err,rows) {
    users = rows;
    if(err) {
        console.log("error: %s", err.message)
        throw err
    }
});

connection.end()

app.get('/', function(req, res){
    var response = users.map(function(user){ return user.name })
    return res.status(200)
        .send(
            `<h1>Full Cycle Rocks!</h1><br>` + response
        )
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})