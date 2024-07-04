import moment from 'moment';
import Tareas from '../model/tareas.model.js';


export const crearTarea = async (req, res) => {
    const { id_usuario, nombre_proyecto, descripcion, fecha_inicio_trabajo, estado, estimado } = req.body;
    
    // Convertir la fecha a un objeto Date
    const fechaFormateada = moment(fecha_inicio_trabajo, 'DD/MM/YYYY').toDate();
    
    const nuevaTarea = new Tareas({ 
        id_usuario, 
        nombre_proyecto, 
        descripcion, 
        fecha_inicio_trabajo: fechaFormateada, 
        estado, 
        estimado 
    });
    
    try {
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
// obtener tarea 

export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tareas.find();
        
        const tareasFormateadas = tareas.map(tarea => {
            const fechaFormateada = moment(tarea.fecha_inicio_trabajo).format('DD/MM/YYYY');
            return { ...tarea._doc, fecha_inicio_trabajo: fechaFormateada };
        });
        
        res.status(200).json(tareasFormateadas);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// modificar tarea

export const modificarTarea = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, nombre_proyecto, descripcion, fecha_inicio_trabajo, estado, estimado } = req.body;
    
    // Convertir la fecha a un objeto Date
    const fechaFormateada = moment(fecha_inicio_trabajo, 'DD/MM/YYYY').toDate();
    
    if (!id) {
        return res.status(400).json({ message: 'No se ha proporcionado un ID válido' });
    }
    
    const tareaActualizada = { id_usuario, nombre_proyecto, descripcion, fecha_inicio_trabajo: fechaFormateada, estado, estimado, _id: id };
    
    await Tareas.findByIdAndUpdate(id, tareaActualizada, { new: true });
    
    res.json(tareaActualizada);
}

// eliminar tarea

export const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ message: 'No se ha proporcionado un ID válido' });
    }
    
    await Tareas.findByIdAndRemove(id);
    
    res.json({ message: 'Tarea eliminada' });
}



// Función para verificar todas las tareas con días pasados y en progreso
export const verificarTodasLasTareas = async (req, res) => {
    const { fecha_fin } = req.body;
    
    try {
        const tareas = await Tareas.find({ estado: 'en progreso' });  // Filtrar por estado 'en progreso'
        
        const tareasConDiasPasados = tareas.map(tarea => {
            const fechaInicioTrabajo = moment(tarea.fecha_inicio_trabajo);
            const fechaFinTrabajo = moment(fechaInicioTrabajo).add(tarea.estimado, 'days');
            const fechaFinReal = moment(fecha_fin, 'DD/MM/YYYY');
            
            let diasPasados;
            if (fechaFinTrabajo.isBefore(fechaFinReal)) {
                diasPasados = fechaFinReal.diff(fechaFinTrabajo, 'days');
            } else {
                diasPasados = 0;
            }
            
            return {
                ...tarea._doc,
                fecha_inicio_trabajo: fechaInicioTrabajo.format('DD/MM/YYYY'),
                fecha_fin_trabajo: fechaFinTrabajo.format('DD/MM/YYYY'),
                dias_pasados: diasPasados > 0 ? `${diasPasados} días pasados` : 'No se pasó'
            };
        }).filter(tarea => tarea.dias_pasados !== 'No se pasó');
        
        res.status(200).json(tareasConDiasPasados);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};