exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).unique().notNullable();
      tbl.string("password").notNullable();
    })
    .createTable("strains", (tbl) => {
      tbl.increments();
      tbl.string("name").unique().notNullable();
      tbl.string("type").notNullable();
      tbl.boolean("anxiety").notNullable().defaultTo(0);
      tbl.boolean("insomnia").notNullable().defaultTo(0);
      tbl.boolean("pain").notNullable().defaultTo(0);
      tbl.boolean("appetite").notNullable().defaultTo(0);
      tbl.boolean("muscle_spasm").notNullable().defaultTo(0);
      tbl.boolean("depression").notNullable().defaultTo(0);
    })
    .createTable("favorite_strains", (tbl) => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("strain_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("strains")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("dispensaries", (tbl) => {
      tbl.increments();
      tbl.string("name").unique().notNullable();
      tbl.string("address").unique().notNullable();
      tbl.string("city").notNullable();
      tbl.string("zip").notNullable();
      tbl.string("phone_number");
    })
    .createTable("favorite_dispensaries", (tbl) => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("dispensary_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("dispensaries")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("favorite_dispensaries")
    .dropTableIfExists("dispensaries")
    .dropTableIfExists("favorite_strains")
    .dropTableIfExists("strains")
    .dropTableIfExists("users");
};
