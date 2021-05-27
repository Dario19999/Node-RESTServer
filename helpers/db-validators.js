const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async(rol = '') => {
    const roleExists = await Role.findOne({ rol });
    console.log(roleExists);
    if (roleExists) {
        throw new Error(`El rol ${rol} no está registrado en la Base de Datos`);
    }
};

const emailExists = async(correo = '') => {
    const emailExists = await User.findOne({ correo });
    if (emailExists) {
        throw new Error(`El correo ya está registrado`);
    }
};

const idexists = async(id) => {
    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error(`El id no existe`);
    }
};

module.exports = {
    roleValidation,
    emailExists,
    idexists
};