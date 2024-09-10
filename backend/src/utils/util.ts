import { Express } from "express";
import sequelize from "../config/db";
import bcrypt from "bcrypt";
import { IError } from "../interfaces/errorInterface";

export default class Util {
    static async startServer(app: Express, PORT: number): Promise<void> {
        try {
            console.log("Trying to connect to the database...");
            await sequelize.authenticate(); // Intentar conectar con la base de datos
            console.log("Database connection established.");
            await sequelize.sync(); // Sincroniza con la base de datos los modelos
            console.log(`Starting server on port ${PORT}`);
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        } catch (error) {
            console.error("Error with the method startServer:", error);
            // Opcionalmente, podrías lanzar el error para que el proceso de Node.js lo registre como una falla
            throw error;
        }
    }

    static verifyData(...fields: (string | number)[]): boolean {
        return fields.every(field => !!field);
    }

    static async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    static async verifyPassword(password: string, passwordSave: string): Promise<boolean> {
        return bcrypt.compare(password, passwordSave);
    }
}