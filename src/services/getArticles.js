import { openDb } from "./databaseConnect.js";

export { getArticles };


const getArticles = async (id) => {
    const db = await openDb();
    const articles = await db.all(`SELECT * FROM articles WHERE accountId = $1`, [id]);
    db.close();
    return articles;
}