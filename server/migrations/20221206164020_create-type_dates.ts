import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("type_dates", (table)=>{
        table.increments()
        table.timestamp('datetime').notNullable
        table.string('color').notNullable
        table.integer('type_id').unsigned().notNullable
        table.foreign('type_id').references("types.id")
        table.integer('item_id').unsigned().notNullable
        table.foreign('item_id').references("items.id")
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("type_dates")
}
