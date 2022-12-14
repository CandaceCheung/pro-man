import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("favorite", (table)=>{
        table.increments()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references("users.id")
        table.integer('project_id').unsigned()
        table.foreign('project_id').references("projects.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("favorite")
}
