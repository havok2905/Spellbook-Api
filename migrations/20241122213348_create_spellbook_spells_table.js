/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('spellbook_spells', function (table) {
      table.string('id', 255).notNullable().primary();
      table
        .string('spell_id', 255)
        .notNullable()
        .index()
        .references('id')
        .inTable('spells');
      table
        .string('spellbook_id', 255)
        .notNullable()
        .index()
        .references('id')
        .inTable('spellbooks');
      table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('spellbook_spells');
};
