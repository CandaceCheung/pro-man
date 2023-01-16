import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('members', (table) => {
		table.increments();
		table.integer('user_id').unsigned().notNullable();
		table.foreign('user_id').references('users.id');
		table.integer('project_id').unsigned().notNullable();
		table.foreign('project_id').references('projects.id');
		table.timestamps(false, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('members');
}
