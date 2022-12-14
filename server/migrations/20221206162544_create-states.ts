import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("states", (table)=>{
        table.increments()
        table.string('name').notNullable
        table.string('color').notNullable
        table.integer('project_id').unsigned().notNullable
        table.foreign('project_id').references("projects.id")
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("states")
}

