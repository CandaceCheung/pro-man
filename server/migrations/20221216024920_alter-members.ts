import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("members", (table) => {
        table.string('status')
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("members", (table) => {
        table.dropColumn('status')
      });
}

