import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('spell_creature_actions', function (table) {
        table.string('id', 255).notNullable().primary();
        table
          .string('spell_creature_id', 255)
          .notNullable()
          .index()
          .references('id')
          .inTable('spell_creatures');
        table
          .string('name', 255)
          .notNullable();
        table
          .text('description')
          .notNullable();
        table.timestamps();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('spell_creature_actions');
}

