//modulo para parsear el json

const fs = require('fs');

//__dirname : te lleva a la ruta correcta dle archivo, nos da la ruta 
module.exports = JSON.parse(fs.readFileSync(__dirname + '/autos.json','utf-8'));

