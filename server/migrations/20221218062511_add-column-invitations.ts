import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('invitations', (table) => {
		table.boolean('validity').defaultTo(true).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('invitations', (table) => {
		table.dropColumn('validity');
	});
}
