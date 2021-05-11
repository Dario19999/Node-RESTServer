const { response, request } = require('express');

const getUser = (req = request, res = response) => {
    const { nombre = "no name", apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get api - controller',
        nombre,
        apikey,
        page,
        limit
    });
};

const putUser = (req = request, res = response) => {

    const id = req.params.id;
    res.json({
        msg: 'put api - controller',
        id
    });
};

const postUser = (req, res = response) => {

    const { age, name } = req.body;

    res.json({
        msg: 'post api - controller',
        age,
        name
    });
};

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'delete api - controller'
    });
};

const patchUser = (req, res = response) => {
    res.json({
        msg: 'patch api - controller'
    });
};

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser
};