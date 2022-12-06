import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("item_groups", (table)=>{
        table.increments()
        table.string('name')
       
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("item_groups")
}

