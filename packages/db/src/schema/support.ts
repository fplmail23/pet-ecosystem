import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { supportCaseStatusEnum } from './enums'

export const supportCases = pgTable('support_cases', {
  id: text('id').primaryKey(),
  createdByUserId: text('created_by_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contextType: text('context_type'),
  contextId: text('context_id'),
  category: text('category').notNull(),
  severity: text('severity').notNull().default('normal'),
  status: supportCaseStatusEnum('status').notNull().default('OPEN'),
  assignedToUserId: text('assigned_to_user_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const supportCaseEvents = pgTable('support_case_events', {
  id: text('id').primaryKey(),
  supportCaseId: text('support_case_id').notNull().references(() => supportCases.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  payload: text('payload').notNull().default('{}'),
  createdByUserId: text('created_by_user_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const supportCasesRelations = relations(supportCases, ({ one, many }) => ({
  createdBy: one(users, { fields: [supportCases.createdByUserId], references: [users.id] }),
  assignedTo: one(users, { fields: [supportCases.assignedToUserId], references: [users.id] }),
  events: many(supportCaseEvents),
}))
