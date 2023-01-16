import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('type_dates', (table) => {
		table.dropColumn('date');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('type_dates', (table) => {
		table.date('date');
	});
}
