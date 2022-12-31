import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  main: {
    client: "mysql2",
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'task_board',
      password: 'Alexandre',
      database: 'task_board'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/mariaDb/migrations",
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
