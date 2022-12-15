import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("item_groups", (table)=>{
        table.increments()
        table.integer('project_id').unsigned().notNullable()
        table.foreign('project_id').references("projects.id")
        table.string('name').notNullable()
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("item_groups")
}

