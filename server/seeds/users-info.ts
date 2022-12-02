import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username: "frankie", password: bcrypt.hashSync("test", 10) },
        { username: "duncan", password: bcrypt.hashSync("test", 10) },
        { username: "candace", password: bcrypt.hashSync("test", 10) }
    ]);
};