const descripcion = {
    demand: true,
    alias: "d",
    desc: "Descripcion de la tarea por hacer"
};

const completado = {
    default: true,
    alias: "c",
    desc: "Marca como completado o pendiente la tarea"
};

// Llama a los paquetes de Yargs
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        // Necesitara un objeto
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', "Borra una tarea existente", {
        descripcion
    })

.help()
    .argv;

module.exports = {
    argv
}