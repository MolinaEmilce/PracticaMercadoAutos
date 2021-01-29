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
           id: Number(lastID + 1),
           marca,
           modelo,
           color,
           anio,
           img
       }
    autos.push(auto); //se agrega al json parseado
    //se convierte en json y se escribe en el json
    fs.writeFileSync('./data/autos.json',JSON.stringify(autos),'utf-8');
 //te redirige a una ruta
   res.redirect('/admin/autos/list');
    },
    carEdit : (req,res)=>{
        const auto = autos.find(cadaAuto => cadaAuto.id === +req.params.id);
        res.render('admin/carEdit',{
            auto
        });
    },   //llegamos con un put
    carUpdate : (req,res)=>{
        const {marca,modelo,color,anio,img} = req.body;
        autos.forEach(cadaAuto=>{
           //reemplaza los valores de los objetos
           if(cadaAuto.id === +req.params.id){

            cadaAuto.id = Number(req.params.id);
            cadaAuto.marca = marca;
            cadaAuto.modelo = modelo;
            cadaAuto.anio = anio;
            cadaAuto.color = color;
            cadaAuto.img = img;
           }
            
        });

        //se guarda en la base de datos
        fs.writeFileSync('./data/autos.json',JSON.stringify(autos),'utf-8');
        res.redirect('/admin/autos/list');
    },
    carDelete : (req,res)=>{
      autos.forEach(cadaAuto=>{
          if(cadaAuto.id === +req.params.id){//si coincide con el id
    //se va aguardar la posicion =  del archivo json parseado busca el auto especifico que cumple la condicion
            var aEliminar = autos.indexOf(cadaAuto);//en  el auto especifica nos busca su posicion
              autos.splice(aEliminar,1); //con la posicion encontrada lo elimina en l archivo json parseado
                //el 1 es para que se te elimine solo un elemento
            }
      });
      //se guarda en la base de datos
      fs.writeFileSync('./data/autos.json',JSON.stringify(autos),'utf-8');
        res.redirect('/admin/autos/list');
    }
}





/*

req.params   = recibe los parametros
req.query   = va por get o string
req.body  = recibe por body por el form, recopila toda la informacion que se pasa en el body  ... pero  se tiene que hacer una config en el app.js
res.redirect  = TE MANDA DIRECTO A LA RUTA 
*/