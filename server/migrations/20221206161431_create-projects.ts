import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("projects", (table)=>{
        table.increments()
        table.string("name")
        table.integer('creator_id').unsigned
        table.foreign('creator_id').references("users.id")
        table.boolean('is_deleted').defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("projects")
}

