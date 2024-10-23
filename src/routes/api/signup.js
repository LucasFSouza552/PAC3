import { Router } from 'express';
import { openDb } from '../../services/databaseConnect.js';
import { v4 as uuidv4 } from 'uuid';

import jwt from 'jsonwebtoken';
const router = Router();

const criarConta = async ({ name, email, password }) => {
    const db = await openDb();

    const existingAccount = await db.get('SELECT * FROM accounts WHERE email = $1', [email]);

    if (existingAccount) {
        db.close();
        return {
            status: 'error',
            message: 'O email já registrado',
            code: 400
        };
    }

    const id = uuidv4();
    await db.run(`INSERT INTO accounts ("id", "name", "email", "password") VALUES ("${id}","${name}", "${email}", "${password}")`);
    const account = await db.get(`SELECT * FROM accounts WHERE id = "${id}"`);
    db.close();

    const token = jwt.sign(
        { userId: account.id, email: account.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        status: "success",
        message: "Usuário cadastrado com sucesso.",
        token,
        code: 200
    };
}

router.post('/signup', async (req, res) => {
    const json = await criarConta(req.body);
    return res.status(json.code).json(json);
});

export default router;