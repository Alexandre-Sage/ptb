import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tasks", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("task_name").notNullable();
    table.uuid("user_id").nullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.uuid("story_id").notNullable();
    table.foreign("story_id").references("stories.id").onDelete("CASCADE");
    table.string("description").nullable();
    table.jsonb("comments").nullable();
    table.string("status").notNullable();
    table.date("last_update").defaultTo(knex.fn.now(6)).notNullable();
    table.date("creation_date").defaultTo(knex.fn.now(6)).notNullable();
    table.date("edition_date").defaultTo(knex.fn.now(6)).notNullable();
    table.uuid("created_by").notNullable();
    table.foreign("created_by").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return Promise.resolve().then(() => {
    return knex.schema.dropTable("tasks");
  });
}
