import { Knex } from "knex";
import bcrypt from "bcryptjs";

export class AuthService {
    constructor(private knex: Knex) {}
    
    async login(username: string, password: string) {
        const [user] = await this.knex("users").where("username", username);
        const isLogin = bcrypt.compareSync(password, user.password);
        if (isLogin) {
            delete user.password;
            return user;
        }
    }

    async getUser(id: number) {
        const [user] = await this.knex("users").where("id", id);
        if (user) {
            delete user.password;
            return user;
        } else {
            return
        }
    }
}