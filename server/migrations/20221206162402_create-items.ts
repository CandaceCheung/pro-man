import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("items", (table)=>{
        table.increments()
        table.string('name').notNullable
        table.integer('creator_id').unsigned().notNullable
        table.foreign('creator_id').references("users.id")
        table.integer('project_id').unsigned().notNullable
        table.foreign('project_id').references("projects.id")
        table.integer('item_group_id').unsigned().notNullable
        table.foreign('item_group_id').references("item_groups.id")
        table.boolean('is_deleted').defaultTo(false).notNullable
        table.integer('order').notNullable
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("items")
}
