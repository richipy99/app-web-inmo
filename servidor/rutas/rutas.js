const express = require('express')
const multer = require ('multer')
const path = require ('path')
const  fs = require('fs')
const { type } = require('os')
const router = express.Router()

const diskstorage = multer.diskStorage ({
    destination: path.join(__dirname, '../images'),
    filename:(req, file, cb) => {
         cb(null, Date.now() + '-inmo-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')  
router.get('/', (req, res) => {
    res.send ('Bienvenido a Inmobiliaria del Norte')
})
router.post('/images/post', fileUpload,(req, res) => {
req.getConnection((err, conn) => {
    if(err) return res.status(500).send('Error en la conexion con el servidor mysql')
        const type = req.file.mimetype
        const name = req.file.originalname
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
    conn.query('INSERT INTO ofertas set ?', [{tipo_archivo:type, nombre_archivo:name, datos_archivo:data }], (err, rows) => {
        if(err) return res.status(500).send('Error en la conexion con el servidor mysql')

          res.send('Datos cargados correctamente')
       
        return
    })

})
})
module.exports = router
