const express = require('express');
const router = express.Router();

const {index,carList,carEdit,carCreate,carDelete,carUpdate,carStore} = require('../controllers/adminController');

router.get('/',index);

router.get('/autos/list', carList);

router.get('/autos/create',carCreate); // trae solo el formulario ingresa datos nuevos SOLO INGRESASS
router.post('/autos/store',carStore); //recibe datos nuevos y los guardas - ACA SE TERMINA DE CREAR Y SE GUARDA

router.get('/autos/edit/:id',carEdit); //SOLO CARGA los datos precargados que queremos editar SOLO LO TRAE
router.put('/autos/update/:id',carUpdate); //RECIBE DATOS del formulario precargado y si hay cambios guardamos en el mismo, SE GUARDA MODIFICACIONES


router.delete('/autos/delete/:id',carDelete); //BORRA un registro que cooincida con el id
module.exports = router;