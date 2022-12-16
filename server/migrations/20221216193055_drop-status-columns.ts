import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("members", (table) => {
        table.dropColumn('status')
    });
    await knex.schema.alterTable("users", (table) => {
        table.dropColumn('token')
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("members", (table) => {
        table.string('status')
    });
    await knex.schema.alterTable("users", (table) => {
        table.string('token');
    });
}

