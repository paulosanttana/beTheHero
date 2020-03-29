// Importação dos modulos
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();  // Cria aplicação app


// cors em RODUÇÃO tem que passar a origem
// app.use(cors({
//     origin: meuapp.com.br
// }));
app.use(cors()); // Dessa forma permite TUDO, qualquer um pode usar api
app.use(express.json()); //usa o json 
app.use(routes);

app.listen(3333);   // Define porta