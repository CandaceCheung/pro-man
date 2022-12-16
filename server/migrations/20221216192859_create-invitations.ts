import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("invitations", (table)=>{
        table.increments()
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references("users.id")
        table.integer('project_id').unsigned().notNullable()
        table.foreign('project_id').references("projects.id")
        table.string('email').notNullable()
        table.string('status').notNullable()
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("invitations")
}

