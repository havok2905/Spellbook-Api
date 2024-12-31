import dotenv from 'dotenv';

dotenv.config();

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DB_NAME ?? '',
      host: process.env.DB_HOST ?? '',
      port: process.env.DB_PORT ?? '',
      user: process.env.DB_USERNAME ?? '',
      password: process.env.DB_PASSWORD ?? ''
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
