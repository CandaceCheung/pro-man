import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("states", (table)=>{
        table.increments()
        table.string('name')
        table.string('color')
        table.integer('project_id').unsigned()
        table.foreign('project_id').references("projects.id")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("states")
}

