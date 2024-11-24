// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      database: 'spellbook_api',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: ''
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
