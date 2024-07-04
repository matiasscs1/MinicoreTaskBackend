import { Router } from "express";

import {crearUsuario, modificarUsuario, obtenerUsuarios, eliminarUsuario} from "../controller/usuario.controller.js";
import {crearTarea, obtenerTareas, eliminarTarea, modificarTarea, verificarTodasLasTareas} from "../controller/tareas.controller.js";

const router = Router();

// crear usuario 

router.post('/usuario', crearUsuario);

// modificar usuario 

router.put('/usuario/:id', modificarUsuario);

// obtener usuarios

router.get('/usuario', obtenerUsuarios);

// eliminar usuario

router.delete('/usuario/:id', eliminarUsuario);

// crear tarea 

router.post('/tarea', crearTarea);

// obtener tareas

router.get('/tarea', obtenerTareas);


// modificar tarea


router.put('/tarea/:id', modificarTarea);

// eliminar tarea

router.delete('/tarea/:id', eliminarTarea);

// tarea 

router.post('/verificar', verificarTodasLasTareas);

export default router;