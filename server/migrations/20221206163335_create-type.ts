import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('types', (table) => {
		table.increments();
		table.string('type').notNullable();
		table.string('name').notNullable();
		table.integer('order').notNullable();
		table.timestamps(false, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('types');
}
