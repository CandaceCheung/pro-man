import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("item_groups", (table) => {
        table.boolean('is_deleted').defaultTo(false).notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("item_groups", (table) => {
        table.dropColumn('is_deleted');
      });
}

