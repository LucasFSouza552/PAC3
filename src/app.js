// Importações de bibliotecas
import express from "express";
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from "path";
import { fileURLToPath } from 'url';

// Importações de rotas
import loginRoute from './routes/auth/login.js';
import apiRoute from './routes/api/signup.js';

import { register, main, login, articles } from "./controllers/UserControllers.js";

// Configuração do ambiente
dotenv.config();
const PORT = process.env.PORT || 5000;

// Inicialização do aplicativo
const app = express();

// Configuração do EJS como mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));

// Obter o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Caminho para a pasta 'public'

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Rota padrão
app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/logar', login);
app.get('/artigos', articles);
app.get('/registrar', register);
app.get('/inicio', main);

// Rotas da aplicação
app.use('/api', apiRoute);
app.use('/auth', loginRoute);

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});