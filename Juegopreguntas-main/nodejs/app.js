//JSON
//https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON

//TIPO METODOS
//https://www.geeksforgeeks.org/how-to-return-json-using-node-js/

//Requiring express in our server para crear api
//https://expressjs.com/en/starter/installing.html
//****express se debe instalar con:
//****npm install express --save


const express = require('express');
const app = express();
const fs = require("fs");


//Requiring cors permite comunicación (tranferencia de datos) entre cliente-servidor (frontend-backend)
//investigar cors https://expressjs.com/en/resources/middleware/cors.html
//****cors se debe instalar con:
//****npm install cors --save
var cors = require('cors');
app.use(cors());

//parsea data json que viene en el body de métodos post del cliente (fronted)
app.use(express.json());

//import módulo de lectura-escritura json
const read = require('./read_write_json');

//constantes para crear el server (backend)
const host = 'localhost';
const port = 8000;


const generarIdUnico = () => {
    const data = fs.readFileSync('./data/usuarios.json');
    const usuarios = JSON.parse(data);
    
    // Encontrar el último ID más alto entre los usuarios existentes
    const ultimoId = usuarios.reduce((maxId, usuario) => {
        return usuario.id > maxId ? usuario.id : maxId;
    }, 0);

    // Generar un nuevo ID único sumando 1 al último ID más alto
    const nuevoId = ultimoId + 1;
    return nuevoId;
};

// get request en ruta default '/' (http://localhost/8000/)
//retorna un objeto json
app.get('/', function (req, res) {
    res.json({
        number: 1
    });
});

//  get request en ruta '/multiple', retorna un objeto json compuesto
app.get('/multiple', function (req, res) {
    res.json({
        number: 1,
        name: 'John',
        gender: 'male'
    });
});

app.get('/listapartidas', function(req, res) {

    const data = fs.readFileSync('./data/partidas.json');
    const json = JSON.parse(data);
    
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(json, null, 3));
    console.log("Lista de partidas cargada correctamente");
})

//data 2
app.get('/data2', function (req, res) {
    res.setHeader("Content-Type", "application/json"); //definir el tipo de respuesta que se envía
    res.writeHead(200);
    res.end(JSON.stringify(read.data2, null, 3));
})

//fuente https://www.geeksforgeeks.org/how-to-return-json-using-node-js/
//retorna un arreglo json con la lista almacenada en la carpeta data, usa módulo read ('./read_write_json')
app.get('/listausuarios', function (req, res) {
    // Lee los datos actuales del archivo usuarios.json
    const data = fs.readFileSync('./data/usuarios.json');
    const json = JSON.parse(data);

    // Envía la respuesta con los datos actuales
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(json, null, 3));
    console.log("Lista de usuarios cargada correctamente");
});



//metodo tipo post para guardar datos de form
app.post('/creapartida', function (req, res) {
    //necesario si no están incluidos lo cors
    //res.setHeader("Content-Type", "application/json");   
    //res.set('Access-Control-Allow-Origin', '*'); //no recomendado, permite cualquier url 
    console.log(req.body);
    read.incluyePartida(req.body);
    res.end(JSON.stringify({resultado: 1}, null, 3));
})

app.post('/creausuario', function (req, res) {
    const { nombre, nickname, profesion, preferencias } = req.body;

    // Aquí se puede generar un ID único para el nuevo usuario
    const nuevoUsuario = {
        id: generarIdUnico(), // Aquí deberías implementar tu lógica para generar un ID único
        nombre,
        nickname,
        profesion,
        preferencias
    };

    console.log('Datos del nuevo usuario:');
    console.log('Nombre:', nombre);
    console.log('Nickname:', nickname);
    console.log('Profesión:', profesion);
    console.log('Preferencias:', preferencias);

    // Agregar el nuevo usuario a la lista de usuarios
    console.log('Paso el read.........');
    read.incluyeUsuario(nuevoUsuario);
    

    // Aquí puedes enviar una respuesta al frontend indicando que el usuario ha sido creado exitosamente
    res.json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});


// setear el server para que escuche en el puerto 8000
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


//sesion 7
//retorna un arreglo json con la lista de preguntas , usa módulo read ('./read_write_json')
app.get('/preguntas', function (req, res) {
    res.setHeader("Content-Type", "application/json"); //definir el tipo de respuesta que se envía
    res.writeHead(200);
    res.end(JSON.stringify(read.preguntas, null, 3));
});


app.post('/incluyepartidausuario', function (req, res) {
    console.log(req.body);
    read.incluyePartidaAUsuario(req.body.usuario, req.body.partida, req.body.resultado);
    res.end(JSON.stringify({resultado: 1}, null, 3));
});
//termina sesion 7


/*

 //CLASICO
 //https://www.codingthesmartway.com/how-to-send-a-json-response-from-a-node-js-web-server/
//import http
const http = require("http");

const host = 'localhost';
const port = 8000;

//import lectura json
const read = require('./read_write_json');

//http://localhost:8000/
const requestListener = function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    //opcion 1
    res.end(JSON.stringify(read.data2, null, 3));
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

*/



/*
//SUPER BASICO

//https://levelup.gitconnected.com/creating-a-rest-api-with-node-js-and-express-a-step-by-step-guide-3bd7188fa219
//https://www.codingthesmartway.com/how-to-create-a-basic-http-web-server-with-node-js/ 


const http = require("http");

const host = 'localhost';
const port = 8000;

//http://localhost:8000/
const requestListener = function(req, res) {
    res.writeHead(200);
    res.end("Hello World from Node.js HTTP Server");
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

*/

