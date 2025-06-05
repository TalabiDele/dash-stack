import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const products = pgTable("products", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const usersTable = pgTable("users_table", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
}, (table) => [
	unique("users_table_email_unique").on(table.email),
]);
