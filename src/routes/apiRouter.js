import { Router } from "express";
import rateLimit from 'express-rate-limit';

import articleflow from "./api/ArticleFlow.js";
import signup from "./api/signup.js";

const router = Router();

const getLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5 // limita cada IP a 5 requisições por janela
});

router.post('/articleflow', getLimiter, articleflow);
router.post('/signup', getLimiter, signup)

export default router;