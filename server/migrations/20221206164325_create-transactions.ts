import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transactions", (table)=>{
        table.increments()
        table.date('date')
        table.integer('cash_flow')
        table.integer('type_money_id').unsigned()
        table.foreign('type_money_id').references("type_money.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("transactions")
}
