import { Pool } from "pg"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "lesson-1",
    password: "1234",
    port: 5432
})
export default  pool
export async function dbConnection() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                price INT NOT NULL,
                duration INT NOT NULL,
                user_id INT REFERENCES users(id) ON DELETE CASCADE
            );
        `)
        console.log("PostgreSQL ulandi va jadvallar tayyor")

    } catch (err) {
        console.error("❌ DB xato:", err.message)
        throw err
    }
}
