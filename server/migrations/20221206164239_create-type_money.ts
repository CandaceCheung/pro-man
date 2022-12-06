import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("type_money", (table)=>{
        table.increments()
        table.integer('type_id').unsigned
        table.foreign('type_id').references("types.id")
        table.integer('item_id').unsigned
        table.foreign('item_id').references("items.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("type_money")
}