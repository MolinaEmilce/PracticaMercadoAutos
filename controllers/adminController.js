const autos = require ('../data/autos');
const fs = require('fs');
module.exports = {
    index : (req,res)=>{
        res.render('admin/index');
    },
    carList : (req,res)=>{
        res.render('admin/carList',{
        autos
        });
    },
    carCreate : (req,res)=>{
        res.render('admin/carCreate');
    },
    carStore : (req,res)=>{
       let lastID = 1;
       autos.forEach(cadaAuto => {
           if(cadaAuto.id > lastID){
               lastID = cadaAuto.id //La variable creada va a cambiar si el id del json es mayor a su valor
           }
       });
       //captura todos las propiedades con los valores del json creandolas en variables
        const {marca,modelo,color,anio,img} = req.body
       const auto = {
           //toda la informacion captada por formulario se pasa aca
           id: lastID + 1,
           marca,
           modelo,
           color,
           anio,
           img
       }
    autos.push(auto);
    //se convierte en json y se escribe en el json
    fs.writeFileSync('./data/autos.json',JSON.stringify(autos),'utf-8');
 //te redirige a una ruta
   res.redirect('/admin/autos/list');
    },carEdit : (req,res)=>{
        
    },
    carUpdate : (req,res)=>{
        
    },
    carDelete : (req,res)=>{
        
    }
}
/*

req.params   = recibe los parametros
req.query   = va por get o string
req.body  = recibe por body por el form, recopila toda la informacion que se pasa en el body  ... pero  se tiene que hacer una config en el app.js
res.redirect  = TE MANDA DIRECTO A LA RUTA 
*/