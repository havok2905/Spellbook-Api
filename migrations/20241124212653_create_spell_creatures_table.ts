import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('spell_creatures', function (table) {
      table.string('id', 255).notNullable().primary();
      table
        .string('spell_id', 255)
        .notNullable()
        .index()
        .references('id')
        .inTable('spells');
      table.string('ac', 255).notNullable();
      table.string('alignment', 255).notNullable();
      table.integer('cha').notNullable();
      table.integer('con').notNullable();
      table.string('condition_immunities', 255).notNullable();
      table.string('cr', 255).notNullable();
      table.string('creature_type', 255).notNullable();
      table.string('damage_immunities', 255).notNullable();
      table.string('damage_resistances', 255).notNullable();
      table.string('damage_vulnerabilities', 255).notNullable();
      table.integer('dex').notNullable();
      table.string('hp', 255).notNullable();
      table.integer('intelligence').notNullable();
      table.string('languages', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('proficiency_bonus', 255).notNullable();
      table.string('senses', 255).notNullable();
      table.string('size', 255).notNullable();
      table.string('speed', 255).notNullable();
      table.integer('str').notNullable();
      table.integer('wis').notNullable();
      table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('spell_creatures');
}

