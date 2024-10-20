import { openDb } from "./databaseConnect";

export const getArticlesByUserId = async (id) => {
    const db = await openDb();
    const articles = await db.all(`SELECT * FROM articles WHERE accountId = ${id}`);
    db.close();
    return articles;
}
