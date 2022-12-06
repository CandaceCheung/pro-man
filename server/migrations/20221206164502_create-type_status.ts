import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("type_status", (table)=>{
        table.increments()
        table.date('start_date')
        table.date('end_date')
        table.integer('state_id').unsigned
        table.foreign('state_id').references("states.id")
        table.integer('type_id').unsigned
        table.foreign('type_id').references("types.id")
        table.integer('item_id').unsigned
        table.foreign('item_id').references("items.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("type_status")
}
