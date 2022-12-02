import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("table_name").insert([
        { username: "frankie", password: "test"},
        { username: "duncan", password: "test"},
        { username: "candice", password: "test"}
    ]);
};
