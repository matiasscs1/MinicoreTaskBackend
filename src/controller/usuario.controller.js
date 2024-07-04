import Usuario from '../model/usuario.model.js';


// crear el usuario solo es de nombre y apellido 
export const crearUsuario = async (req, res) => {
    const { nombre, apellido } = req.body;
    const nuevoUsuario = new Usuario({ nombre, apellido });
    try {
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// modificar 

export const modificarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    if (!id) {
        return res.status(400).json({ message: "No se ha enviado el id del usuario" });
    }
    const usuarioModificado = { nombre, apellido, _id: id };
    await Usuario.findByIdAndUpdate(id, usuarioModificado, { new: true });
    res.status(200).json(usuarioModificado);
}

// obtener todos los usuarios con su id 

export const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
}

// eliminar usuarios 

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "No se ha enviado el id del usuario" });
    }
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
}
