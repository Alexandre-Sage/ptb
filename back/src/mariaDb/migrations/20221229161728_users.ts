import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().notNullable();
    table.string("user_name").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.date("creation_date").defaultTo(knex.fn.now(6)).notNullable();
    table.date("last_connection").defaultTo(knex.fn.now(6)).notNullable();
    table.date("edition_date").defaultTo(knex.fn.now(6)).notNullable();
    table.string("salt").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return Promise.resolve().then(() => {
    return knex.schema.dropTable('users');
  });
}

