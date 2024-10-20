import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { getUserByEmail } from '../../services/getUsers.js';

const router = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5 // limita cada IP a 5 requisições por janela
});

router.post('/login',
    loginLimiter,
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ message: 'Autenticação falhou (Usuário não existe)' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Autenticação falhou (Dados inconsistentes)' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor' });
        }
    });

function autenticarUsuario(password, user) {
    
}

export default router;