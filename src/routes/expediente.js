const express = require('express');
const router = express.Router();

const pool = require ('../database');

//CRUD Tribunal Control

router.get('/add_control', (req, res) => {
    res.render('expedientes/add_control')
});

router.post('/add_control', async (req, res) => {
    const {id_expedientecontrol, ci, fecha_actuacion, descripcion_actuacion} = req.body;
    const NewExpediente = {
        id_expedientecontrol, 
        ci, 
        fecha_actuacion, 
        descripcion_actuacion   
    };
    const Expedientes = {
        id_expedientecontrol,  
    };
    
    console.log(Expedientes);
    await pool.query('INSERT INTO expedientecontrol set ?', [NewExpediente]); 
    await pool.query('UPDATE expedientecontrol set ? WHERE ci = ?', [Expedientes, NewExpediente.ci]); 
    await pool.query('UPDATE interviniente set ? WHERE ci = ?', [Expedientes, NewExpediente.ci]); 
    
    req.flash('success', 'Expediente Guardado');
    res.redirect('/expediente/lista_control');
});

router.get('/lista_control', async (req, res) =>{
    const expedientecontrol = await pool.query('SELECT * FROM expedientecontrol');
    res.render('expedientes/lista_control', {expedientecontrol})
});

router.get('/control/delete/:id', async (req, res) =>{
    const { id } = req.params;
    console.log(id);
    await pool.query('DELETE FROM expedientecontrol WHERE id_expedientecontrol = ?', [id]); 
    req.flash('success', 'Expediente Eliminado');    
    res.redirect('/expediente/lista_control');
});

router.get('/control/edit/:id/:id2', async (req, res) =>{
    const { id, id2 } = req.params;
    const expedientecontrol = await pool.query('SELECT * FROM expedientecontrol  WHERE id_expedientecontrol = ? AND descripcion_actuacion = ?', [id, id2]); 
    res.render('expedientes/edit_control', {expedientecontrol: expedientecontrol[0]} );
});

router.post('/control/edit/:id/:id2', async (req, res) =>{
    const { id, id2 } = req.params;
    const {id_expedientecontrol, ci, fecha_actuacion, descripcion_actuacion} = req.body;
    const NewControl = {
        id_expedientecontrol,
        ci,  
        fecha_actuacion, 
        descripcion_actuacion
    };
    const Expedientes = {
        id_expedientecontrol,  
    };

    await pool.query('UPDATE expedientecontrol set ? WHERE id_expedientecontrol = ? AND descripcion_actuacion = ?', [NewControl, id, id2]);
    await pool.query('UPDATE expedientecontrol set ? WHERE ci = ?', [Expedientes, NewControl.ci]); 
    req.flash('success', 'Expediente Modificado');
    res.redirect('/expediente/lista_control');
});


//CRUD Tribunal Juicio
router.get('/add_juicio', (req, res) => {
    res.render('expedientes/add_juicio')
});

router.post('/add_juicio', async (req, res) => {
    const {id_expedientejuicio, fecha_actuacion, descripcion_actuacion, econtrol_referencia} = req.body;
    const NewExpediente = {
        id_expedientejuicio, 
        fecha_actuacion, 
        descripcion_actuacion,
        econtrol_referencia   
    };
    const Expedientes = {
        id_expedientejuicio, 
    };
    
    await pool.query('INSERT INTO expedientejuicio set ?', [NewExpediente]); 
    await pool.query('UPDATE expedientejuicio set ? WHERE econtrol_referencia = ?', [Expedientes, NewExpediente.econtrol_referencia]);   
    const ci = await pool.query('SELECT  ci FROM expedientecontrol WHERE id_expedientecontrol = ?', [NewExpediente.econtrol_referencia]);
    await pool.query('UPDATE expedientejuicio set ? WHERE econtrol_referencia = ?', [ci[0], NewExpediente.econtrol_referencia]); 
    console.log(ci[0]);
    await pool.query('UPDATE interviniente set ? WHERE id_expedientecontrol = ?', [Expedientes, NewExpediente.econtrol_referencia]);
    req.flash('success', 'Expediente Guardado');
    res.redirect('/expediente/lista_juicio');
});

router.get('/lista_juicio', async (req, res) =>{
    const expedientejuicio = await pool.query('SELECT * FROM expedientejuicio');
    res.render('expedientes/lista_juicio', {expedientejuicio})
});

router.get('/juicio/delete/:id', async (req, res) =>{
    const { id} = req.params;
    await pool.query('DELETE FROM expedientejuicio WHERE id_expedientejuicio = ?', [id]); 
    req.flash('success', 'Expediente Eliminado');    
    res.redirect('/expediente/lista_juicio');
});

router.get('/juicio/edit/:id/:id2', async (req, res) =>{
    const { id, id2 } = req.params;
    const expedientejuicio = await pool.query('SELECT * FROM expedientejuicio  WHERE id_expedientejuicio = ? AND descripcion_actuacion = ?', [id, id2]); 
    res.render('expedientes/edit_juicio', {expedientejuicio: expedientejuicio[0]} );
});

