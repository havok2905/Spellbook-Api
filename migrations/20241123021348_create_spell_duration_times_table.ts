import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('spell_duration_times', function (table) {
      table.string('id', 255).notNullable().primary();
      table
        .string('spell_id', 255)
        .notNullable()
        .index()
        .references('id')
        .inTable('spells');
      table
        .integer('total')
        .notNullable();
      table
        .string('action_type', 255)
        .notNullable();
      table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
   .dropTable('spell_duration_times');
}

