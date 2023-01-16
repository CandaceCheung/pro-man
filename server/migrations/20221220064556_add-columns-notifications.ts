import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('notifications', (table) => {
		table.integer('sender_id').unsigned();
		table.foreign('sender_id').references('users.id').notNullable;
		table.string('receiver');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('notifications', (table) => {
		table.dropColumn('sender_id');
		table.dropColumn('receiver');
	});
}
