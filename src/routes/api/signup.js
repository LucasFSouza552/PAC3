import { Router } from 'express';
import { openDb } from '../../services/databaseConnect.js';
import { v4 as uuidv4 } from 'uuid';
const router = Router();

const criarConta = async ({ name, email, password }) => {
    const db = await openDb();

    const existingAccount = await db.get('SELECT * FROM accounts WHERE email = ?', [email]);

    if (existingAccount) {
        db.close();
        return {
            send: 'Email already in use',
            code: 401
        };
    }

    const createdAccount = await db.run(`INSERT INTO accounts ("id", "name", "email", "password") VALUES ("${uuidv4()}","${name}", "${email}", "${password}")`);
    const account = await db.get(`SELECT * FROM accounts WHERE id = ${createdAccount.lastID}`);
    db.close();
    return { send: account, code: 200 };
}

router.post('/signup', async (req, res) => {
    const { send, code } = await criarConta(req.body);
    res.status(code).send(send);
});

export default router;