const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUser = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        User.countDocuments({ estado: true }),
        User.find({ estado: true }).limit(Number(limite)).skip(Number(desde))
    ]);
    res.json({
        total,
        usuarios
    });
};

const putUser = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, pass, google, correo, ...resto } = req.body;

    if (pass) {
        const salt = bcrypt.genSaltSync(10);
        resto.pass = bcrypt.hashSync(pass, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
};

const postUser = async(req, res = response) => {

    const { nombre, correo, pass, rol } = req.body;
    const user = new User({ nombre, correo, pass, rol });

    //encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    user.pass = bcrypt.hashSync(pass, salt);

    await user.save();
    res.json({
        user
    });
};

const deleteUser = async(req, res = response) => {

    const { id } = req.params;

    const usuario = await User.findByIdAndUpdate(id, { estado: false });

    res.json({
        id,
        usuario
    });
};

const patchUser = (req, res = response) => {
    res.json({});
};

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser
};