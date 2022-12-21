import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("members", (table) => {
        table.integer('avatar').defaultTo(0).notNullable()
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("members", (table) => {
        table.dropColumn('avatar')
      });
}
