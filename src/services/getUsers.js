import { openDb } from "./databaseConnect.js"

// Retorna um usário pelo email
export const getUserByEmail = async (email) => {
    const db = await openDb();
    const user = await db.get(`SELECT * FROM accounts WHERE email = "${email}"`);
    db.close();
    return user;
}