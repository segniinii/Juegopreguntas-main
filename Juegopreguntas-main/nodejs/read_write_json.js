//https://www.stanleyulili.com/node/node-modules-import-and-use-functions-from-another-file
// Requiring fs module
const fs = require("fs");
//tipo 1

const data2 = require('./data/data2.json');

const incluyePartida = (bodyJsonPartida) => {
    let data = fs.readFileSync('./data/partidas.json');
    let json = JSON.parse(data);
    json.push(bodyJsonPartida);
    //utilizar writeFileSync en lugar de writeFile peviene error de tipo ERR_INVALID_ARG_TYPE
    fs.writeFileSync("./data/partidas.json", JSON.stringify(json, null, 3));
};

const incluyeUsuario = (nuevoUsuario) => {
    console.log("holaaaaa")
    try {
        let data = fs.readFileSync('./data/usuarios.json');
        let json = JSON.parse(data);
        json.push(nuevoUsuario);
        fs.writeFileSync("./data/usuarios.json", JSON.stringify(json, null, 3));
        console.log('Usuario agregado correctamente:', nuevoUsuario);
    } catch (error) {
        console.error('Error al agregar usuario:', error);
    }
}

//sesion 7

//tipo 1
const dataPartidas = require('./data/partidas.json');

const preguntas = require('./data/preguntas.json');

//agrega al usuario una nueva partida jugada, verifica si la propiedad no existe
const incluyePartidaAUsuario = (usuario, partida, resultado) => {
    let data = fs.readFileSync('./data/usuarios.json');
    let json = JSON.parse(data);
    //buscar y agregar
    //json.map => ["alla_1","gab_1"]
    index = json.map(function (usuarioM) { if (usuarioM != null){  return usuarioM.nickname;} }).indexOf(usuario);
    if (json[index].hasOwnProperty("partidas")) {
        json[index].partidas.push({
            idpartida: partida,
            resultado: resultado
        });
    } else {
        json[index]["partidas"] = [{
            idpartida: partida,
            resultado: resultado
        }];
        //json[index]["resultado"] = resultado 
    }

    //utilizar writeFileSync en lugar de writeFile peviene error de tipo ERR_INVALID_ARG_TYPE
    fs.writeFileSync("./data/usuarios.json", JSON.stringify(json, null, 3));
};

//termina sesion 7

//módulos sesión 6
//module.exports = { dataUsuarios, incluyePartida, data2 };
//módulos sesión 7
module.exports = { dataPartidas, incluyePartida, data2, preguntas, incluyePartidaAUsuario, incluyeUsuario };