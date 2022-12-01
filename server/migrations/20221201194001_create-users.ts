import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table)=>{
        table.increments()
        table.string('username')
        table.string('password')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

