import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username: "frankie", password: "test"},
        { username: "duncan", password: "test"},
        { username: "candace", password: "test"}
    ]);
};
