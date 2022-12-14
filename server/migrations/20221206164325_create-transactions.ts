import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transactions", (table)=>{
        table.increments()
        table.date('date').notNullable
        table.integer('cash_flow').notNullable
        table.integer('type_money_id').unsigned().notNullable
        table.foreign('type_money_id').references("type_money.id")
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("transactions")
}
