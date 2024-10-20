// db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Define o caminho para o seu arquivo de banco de dados
const dbPath = path.resolve(process.cwd(), './src/services/database.db'); // Ajuste o nome do arquivo conforme necessário

// Função para abrir a conexão com o banco de dados
export const openDb = async () => {
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
};
