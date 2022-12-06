import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("type_times", (table)=>{
        table.increments()
        table.date('start_date')
        table.date('end_date')
        table.integer('type_id').unsigned
        table.foreign('type_id').references("types.id")
        table.integer('item_id').unsigned
        table.foreign('item_id').references("items.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("type_times")
}
