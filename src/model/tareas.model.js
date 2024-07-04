import mongose from 'mongoose';

const tareasSchema = new mongose.Schema({
    id_usuario: {
        type: String,
        required: true
    },
    
    nombre_proyecto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha_inicio_trabajo: {
        type: Date,
        required: true
    },

    estado: {
        type: String,
        required: true
    },
    estimado: {
        type: Number,
        required: true
    },


});
export default mongose.model('Tareas', tareasSchema);
