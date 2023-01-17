import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stories", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("story_name").notNullable();
    table.string("description").nullable();
    table.uuid("user_id").notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.uuid("board_id").notNullable();
    table.foreign("board_id").references("boards.id").onDelete("CASCADE");
    table.date("creation_date").defaultTo(knex.fn.now(6)).notNullable();
    table.date("last_update").defaultTo(knex.fn.now(6)).notNullable();
    table.date("edition_date").defaultTo(knex.fn.now(6)).notNullable();
    table.string("status").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return Promise.resolve().then(() => {
    return knex.schema.dropTable("stories");
  });
}
