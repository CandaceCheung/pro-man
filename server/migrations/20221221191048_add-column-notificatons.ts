import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('notifications', (table) => {
		table.string('message_type').defaultTo('message').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('notifications', (table) => {
		table.dropColumn('message_type');
	});
}
