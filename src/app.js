// Bibliotecas
import express from "express";
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Rotas
import loginRoute from './routes/auth/login.js';
import apiRoute from './routes/api/signup.js';

// Configuração
dotenv.config();
const PORT = process.env.PORT || 5000;  

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());  
app.use(morgan('dev')); 

// Rota padrão
app.get('/', (req, res) => {
    res.send("Olá Mundo!");
});

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