router.post('/juicio/edit/:id/:id2', async (req, res) =>{
    const { id, id2 } = req.params;
    const {id_expedientejuicio, econtrol_referencia, fecha_actuacion, descripcion_actuacion} = req.body;
    const NewJuicio = {
        id_expedientejuicio, 
        econtrol_referencia,
        fecha_actuacion, 
        descripcion_actuacion
    };
    const Expedientes = {
        id_expedientejuicio,  
    };

    console.log(NewJuicio.econtrol_referencia)

    await pool.query('UPDATE expedientejuicio set ? WHERE id_expedientejuicio = ? AND descripcion_actuacion = ?', [NewJuicio, id, id2]);
    await pool.query('UPDATE expedientejuicio set ? WHERE econtrol_referencia = ?', [Expedientes, NewJuicio.econtrol_referencia]); 
    
    req.flash('success', 'Expediente Modificado');
    res.redirect('/expediente/lista_juicio');
});



//CRUD Tribunal Ejecucion
router.get('/add_ejecucion', (req, res) => {
    res.render('expedientes/add_ejecucion')
});

router.post('/add_ejecucion', async (req, res) => {
    const {id_expedienteejecucion, fecha_actuacion, descripcion_actuacion, econtrol_referencia} = req.body;
    const NewExpediente = {
        id_expedienteejecucion, 
        fecha_actuacion, 
        descripcion_actuacion,
        econtrol_referencia   
    };
    const Expedientes = {
        id_expedienteejecucion, 
    };
    
    await pool.query('INSERT INTO expedienteejecucion set ?', [NewExpediente]); 
    await pool.query('UPDATE expedienteejecucion set ? WHERE econtrol_referencia = ?', [Expedientes, NewExpediente.econtrol_referencia]);   
    const ci = await pool.query('SELECT  ci FROM expedientecontrol WHERE id_expedientecontrol = ?', [NewExpediente.econtrol_referencia]);
    await pool.query('UPDATE expedienteejecucion set ? WHERE econtrol_referencia = ?', [ci[0], NewExpediente.econtrol_referencia]); 
    console.log(ci[0]);
    await pool.query('UPDATE interviniente set ? WHERE id_expedientecontrol = ?', [Expedientes, NewExpediente.econtrol_referencia]);
    req.flash('success', 'Expediente Guardado');
    res.redirect('/expediente/lista_ejecucion');
});

router.get('/lista_ejecucion', async (req, res) =>{
    const expedienteejecucion = await pool.query('SELECT * FROM expedienteejecucion');
    res.render('expedientes/lista_ejecucion', {expedienteejecucion})
});

router.get('/ejecucion/delete/:id', async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM expedienteejecucion WHERE id_expedienteejecucion = ?', [id]); 
    req.flash('success', 'Expediente Eliminado');    
    res.redirect('/expediente/lista_ejecucion');
});

router.get('/ejecucion/edit/:id/:id2', async (req, res) =>{
    const { id, id2 } = req.params;
    const expedienteejecucion = await pool.query('SELECT * FROM expedienteejecucion  WHERE id_expedienteejecucion = ? AND descripcion_actuacion = ?', [id, id2]); 
    res.render('expedientes/edit_ejecucion', {expedienteejecucion: expedienteejecucion[0]} );
});

router.post('/ejecucion/edit/:id/:id2', async (req, res) =>{
    const { id, id2 } = req.params;
    const {id_expedienteejecucion, econtrol_referencia, fecha_actuacion, descripcion_actuacion} = req.body;
    const NewEjecucion = {
        id_expedienteejecucion, 
        econtrol_referencia,
        fecha_actuacion, 
        descripcion_actuacion
    };
    const Expedientes = {
        id_expedienteejecucion,  
    };

    console.log(NewEjecucion.econtrol_referencia)

    await pool.query('UPDATE expedienteejecucion set ? WHERE id_expedienteejecucion = ? AND descripcion_actuacion = ?', [NewEjecucion, id, id2]);
    await pool.query('UPDATE expedienteejecucion set ? WHERE econtrol_referencia = ?', [Expedientes, NewEjecucion.econtrol_referencia]); 
    
    req.flash('success', 'Expediente Modificado');
    res.redirect('/expediente/lista_ejecucion');
});




//Interviniente
router.get('/add_interviniente', (req, res) => {
    res.render('expedientes/add_interviniente')
});

router.post('/add_interviniente', async (req, res) => {
    const {ci, nombre, apellido, fecha_nacimiento, tipo_intervencion, abogados} = req.body;
    const NewInterviniente = {
        ci,
        nombre,
        apellido,
        fecha_nacimiento,
        tipo_intervencion,
        abogados
    };

    console.log(NewInterviniente);
    await pool.query('INSERT INTO interviniente set ?', [NewInterviniente]);
    res.redirect('/expediente/lista_control');
});


module.exports = router; 