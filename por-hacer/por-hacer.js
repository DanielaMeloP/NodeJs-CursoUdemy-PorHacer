// Filesystem
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    // Convierte el objeto entregado a un JSON 
    let data = JSON.stringify(listadoPorHacer);

    // graba la data en JSON
    fs.writeFile("db/data.json", data, (err) => {
        if (err) {
            throw new Error("No se logro grabar data", err);
        }
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require("../db/data.json");
    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    // Agregara todo lo nuevo al archivo
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    // Se carga la BD
    cargarDB();

    // Recorre una lista en base a un indice
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    // Se carga la BD
    cargarDB();

    // Filter permite quitar o filtrar un elemenento en particular y devuelve un nuevo arreglo
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}