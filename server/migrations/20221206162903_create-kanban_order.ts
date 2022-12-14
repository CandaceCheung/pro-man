import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("kanban_order", (table)=>{
        table.increments()
        table.integer('state_id').unsigned()
        table.foreign('state_id').references("states.id")
        table.integer('item_id_order')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("kanban_order")
}

