import jwt from 'jsonwebtoken';
import { getArticles } from "../../services/getArticles.js";

const articleflow = async (req, res) => {

    const { token } = req.body;

    if (!token) {
        return res.status(400).send({ message: "Token inválido." });
    }

    const datas = jwt.decode(token);
    const articles = await getArticles(datas.userId);

    return res.status(200).send({ articles });
}

export default articleflow;

