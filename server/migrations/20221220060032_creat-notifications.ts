import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('notifications', (table) => {
        table.increments()
        table.string('sender')
        table.integer('receiver_id').unsigned().notNullable()
        table.foreign('receiver_id').references("users.id")
        table.string('message')
        table.boolean('status').notNullable().defaultTo(false)
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('notifications')
}

