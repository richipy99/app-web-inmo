 const express = require ('express') 
 const mysql = require ('mysql')
 const myconn = require ('express-myconnection')
 const cors = require('cors')
 const app = express()
 app.use(myconn(mysql,  {
   host:'localhost',
   port: '3306',
   user: 'root',
   password: '',
   database: 'inmobiliaria',
   connectTimeout: 10000
 }))
 app.use(cors())
 app.use(require('./rutas/rutas'))
 app.listen (9000, () => {
    console.log('Servidor corriendo en -->', 'http://localhost:' + 9000)
 })