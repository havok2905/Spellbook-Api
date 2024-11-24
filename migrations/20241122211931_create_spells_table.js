/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('spells', function (table) {
      table.string('id', 255).notNullable().primary();
      table.string('components', 3).notNullable();
      table.boolean('concentration').notNullable();
      table.text('description').notNullable();
      table.text('description_higher_level').notNullable();
      table.integer('level').notNullable();
      table.string('magic_school', 255).notNullable();
      table.text('materials').notNullable();
      table.string('name', 255).notNullable();
      table.string('range_text', 255).notNullable();
      table.boolean('ritual').notNullable();
      table.string('source', 255).notNullable();
      table.string('ttrpg_system', 255).notNullable();
      table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('spells');
};
